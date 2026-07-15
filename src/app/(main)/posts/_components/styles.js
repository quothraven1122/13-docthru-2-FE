export const contentStyle = `
  [&_.ProseMirror]:outline-none
  [&_.ProseMirror>p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
  [&_.ProseMirror>p.is-editor-empty:first-child::before]:text-gray-400
  [&_.ProseMirror>p.is-editor-empty:first-child::before]:float-left
  [&_.ProseMirror>p.is-editor-empty:first-child::before]:pointer-events-none
  [&_.ProseMirror>p.is-editor-empty:first-child::before]:h-0

  [&>:first-child]:mt-0
  [&_ul]:list-disc
  [&_ol]:list-decimal
  [&_ul]:pl-4
  [&_ol]:pl-4
  [&_ul]:my-5
  [&_ol]:my-5
  [&_ul]:mr-4
  [&_ol]:mr-4
  [&_li_p]:my-1

  [&_h1]:mt-14
  [&_h1]:mb-6
  [&_h1]:text-[1.4rem]
  [&_h1]:leading-tight

  [&_h2]:mt-14
  [&_h2]:mb-6
  [&_h2]:text-[1.2rem]
  [&_h2]:leading-tight

  [&_h3]:mt-10
  [&_h3]:text-[1.1rem]
  [&_h3]:leading-tight

  [&_h4]:mt-10
  [&_h4]:text-base
  [&_h4]:leading-tight

  [&_h5]:mt-10
  [&_h5]:text-base
  [&_h5]:leading-tight

  [&_h6]:mt-10
  [&_h6]:text-base
  [&_h6]:leading-tight

  [&_code]:rounded-md
  [&_code]:bg-purple-100
  [&_code]:px-[0.3em]
  [&_code]:py-[0.25em]
  [&_code]:text-[0.85rem]
  [&_code]:text-black

  [&_pre]:my-6
  [&_pre]:rounded-lg
  [&_pre]:bg-black
  [&_pre]:px-4
  [&_pre]:py-3
  [&_pre]:text-white

  [&_pre_code]:bg-transparent
  [&_pre_code]:p-0
  [&_pre_code]:text-inherit
  [&_pre_code]:text-[0.8rem]

  [&_blockquote]:my-6
  [&_blockquote]:border-l-[3px]
  [&_blockquote]:border-gray-300
  [&_blockquote]:pl-4

  [&_hr]:my-8
  [&_hr]:border-0
  [&_hr]:border-t
  [&_hr]:border-gray-200
`;

export const disabledMenuButtonStyle = `
  w-[30px]
  h-[30px]
  text-gray-900
  flex
  justify-center
  items-center
  hover:bg-gray-300
  hover:cursor-pointer
`;
export const activeMenuButtonStyle = `
  w-[30px]
  h-[30px]
  flex
  justify-center
  items-center
  opacity-40
`;
