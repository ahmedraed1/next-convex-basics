import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
    args: {
        title: v.string(),
        content: v.string()
    },
    handler: async (ctx, args) => {
        const post = await ctx.db.insert("posts", { title: args.title, content: args.content });

        return {
            message: "success",
            status: 200,
            data: post
        }
    },
})




