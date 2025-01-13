import TextAlign from '@tiptap/extension-text-align';
import { Extension } from '@tiptap/core';


export const CustomTextAlign = TextAlign.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph'], // Define types to support alignment
      alignments: ['left', 'center', 'right', 'justify'], // Add justify alignment
    };
  },
});


export const TextColor = Extension.create({
  name: 'textColor',

  addOptions() {
    return {
      colors: ['#000000', '#FF0000', '#00FF00', '#0000FF'], // Default colors
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element:any) => element.style.color || null,
        renderHTML: (attributes:any) => {
          if (!attributes.color) return {};
          return { style: `color: ${attributes.color}` };
        },
      },
    };
  },

  addCommands():any {
    return {
      setTextColor:
        (color:any) =>
        ({ commands }:any) =>
          commands.updateAttributes(this.name, { color }),
      unsetTextColor:
        () =>
        ({ commands }:any) =>
          commands.resetAttributes(this.name, 'color'),
    };
  },

  addPasteRules() {
    return [];
  },
});