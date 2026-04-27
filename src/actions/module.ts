"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createModule(data: { courseId: string; title: string; content: string; order: number }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const course = await prisma.course.findUnique({ where: { id: data.courseId, userId: session.user.id }});
  if (!course) throw new Error("Unauthorized");

  const newModule = await prisma.module.create({
    data,
  });
  revalidatePath(`/course/${data.courseId}`);
  return newModule;
}

export async function updateModule(id: string, courseId: string, data: { title?: string; content?: string; order?: number }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const course = await prisma.course.findUnique({ where: { id: courseId, userId: session.user.id }});
  if (!course) throw new Error("Unauthorized");

  const updated = await prisma.module.update({
    where: { id },
    data,
  });
  revalidatePath(`/course/${courseId}`);
  return updated;
}

export async function deleteModule(id: string, courseId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const course = await prisma.course.findUnique({ where: { id: courseId, userId: session.user.id }});
  if (!course) throw new Error("Unauthorized");

  await prisma.module.delete({
    where: { id },
  });
  revalidatePath(`/course/${courseId}`);
}
