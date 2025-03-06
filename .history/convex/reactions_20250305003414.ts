import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, QueryCtx } from "./_generated/server";

import { auth } from "./auth";

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

export const toggleReactions = mutation({
	args: {
		messageId: v.id("messages"),
		value: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);

		if (!userId) {
			throw new Error("Unauthorized");
		}
	},
});
