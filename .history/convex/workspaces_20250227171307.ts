import { query } from "./_generated/server";

export const getWorkspaces = query({
	args: {},
	handler: async (ctx) => {
		await ctx.db.query("workspaces").collect();
	},
});
