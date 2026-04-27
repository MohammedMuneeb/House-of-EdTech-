import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { BrainCircuit } from "lucide-react";

import { auth, signOut } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center flex-row justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold hidden sm:inline-block">CurriculumMind AI</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/create" className="text-sm font-medium transition-colors hover:text-primary">
              Generate Course
            </Link>
          </nav>
            {session?.user ? (
              <div className="flex items-center space-x-4 ml-4 border-l pl-4">
                <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
                <form action={async () => { "use server"; await signOut(); }}>
                  <button type="submit" className="text-sm font-medium text-red-500 hover:underline">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4 border-l pl-4">
                <Link href="/login" className="text-sm font-medium hover:text-primary">
                  Login
                </Link>
              </div>
            )}
            <div className="ml-4">
              <ModeToggle />
            </div>
        </div>
      </div>
    </header>
  );
}
