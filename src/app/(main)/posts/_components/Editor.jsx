import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";

import { MenuBar } from "./EditorMenuBar.jsx";
import { contentStyle, disabledMenuButtonStyle, activeMenuButtonStyle } from "./styles.js";

const extensions = [
  TextStyleKit,
  StarterKit,
  Underline,
  Typography,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "번역 내용을 적어주세요",
  }),
];

export default function Editor({ content, setContent }) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setContent(editor.getJSON());
    },
  });
  if (!editor) {
    return null;
  }
  return (
    <>
      <MenuBar
        editor={editor}
        disabledMenuButtonStyle={disabledMenuButtonStyle}
        activeMenuButtonStyle={activeMenuButtonStyle}
      />
      <EditorContent editor={editor} className={contentStyle} />
    </>
  );
}
