"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { postFormDataType, postSchema } from "@/lib/schemas";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function CreatePostForm() {
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<postFormDataType>({
    resolver: zodResolver(postSchema),
  });

  const createPost = useMutation(api.postsSchema.createPost);

  const onSubmit = async (data: postFormDataType) => {
    try {
      setLoading(true);
      await createPost({
        title: data.title,
        content: data.content,
      });
      toast("Post created successfully");
    } catch (error) {
      console.log("posting has failed", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Create Post</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-xl font-semibold">
                Create New Post
              </DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Share your thoughts in real-time ✨
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Post Title
                  </Label>
                  <Input
                    {...register("title")}
                    type="text"
                    id="title"
                    placeholder="Enter your post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Post Content
                  </Label>
                  <Input
                    {...register("content")}
                    type="text"
                    id="content"
                    placeholder="Write your post content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full"
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">
                      {errors.content.message}
                    </p>
                  )}
                </div>{" "}
                <DrawerFooter className="px-4 py-4 border-t">
                  <div className="flex space-x-2 justify-end w-full">
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button type="submit">
                      {loading ? "Loading..." : "Create Post"}
                    </Button>
                  </div>
                </DrawerFooter>
              </form>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
