import { v } from "convex/values";

import { mutation, QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

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
