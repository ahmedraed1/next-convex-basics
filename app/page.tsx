import CreatePostForm from "@/components/CreatePostForm";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-red-400">Hello</h1>
      <CreatePostForm />
    </div>
  );
}
