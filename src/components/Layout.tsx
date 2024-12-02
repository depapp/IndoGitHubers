import { Analytics } from '@vercel/analytics/react';
import { GithubIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom"
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const Layout = () => {
  return (
    <>
      <header className="w-full border-b">
        <div className="p-4 container mx-auto flex justify-between items-center">
          <Link to="/" className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="/favicon-96.png" />
              <AvatarFallback>IGH</AvatarFallback>
            </Avatar>
            <h2 className="font-extrabold text-2xl tracking-tight">
              IndoGitHubers
            </h2>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://github.com/depapp/IndoGitHubers"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <footer className="w-full p-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <span>
            Since 2023, built with ☕️ by{' '}
            <a
              href="https://github.com/depapp/IndoGitHubers/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Us, The Contributors.
            </a>
          </span>
        </div>
      </footer>
      <Analytics />
    </>
  );
}
