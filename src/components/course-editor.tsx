"use client";

import { useState } from "react";
import { updateCourse, deleteCourse } from "@/actions/course";
import { createModule, updateModule, deleteModule } from "@/actions/module";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trash2, Plus, Edit, Save, ArrowLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
type ModuleData = {
  id: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
};
type CourseData = {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  modules: ModuleData[];
};

export function CourseEditor({ initialCourse }: { initialCourse: CourseData }) {
  const router = useRouter();
  const [course, setCourse] = useState(initialCourse);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  
  // Temporary state for edits
  const [courseEditForm, setCourseEditForm] = useState({ title: course.title, description: course.description });
  const [moduleEditForm, setModuleEditForm] = useState({ title: "", content: "" });
  const [newModuleForm, setNewModuleForm] = useState({ title: "", content: "", show: false });

  // Handlers
  async function handleSaveCourse() {
    const updated = await updateCourse(course.id, courseEditForm);
    setCourse({ ...course, ...updated });
    setIsEditingCourse(false);
  }

  async function handleDeleteCourse() {
    if (confirm("Are you sure you want to delete this entire course? This action cannot be undone.")) {
      await deleteCourse(course.id);
      router.push("/");
    }
  }

  async function handleSaveModule(modId: string) {
    const updated = await updateModule(modId, course.id, moduleEditForm);
    setCourse({
      ...course,
      modules: course.modules.map(m => m.id === modId ? { ...m, ...updated } : m)
    });
    setEditingModuleId(null);
  }

  async function handleDeleteModule(modId: string) {
    if (confirm("Delete this module?")) {
      await deleteModule(modId, course.id);
      setCourse({
        ...course,
        modules: course.modules.filter(m => m.id !== modId)
      });
    }
  }

  async function handleAddModule() {
    if (!newModuleForm.title || !newModuleForm.content) return;
    const newMod = await createModule({
      courseId: course.id,
      title: newModuleForm.title,
      content: newModuleForm.content,
      order: course.modules.length + 1
    });
    setCourse({ ...course, modules: [...course.modules, newMod] });
    setNewModuleForm({ title: "", content: "", show: false });
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.push("/")} className="-ml-3 mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      {/* Course Header */}
      <Card className="border-primary/20 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="w-full">
              {isEditingCourse ? (
                <div className="space-y-4">
                  <Input 
                    value={courseEditForm.title} 
                    onChange={e => setCourseEditForm({...courseEditForm, title: e.target.value})}
                    className="text-2xl font-bold font-sans"
                  />
                  <Textarea 
                    value={courseEditForm.description} 
                    onChange={e => setCourseEditForm({...courseEditForm, description: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveCourse}><Save className="mr-2 h-4 w-4"/> Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditingCourse(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center w-full mb-2">
                     <CardTitle className="text-3xl">{course.title}</CardTitle>
                     <Button variant="ghost" size="icon" onClick={() => setIsEditingCourse(true)}>
                       <Edit className="h-4 w-4 text-muted-foreground" />
                     </Button>
                  </div>
                  <CardDescription className="text-base text-muted-foreground">{course.description}</CardDescription>
                  <div className="mt-4 inline-flex items-center text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    Audience: {course.targetAudience}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Modules List */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Curriculum Modules</h2>
          <Button onClick={() => setNewModuleForm({...newModuleForm, show: !newModuleForm.show})}>
            <Plus className="mr-2 h-4 w-4" /> Add Module
          </Button>
        </div>

        {newModuleForm.show && (
          <Card className="mb-6 border-dashed border-2">
            <CardHeader><CardTitle className="text-lg">Add New Module</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Module Title</Label>
                <Input value={newModuleForm.title} onChange={e => setNewModuleForm({...newModuleForm, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea value={newModuleForm.content} onChange={e => setNewModuleForm({...newModuleForm, content: e.target.value})} rows={5} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddModule}>Create Module</Button>
                <Button variant="ghost" onClick={() => setNewModuleForm({...newModuleForm, show: false})}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Accordion className="w-full space-y-4">
          {course.modules.length === 0 && !newModuleForm.show && (
            <div className="text-center py-8 border rounded-lg bg-card/50 text-muted-foreground">No modules exist yet. Why not add one?</div>
          )}
          {course.modules.map((mod) => (
            <AccordionItem key={mod.id} value={mod.id} className="bg-card border rounded-lg px-2 shadow-sm data-[state=open]:border-primary/50 transition-colors">
              {editingModuleId === mod.id ? (
                <div className="p-4 space-y-4">
                  <Input value={moduleEditForm.title} onChange={e => setModuleEditForm({...moduleEditForm, title: e.target.value})} className="font-semibold" />
                  <Textarea value={moduleEditForm.content} onChange={e => setModuleEditForm({...moduleEditForm, content: e.target.value})} rows={8} />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setEditingModuleId(null)}>Cancel</Button>
                    <Button size="sm" onClick={() => handleSaveModule(mod.id)}><Save className="mr-2 h-4 w-4"/> Save Module</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center w-full">
                    <AccordionTrigger className="hover:no-underline flex-1 py-4 px-2">
                      <div className="flex items-center text-left">
                        <span className="bg-primary/20 text-primary w-6 h-6 rounded flex items-center justify-center text-xs font-bold mr-3">{mod.order}</span>
                        <span className="font-semibold">{mod.title}</span>
                      </div>
                    </AccordionTrigger>
                    <div className="flex items-center gap-1 pr-4">
                      <Button variant="ghost" size="icon" onClick={() => {
                        setModuleEditForm({ title: mod.title, content: mod.content });
                        setEditingModuleId(mod.id);
                      }}>
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50" onClick={() => handleDeleteModule(mod.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="px-11 pb-6 prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                    {mod.content}
                  </AccordionContent>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="border-t pt-8 mt-12 flex justify-center">
        <Button variant="destructive" onClick={handleDeleteCourse} className="opacity-80 hover:opacity-100 transition-opacity">
          <Trash2 className="mr-2 h-4 w-4" /> Delete Entire Course
        </Button>
      </div>
    </div>
  );
}
