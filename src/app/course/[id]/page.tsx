export const dynamic = "force-dynamic";
import { getCourseById } from "@/actions/course";
import { notFound } from "next/navigation";
import { CourseEditor } from "@/components/course-editor";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const course = await getCourseById(resolvedParams.id);
  return {
    title: course ? `${course.title} - CurriculumMind` : "Course Not Found",
  };
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const course = await getCourseById(resolvedParams.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container py-8 animate-in fade-in duration-500">
      <CourseEditor initialCourse={course} />
    </div>
  );
}
