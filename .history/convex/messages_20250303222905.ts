import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query, QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

const populateThread = async (ctx: QueryCtx, messageId: Id<"messages">) => {
	const messages = await ctx.db
		.query("messages")
		.withIndex("by_parent_message_id", (q) =>
			q.eq("parentMessageId", messageId),
		)
		.collect();

	if (messages.length === 0) {
		return {
			count: 0,
			image: undefined,
			timeStamp: 0,
		};
	}

	const lastMessage = messages[messages.length - 1];

	const lastMessageMember = await populateMember(ctx, lastMessage.memberId);

	if (!lastMessageMember) {
		return {
			count: 0,
			image: undefined,
			timeStamp: 0,
		};
	}

	const lastMessageUser = await populateUser(ctx, lastMessageMember.userId);

	return {
		count: messages.length,
		image: lastMessageUser?.image,
		timeStamp: lastMessage._creationTime,
	};
};

const populateReactions = (ctx: QueryCtx, messageId: Id<"messages">) => {
	return ctx.db
		.query("reactions")
		.withIndex("by_message_id", (q) => q.eq("messageId", messageId))
		.collect();
};

const populateUser = (ctx: QueryCtx, userId: Id<"users">) => {
	return ctx.db.get(userId);
};

const populateMember = (ctx: QueryCtx, memberId: Id<"members">) => {
	return ctx.db.get(memberId);
};

const getMember = async (
	ctx: QueryCtx,
	workspaceId: Id<"workspaces">,
	userId: Id<"users">,
) => {
	return ctx.db
		.query("members")
		.withIndex("by_workspace_id_user_id", (q) =>
			q.eq("workspaceId", workspaceId).eq("userId", userId),
		)
		.unique();
};

export const getMessage = query({
	args: {
		channelId: v.optional(v.id("channels")),
		conversationId: v.optional(v.id("conversations")),
		parentMessageId: v.optional(v.id("messages")),
		paginationOpts: paginationOptsValidator,
	},
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);

		if (!userId) {
			throw new Error("Unauthorized");
		}

		let _conversationId = args.conversationId;

		if (!args.conversationId && !args.channelId && args.parentMessageId) {
			const parentMessage = await ctx.db.get(args.parentMessageId);

			if (!parentMessage) {
				throw new Error("Parent Message Not Found");
			}

			_conversationId = parentMessage.conversationId;
		}

		const results = await ctx.db
			.query("messages")
			.withIndex("by_channel_id_parent_message_id_conversation_id", (q) =>
				q
					.eq("channelId", args.channelId)
					.eq("parentMessageId", args.parentMessageId)
					.eq("conversationId", _conversationId),
			)
			.order("desc")
			.paginate(args.paginationOpts);

		return results;
	},
});

export const createMessage = mutation({
	args: {
		body: v.string(),
		image: v.optional(v.id("_storage")),
		workspaceId: v.id("workspaces"),
		channelId: v.optional(v.id("channels")),
		conversationId: v.optional(v.id("conversations")),
		parentMessageId: v.optional(v.id("messages")),
	},
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);

		if (!userId) {
			throw new Error("Unauthorized");
		}

		const member = await getMember(ctx, args.workspaceId, userId);

		if (!member) {
			throw new Error("Unauthorized");
		}

		let _conversationId = args.conversationId;

		// Only Possible If We Are Replying In A Thread In 1 on 1 Conversation
		if (!args.conversationId && !args.channelId && args.parentMessageId) {
			const parentMessage = await ctx.db.get(args.parentMessageId);

			if (!parentMessage) {
				throw new Error("Parent Message Not Found");
			}

			_conversationId = parentMessage.conversationId;
		}

		const messageId = await ctx.db.insert("messages", {
			memberId: member._id,
			body: args.body,
			image: args.image,
			channelId: args.channelId,
			conversationId: _conversationId,
			workspaceId: args.workspaceId,
			parentMessageId: args.parentMessageId,
			updatedAt: Date.now(),
		});

		return messageId;
	},
});
