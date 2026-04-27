import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"


export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center bg-card p-10 rounded-xl border shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Use GitHub or the Mock Credentials to access the CurriculumMind AI Dashboard.
          </p>
        </div>
        
        <form
          className="mt-8 space-y-4"
          action={async (formData) => {
            "use server"
            await signIn("credentials", formData)
          }}
        >
          <input type="hidden" name="redirectTo" value="/" />
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-muted-foreground text-foreground bg-background focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address (admin@example.com)"
                defaultValue="admin@example.com"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-muted-foreground text-foreground bg-background focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password (password)"
                defaultValue="password"
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">Sign in with Mock Admin</Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <form
          action={async () => {
            "use server"
            await signIn("github", { redirectTo: "/" })
          }}
          className="mb-3"
        >
          <Button type="submit" variant="outline" className="w-full">
            Sign in with GitHub
          </Button>
        </form>

        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/" })
          }}
        >
          <Button type="submit" variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </form>

      </div>
    </div>
  )
}
