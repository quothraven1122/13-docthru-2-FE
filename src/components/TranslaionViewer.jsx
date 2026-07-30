// src/components/TranslationViewer.jsx
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { BackgroundColor, TextStyleKit } from "@tiptap/extension-text-style";
import { createLowlight } from "lowlight";

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

// Editor.jsx와 동일한 노드/마크 구성 (Placeholder 등 편집 전용 확장은 제외)
const extensions = [
  TextStyleKit,
  StarterKit,
  Underline,
  BackgroundColor,
  Typography,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  CodeBlockLowlight.configure({ lowlight }),
];

// DB의 content(JSON.stringify된 { json, text })를 받아 읽기 전용으로 렌더링
export default function TranslationViewer({ content }) {
  if (!content) return null;

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    return null;
  }

  if (!parsed?.json || parsed.json.type !== "doc") {
    return null;
  }

  return <>{renderToReactElement({ content: parsed.json, extensions })}</>;
}
