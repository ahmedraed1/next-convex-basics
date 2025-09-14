import CreatePostForm from "@/components/CreatePostForm";
import TasksApp from "@/components/TasksApp";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <TasksApp />
    </div>
  );
}
