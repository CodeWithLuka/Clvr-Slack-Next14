import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

export const createWorkspace = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);

		if (!userId) {
			throw new Error("Unauthorized");
		}

		// TODO: Create a proper joinCode method later
		const joinCode = "123456";

		const workspaceId = await ctx.db.insert("workspaces", {
			name: args.name,
			userId,
			joinCode,
		});

		return workspaceId;
	},
});

export const getWorkspaces = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("workspaces").collect();
	},
});

export const useGetWorkspaceById = query({
	args: { id: v.id("workspaces") },
	handler: async (ctx, args) => {
		const userId = await auth.getUserId(ctx);

		if (!userId) {
			throw new Error("Unauthorized");
		}

		return await ctx.db.get(args.id);
	},
});
