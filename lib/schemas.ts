import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(1, "Title is required").max(20, "Title must be less than 20 characters"),
    content: z.string().min(1, "Content is required"),
})


export type postFormDataType = z.infer<typeof postSchema>