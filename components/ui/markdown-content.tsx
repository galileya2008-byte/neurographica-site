import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "space-y-5 text-base leading-relaxed text-muted md:text-lg",
        "[&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80",
        "[&_em]:italic [&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-foreground md:[&_h2]:text-3xl",
        "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-snug [&_h3]:text-foreground md:[&_h3]:text-2xl",
        "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent/40 [&_blockquote]:bg-warm/50 [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:italic [&_blockquote]:text-foreground",
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_li]:leading-relaxed",
        "[&_p]:leading-relaxed",
        className,
      )}
    >
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const external = Boolean(href?.startsWith("http"));
            return (
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
