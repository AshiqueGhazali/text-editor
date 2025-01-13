"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
// import List from '@tiptap/extension-list';
// import TaskList from '@tiptap/extension-task-list';
// import Indent from '@tiptap/extension-indent';
import CharacterCount from "@tiptap/extension-character-count";

import { IoDocumentText } from "react-icons/io5";
import { LuUndo2 , LuRedo2, LuPrinter, LuSpellCheck, LuPaintRoller} from "react-icons/lu";
import { IoIosArrowDown, IoMdArrowDropdown, IoMdLink } from "react-icons/io";
import { TiMinus } from "react-icons/ti";
import { FaItalic, FaPlus } from "react-icons/fa";
import { BsHighlighter, BsTypeBold } from "react-icons/bs";
import { MdFormatAlignLeft, MdFormatClear, MdFormatIndentIncrease, MdFormatListBulleted, MdFormatUnderlined, MdOutlineChecklist, MdOutlineFormatColorText, MdOutlineFormatIndentDecrease, MdOutlineFormatListNumbered, MdOutlineImage } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { CiLineHeight } from "react-icons/ci";


const buttons = [
  { title: "File" },
  { title: "Edit" },
  { title: "Insert" },
  { title: "View" },
  { title: "Style" },
];

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Link,
      Image,
      //   List,
      //   TaskList,
      //   Indent.configure({ levels: 5 }),
      CharacterCount,
    ],
    content: "<p>Welcome to the Science of Happiness!</p>",
  });

  const handleBold = () => editor?.chain().focus().toggleBold().run();
  const handleItalic = () => editor?.chain().focus().toggleItalic().run();
  const handleUndo = () => editor?.chain().focus().undo().run();
  const handleRedo = () => editor?.chain().focus().redo().run();
  const handleInsertImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

//   const handlePrint = () => {
//     window.print();
//   };

// const handlePrint = () => {
//     const editorContent = document.getElementById("editor-content");
//     const printWindow = window.open("", "", "width=800,height=600");

//     printWindow?.document.write("<html><head><title>Print</title>");

//     printWindow?.document.write(`
//       <style>
//         body { font-family: Arial, sans-serif; }
//         * { margin: 0; padding: 0; }
//         #editor-content { display: block; width: 100%; padding: 20px; }
//         h1, h2, h3, h4, h5, h6 { font-weight: bold; }
//         p, li { font-size: 14px; line-height: 1.6; }
//         a { color: blue; text-decoration: underline; }
//         img { max-width: 100%; height: auto; }
//       </style>
//     `);

//     printWindow?.document.write("</head><body>");
    
//     printWindow?.document.write(editorContent?.innerHTML || "fdgdf");

//     printWindow?.document.write("</body></html>");
//     printWindow?.document.close();
    
//     printWindow?.print();
//   };
const handlePrint = () => {
    const editorContent = document.getElementById("editor-content");
  
    // Create a print-specific style
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
  
    // Clone the editor content to print
    const printContent = editorContent?.cloneNode(true) as HTMLElement;
  
    // Get the screen width and height
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
  
    // Set the width and height for the print window
    const windowWidth = 800;
    const windowHeight = 600;
  
    // Calculate the center position
    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;
  
    // Create a new window for printing content, centered on the screen
    const printWindow = window.open(
      '',
      '',
      `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`
    );
  
    if (printWindow) {
      // Inject the styles and content into the print window
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
  
      // Close the document stream to finish the document
      printWindow.document.close();
  
      // Assign the onload event handler
      printWindow.onload = () => {
        printWindow.print();  // Open the print dialog
        printWindow.close();  // Close the print window once the dialog is opened
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
                <div onClick={handleUndo} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><LuUndo2 /></div>
                <div onClick={handleRedo} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><LuRedo2 /></div>
                <div onClick={handlePrint} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><LuPrinter /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><LuSpellCheck /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><LuPaintRoller /></div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex gap-1 "><p className="text-xs font-semibold cursor-pointer">100&</p><IoIosArrowDown /></div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex gap-1 "><p className="text-xs font-normal cursor-pointer">Normal text</p><IoIosArrowDown /></div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex gap-1 "><p className="text-xs font-normal cursor-pointer">Arial</p><IoIosArrowDown /></div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><TiMinus/></div>
                <div className="text-gray-600 border border-[#d3def0] p-2 text-black rounded-lg "><p className="text-xs font-normal">12</p></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><FaPlus /></div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div onClick={handleBold} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><BsTypeBold /></div>
                <div onClick={handleItalic} className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><FaItalic /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><MdFormatUnderlined /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><MdOutlineFormatColorText /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><BsHighlighter /></div>
              </div>
              <div className="flex gap-1 border-r-2 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><IoMdLink /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><BiCommentAdd /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><MdOutlineImage /></div>
              </div>
              <div className="flex gap-1 border-[#d3def0] pr-2">
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex"><MdFormatAlignLeft /><IoMdArrowDropdown /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><CiLineHeight /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex"><MdOutlineChecklist /><IoMdArrowDropdown /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex"><MdFormatListBulleted /><IoMdArrowDropdown /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm flex"><MdOutlineFormatListNumbered /><IoMdArrowDropdown /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><MdOutlineFormatIndentDecrease /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><MdFormatIndentIncrease /></div>
                <div className="text-gray-600 hover:bg-[#d3def0] p-2 rounded-sm"><MdFormatClear /> </div>
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
