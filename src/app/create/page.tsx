import { CreateCourseForm } from "@/components/create-course-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Course - CurriculumMind AI",
  description: "Generate a new curriculum instantly using AI",
};

export default function CreateCoursePage() {
  return (
    <div className="container py-8">
      <CreateCourseForm />
    </div>
  );
}
