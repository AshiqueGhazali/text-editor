"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from '@tiptap/extension-underline';


import { IoDocumentText } from "react-icons/io5";
import {
  LuUndo2,
  LuRedo2,
  LuPrinter,
  LuSpellCheck,
  LuPaintRoller,
} from "react-icons/lu";
import { IoIosArrowDown, IoMdArrowDropdown, IoMdLink } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaItalic, FaPlus } from "react-icons/fa";
import { BsHighlighter, BsTypeBold } from "react-icons/bs";
import {
  MdFormatAlignLeft,
  MdFormatClear,
  MdFormatIndentIncrease,
  MdFormatListBulleted,
  MdFormatUnderlined,
  MdOutlineChecklist,
  MdOutlineFormatColorText,
  MdOutlineFormatIndentDecrease,
  MdOutlineFormatListNumbered,
  MdOutlineImage,
} from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { CiLineHeight } from "react-icons/ci";
import { CustomTextAlign, TextColor } from "./CustomExtentions";

const buttons = [
  { title: "File" },
  { title: "Edit" },
  { title: "Insert" },
  { title: "View" },
  { title: "Style" },
];

enum Aligns  {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  JUSTIFY = "justify"

}
const TextEditor = () => {
  const [isToggleAligns , setToggleAligns] = useState<boolean>(false)

  // const CustomTextAlign = TextAlign.extend({
  //   addOptions() {
  //     return {
  //       ...this.parent?.(),
  //       types: ['heading', 'paragraph'], 
  //       alignments: ['left', 'center', 'right', 'justify'], 
  //     };
  //   },
  // });

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomTextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      BulletList,
      ListItem,
      Link,
      Image,
      CharacterCount,
      Underline,
      TextColor.configure({
        colors: ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'], // Custom colors
      }),
    ],
    content: `
      <p>
        This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
      </p>
      <p>
        The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
      </p>
    `,
  });

  const toggleAlign = ()=>{
    setToggleAligns(!isToggleAligns)
  }

  const handleBold = () => editor?.chain().focus().toggleBold().run();
  const handleItalic = () => editor?.chain().focus().toggleItalic().run();
  const handleUndo = () => editor?.chain().focus().undo().run();
  const handleRedo = () => editor?.chain().focus().redo().run();
  const handleInsertImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const handleAlign = (align:Aligns)=>{
    editor?.chain().focus().setTextAlign(`${align}`).run()
    toggleAlign()
  }
  const handleUnderline = () => editor?.chain().focus().toggleUnderline().run()

  const handlePrint = () => {
    const editorContent = document.getElementById("editor-content");

    const printStyles = `
      <style>
        body { font-family: Arial, sans-serif; }
        * { margin: 0; padding: 0; }
        #editor-content { display: block; width: 100%; padding: 20px; }
        h1, h2, h3, h4, h5, h6 { font-weight: bold; }
        p, li { font-size: 14px; line-height: 1.6; }
        a { color: blue; text-decoration: underline; }
        img { max-width: 100%; height: auto; }
      </style>
    `;

    const printContent = editorContent?.cloneNode(true) as HTMLElement;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const windowWidth = 800;
    const windowHeight = 600;

    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;

    const printWindow = window.open(
      "",
      "",
      `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`
    );

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            ${printStyles}
          </head>
          <body>
            <div id="editor-content">${printContent.innerHTML}</div>
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  if (!editor) return null;

  return (
    <>
      <div className="flex flex-col w-full items-center bg-[#f5f7fa]">
        <div className="mb-6 min-w-[90vw]">
          <div className="flex justify-between bg-[#d3def0] p-2 w-full min-w-[90vw] rounded-tl-lg rounded-tr-lg">
            <div className="flex gap-2 ">
              <IoDocumentText className="text-3xl text-[#074276]" />
              <h1 className="text-black font-semibold">
                The Science of Happiness
              </h1>
            </div>
            <div className="flex gap-1">
              {buttons.map((button, index) => {
                return (
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-xs text-gray-900 bg-[#e3ebf2] rounded-sm hover:bg-gray-100  hover:bg-[#dfe2e8]"
                  >
                    {button.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex p-2 w-full  border border-[#d3def0] rounded-bl-lg rounded-br-lg">
            <div className="flex gap-2 ">
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div
                  onClick={handleUndo}
                  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"
                >
                  <LuUndo2 />
                </div>
                <div
                  onClick={handleRedo}
                  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"
                >
                  <LuRedo2 />
                </div>
                <div
                  onClick={handlePrint}
                  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"
                >
                  <LuPrinter />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <LuSpellCheck />
                </div>
                <div
                  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setHighlight({ color: "yellow" })
                      .run()
                  }
                >
                  <LuPaintRoller />
                </div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex gap-1 ">
                  <p className="text-xs font-semibold cursor-pointer">100&</p>
                  <IoIosArrowDown />
                </div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex gap-1 ">
                  <p className="text-xs font-normal cursor-pointer">
                    Normal text
                  </p>
                  <IoIosArrowDown />
                </div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex gap-1 ">
                  <p className="text-xs font-normal cursor-pointer">Arial</p>
                  <IoIosArrowDown />
                </div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <TiMinus />
                </div>
                <div className="text-gray-600 border border-[#d3def0] p-2 text-black rounded-lg ">
                  <p className="text-xs font-normal">12</p>
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <FaPlus />
                </div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div
                  onClick={handleBold}
                  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"
                >
                  <BsTypeBold />
                </div>
                <div
                  onClick={handleItalic}
                  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"
                >
                  <FaItalic />
                </div>
                <div onClick={handleUnderline} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <MdFormatUnderlined />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <MdOutlineFormatColorText />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <BsHighlighter />
                </div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div onClick={() => editor.chain().focus().setLink({ href: 'https://example.com' }).run()} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <IoMdLink />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <BiCommentAdd />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <MdOutlineImage />
                </div>
              </div>
              <div className="flex gap-1 border-[#d3def0] pr-2">
                <div className="relative inline-block text-center">
                  <div onClick={toggleAlign} className="inline-flex text-gray-600 hover:bg-[#d3def0] focus:bg-[#d3def0] p-2 rounded-sm flex">
                    <MdFormatAlignLeft />
                    <IoMdArrowDropdown />
                  </div>
                  {isToggleAligns && (
                    <div
                    className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 p-2 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="flex gap-1">
                      <div onClick={()=>handleAlign(Aligns.LEFT)} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                        <FaAlignLeft />
                      </div>
                      <div onClick={()=>handleAlign(Aligns.CENTER)} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                        <FaAlignCenter />
                      </div>
                      <div onClick={()=>handleAlign(Aligns.RIGHT)}  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                        <FaAlignRight />
                      </div>
                      <div onClick={()=>handleAlign(Aligns.JUSTIFY)}  className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                        <FaAlignJustify />
                      </div>
                    </div>
                  </div>
                  )}
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <CiLineHeight />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex">
                  <MdOutlineChecklist />
                  <IoMdArrowDropdown />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex">
                  <MdFormatListBulleted />
                  <IoMdArrowDropdown />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex">
                  <MdOutlineFormatListNumbered />
                  <IoMdArrowDropdown />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <MdOutlineFormatIndentDecrease />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <MdFormatIndentIncrease />
                </div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm">
                  <MdFormatClear />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <EditorContent
            id="editor-content"
            editor={editor}
            className="min-w-[794px] max-w-[794px] min-h-[1123px] bg-white border text-black p-4 focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
