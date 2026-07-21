import { React, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { EditorContent, useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import { BackgroundColor, TextStyleKit } from "@tiptap/extension-text-style";
import { createLowlight } from "lowlight";

import { MenuBar } from "./EditorMenuBar.jsx";
import CodeBlockComponent from "./CodeBlockComponent.jsx";

import cn from "@/utils/cn.js";
import { contentStyle, disabledMenuButtonStyle, activeMenuButtonStyle, codeBlockStyle } from "./styles.js";

import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import http from "highlight.js/lib/languages/http";
import sql from "highlight.js/lib/languages/sql";
import graphql from "highlight.js/lib/languages/graphql";

const lowlight = createLowlight();
lowlight.register("html", xml);
lowlight.register("css", css);
lowlight.register("scss", scss);
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("jsx", javascript);
lowlight.register("tsx", typescript);
lowlight.register("json", json);
lowlight.register("bash", bash);
lowlight.register("http", http);
lowlight.register("sql", sql);
lowlight.register("graphql", graphql);

const extensions = [
  TextStyleKit,
  StarterKit,
  Underline,
  BackgroundColor,
  Typography,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "번역 내용을 적어주세요",
  }),
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
    addKeyboardShortcuts() {
      return {
        Tab: () => {
          if (this.editor.isActive("codeBlock")) {
            return this.editor.commands.insertContent("\t");
          }
        },
      };
    },
  }).configure({ lowlight }),
];

export default function Editor({ content, setContent }) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setContent({ json: editor.getJSON(), text: editor.getText() });
    },
  });
  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(content, false);
  }, [content, editor]);

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
      <EditorContent editor={editor} className={cn(contentStyle, codeBlockStyle)} />
    </>
  );
}
