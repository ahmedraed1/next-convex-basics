"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CreatePostForm from "./CreatePostForm";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const posts = useQuery(api.postsSchema.getAllPosts);

  console.log(posts);

  return (
    <main className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">📝 To-Do List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <CreatePostForm />
          </div>

          <ul className="space-y-2">
            {posts?.map((post) => (
              <li
                key={post._id}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={post.done}
                    // onCheckedChange={() => toggleTask(post.id)}
                  />
                  <span
                    className={`${
                      post.done ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {post.title}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  //   onClick={() => deleteTask(post.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
