"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createCourse(data: { title: string; description: string; targetAudience: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const course = await prisma.course.create({
    data: { ...data, userId: session.user.id },
  });
  revalidatePath("/");
  return course;
}

export async function getCourses() {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    return await prisma.course.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { modules: true } } },
    });
  } catch {
    return [];
  }
}

export async function getCourseById(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    return await prisma.course.findUnique({
      where: { id, userId: session.user.id },
      include: {
        modules: { orderBy: { order: "asc" } },
      },
    });
  } catch {
    return null;
  }
}

export async function updateCourse(id: string, data: { title?: string; description?: string; targetAudience?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const course = await prisma.course.update({
    where: { id, userId: session.user.id },
    data,
  });
  revalidatePath("/");
  revalidatePath(`/course/${id}`);
  return course;
}

export async function deleteCourse(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.course.delete({
    where: { id, userId: session.user.id },
  });
  revalidatePath("/");
}
