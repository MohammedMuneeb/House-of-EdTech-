import { Sparkles } from "lucide-react";
export function Footer() {

  return (
    <footer className="border-t bg-muted/20 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <p className="text-sm text-muted-foreground">
          Built for the <span className="font-medium text-foreground">House of Edtech</span> Fullstack Developer Assignment.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/MohammedMuneeb"

            target="_blank"
            rel="noreferrer"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-mazharullah-muneeb"
            target="_blank"

            rel="noreferrer"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </a>
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            {/* <Sparkles className="mr-2 h-4 w-4" />  */}
            Mohammed Muneeb
          </div>

        </div>
      </div>
    </footer>
  );
}