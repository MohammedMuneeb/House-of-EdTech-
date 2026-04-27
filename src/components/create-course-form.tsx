"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateCourseFromTopic } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CreateCourseForm() {
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("Beginners");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!topic) return;
    setIsGenerating(true);
    try {
      const course = await generateCourseFromTopic(topic, targetAudience);
      router.push(`/course/${course.id}`);
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  }

  return (

    <Card className="shadow-lg animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto mt-8 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          {/* <Sparkles className="mr-2 h-6 w-6 text-primary" />  */}
          Generate Curriculum with AI
        </CardTitle>
        <CardDescription>
          Enter a topic and target audience. Our AI will craft a structured multi-module curriculum in seconds.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleGenerate}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic or Skill</Label>
            <Input
              id="topic"
              placeholder="e.g. Advanced TypeScript Patterns, Machine Learning Basics..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isGenerating}
              required
              className="text-lg py-6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              placeholder="e.g. Beginners, Software Engineers, High School Students..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              disabled={isGenerating}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/20 border-t py-4 px-6">
          <Link href="/">
            <Button variant="ghost" disabled={isGenerating}>

              <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={!topic || isGenerating} className="min-w-[150px]">
            {isGenerating ? (
              <div >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </div>
            ) : (
              <div >
                Generate Course
                {/* <Sparkles className="ml-2 h-4 w-4" />  */}
              </div >
            )}
          </Button>
        </CardFooter>
      </form >
    </Card >

  );
} 