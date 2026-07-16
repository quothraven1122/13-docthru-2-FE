import { useEditorState } from "@tiptap/react";
import React from "react";
import Image from "next/image.js";

import { menuBarStateSelector } from "./EditorMenuBarState.jsx";

export const MenuBar = ({ editor, disabledMenuButtonStyle, activeMenuButtonStyle }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full h-fit flex flex-wrap gap-[15px] sticky top-0 bg-white z-sticky py-[24px]">
      <div className="flex">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="볼드 아이콘" src="/icons/ic_bold.svg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="이탈릭스 아이콘" src="/icons/ic_italic.svg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={editorState.isUnderline ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="밑줄 아이콘" src="/icons/ic_underline.svg" />
        </button>
      </div>
      <div className="flex">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          H3
        </button>
      </div>
      <div className="flex">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="불릿 아이콘" src="/icons/ic_bullet.svg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="넘버링 아이콘" src="/icons/ic_numbering.svg" />
        </button>
      </div>

      <div className="flex">
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="코드 블록 아이콘" src="/icons/ic_code_block.svg" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="인용 아이콘" src="/icons/ic_quote.svg" />
        </button>
      </div>

      <div className="flex">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editorState.isAlignLeft ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="왼쪽 정렬 아이콘" src="/icons/ic_align_left.svg" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editorState.isAlignCenter ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="중앙 정렬 아이콘" src="/icons/ic_align_center.svg" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editorState.isAlignRight ? activeMenuButtonStyle : disabledMenuButtonStyle}
        >
          <Image width={24} height={24} alt="오른쪽 정렬 아이콘" src="/icons/ic_align_right.svg" />
        </button>
      </div>
    </div>
  );
};
