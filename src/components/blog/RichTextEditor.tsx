import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Quote, Minus, Undo2, Redo2, Link2, ImagePlus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { isSafeHref, uploadArticleImage } from "@/utils/article";
import type { ContentNode } from "@/types/article";

interface Props {
  value: ContentNode;
  onChange: (doc: ContentNode) => void;
  onError: (message: string) => void;
  dir: "rtl" | "ltr";
}

export function RichTextEditor({ value, onChange, onError, dir }: Props) {
  const { t } = useLanguage();
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, code: false, codeBlock: false, strike: false }),
      Link.configure({ openOnClick: false, autolink: false, protocols: ["mailto", "tel"] }),
      Image.configure({ inline: false }),
    ],
    content: value,
    editorProps: {
      attributes: { class: "article-prose ProseMirror rounded-md border border-swift-border bg-swift-black p-4", dir },
    },
    onUpdate: ({ editor: e }) => onChange(e.getJSON() as ContentNode),
  });

  if (!editor) return null;

  const btn = (active: boolean) =>
    `rounded p-2 text-sm hover:bg-swift-border ${active ? "bg-swift-gold/20 text-swift-gold" : "text-swift-warm/80"}`;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt(t.adminBlog.linkPrompt, prev ?? "https://");
    if (href === null) return;
    if (href === "") return void editor.chain().focus().unsetLink().run();
    if (!isSafeHref(href)) return onError(t.adminBlog.canonicalInvalid);
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const res = await uploadArticleImage(file);
    if (!res.ok) {
      onError(res.reason === "type" ? t.adminBlog.invalidImage : res.reason === "size" ? t.adminBlog.tooLarge : t.adminBlog.uploadError);
      return;
    }
    const alt = window.prompt(t.adminBlog.imageAlt, "") ?? "";
    const caption = window.prompt(t.adminBlog.imageCaption, "") ?? "";
    editor.chain().focus().setImage({ src: res.url, alt, title: caption || undefined }).run();
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <div role="toolbar" aria-label={t.adminBlog.body} className="mb-2 flex flex-wrap items-center gap-1 rounded-md border border-swift-border bg-swift-charcoal p-1.5">
        {([2, 3, 4] as const).map((l) => (
          <button key={l} type="button" aria-label={`H${l}`} className={btn(editor.isActive("heading", { level: l }))}
            onClick={() => editor.chain().focus().toggleHeading({ level: l }).run()}>H{l}</button>
        ))}
        <button type="button" aria-label="Bold" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></button>
        <button type="button" aria-label="Italic" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></button>
        <button type="button" aria-label="Bullet list" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></button>
        <button type="button" aria-label="Numbered list" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></button>
        <button type="button" aria-label="Quote" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></button>
        <button type="button" aria-label="Link" className={btn(editor.isActive("link"))} onClick={setLink}><Link2 size={16} /></button>
        <button type="button" aria-label={t.adminBlog.insertImage} className={btn(false)} onClick={() => fileRef.current?.click()}><ImagePlus size={16} /></button>
        <button type="button" aria-label="Divider" className={btn(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></button>
        <span className="mx-1 h-5 w-px bg-swift-border" />
        <button type="button" aria-label="Undo" className={btn(false)} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo2 size={16} /></button>
        <button type="button" aria-label="Redo" className={btn(false)} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo2 size={16} /></button>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
