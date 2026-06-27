import { Github, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-border bg-card/60 backdrop-blur"
    >
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-muted-foreground">
          Built with care by{" "}
          <span className="font-display text-foreground" data-testid="footer-author-name">
            Pritam Roy Choudhury
          </span>
        </p>
        <div className="flex items-center gap-4">
          <a
            data-testid="footer-github-link"
            href="https://github.com/PRC-Projects/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            data-testid="footer-linkedin-link"
            href="https://www.linkedin.com/in/pritam-roy-choudhury/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
