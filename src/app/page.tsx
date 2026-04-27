import { getCourses } from "@/actions/course";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Your Courses</h1>
          <p className="text-muted-foreground mt-2">Manage and refine your generated curricula.</p>
        </div>
        <Link href="/create">
          <Button size="lg" className="shadow-lg hover:shadow-primary/25 transition-all">
            <PlusCircle className="mr-2 h-5 w-5" />
            Generate New Course
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card border-dashed">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            You haven't created any courses. Let the AI build a comprehensive curriculum for you.
          </p>
          <Link href="/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Generate Course
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: any) => (
            <Card key={course.id} className="flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span className="font-medium mr-2">Target Audience:</span>
                  {course.targetAudience}
                </div>
                <div className="flex items-center text-sm font-medium text-primary bg-primary/10 w-max px-2 py-0.5 rounded-full">
                  {course._count.modules} Modules
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t bg-muted/20 px-6 py-4 mt-auto">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                </div>
                <Link href={`/course/${course.id}`}>
                  <Button variant="outline" size="sm">Manage</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
