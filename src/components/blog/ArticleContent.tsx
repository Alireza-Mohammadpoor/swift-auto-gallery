import type { ReactNode } from "react";
import type { ContentNode } from "@/types/article";
import { headingId, extractText, isSafeHref, isSafeImageSrc } from "@/utils/article";

/**
 * Renders Tiptap JSON as React elements. No HTML strings and no
 * dangerouslySetInnerHTML anywhere, so stored content cannot inject markup or
 * scripts. Unknown node types are ignored; unsafe link/image URLs are dropped.
 */
function renderInline(node: ContentNode, key: number): ReactNode {
  if (node.type === "hardBreak") return <br key={key} />;
  let out: ReactNode = node.text ?? "";
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") out = <strong>{out}</strong>;
    else if (mark.type === "italic") out = <em>{out}</em>;
    else if (mark.type === "link" && isSafeHref(mark.attrs?.href)) {
      const href = String(mark.attrs?.href).trim();
      const external = /^https?:/i.test(href);
      out = (
        <a
          href={href}
          className="text-swift-gold underline underline-offset-2 hover:text-swift-gold-light"
          {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
        >
          {out}
        </a>
      );
    }
  }
  return <span key={key}>{out}</span>;
}

export function ArticleContent({ doc }: { doc: ContentNode }) {
  let headingIndex = 0;

  const renderBlock = (node: ContentNode, key: number): ReactNode => {
    const kids = (node.content ?? []).map((c, i) => renderInline(c, i));
    switch (node.type) {
      case "paragraph":
        return kids.length ? <p key={key}>{kids}</p> : null;
      case "heading": {
        const level = Math.min(4, Math.max(2, Number(node.attrs?.level ?? 2)));
        const id = headingId(headingIndex++, extractText(node).trim());
        const Tag = `h${level}` as "h2" | "h3" | "h4";
        return <Tag key={key} id={id} className="scroll-mt-24">{kids}</Tag>;
      }
      case "bulletList":
        return <ul key={key}>{(node.content ?? []).map(renderBlock)}</ul>;
      case "orderedList":
        return <ol key={key}>{(node.content ?? []).map(renderBlock)}</ol>;
      case "listItem":
        return <li key={key}>{(node.content ?? []).map(renderBlock)}</li>;
      case "blockquote":
        return <blockquote key={key}>{(node.content ?? []).map(renderBlock)}</blockquote>;
      case "horizontalRule":
        return <hr key={key} />;
      case "image": {
        const src = node.attrs?.src;
        if (!isSafeImageSrc(src)) return null;
        const caption = typeof node.attrs?.title === "string" ? node.attrs.title : "";
        return (
          <figure key={key}>
            <img
              src={src}
              alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""}
              loading="lazy"
              decoding="async"
            />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
      }
      default:
        return null;
    }
  };

  return <div className="article-prose">{(doc.content ?? []).map(renderBlock)}</div>;
}
