import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Highlight from './Highlight';

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({onCodeChange}) => {
 const [code, setCode] = useState<string>('');
 const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

 const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
  if (event.key === 'Enter') {
   const value = event.currentTarget.value;
   const cursorPosition = event.currentTarget.selectionStart;
   const textBeforeCursor = value.substring(0, cursorPosition);
   const textAfterCursor = value.substring(cursorPosition);

   // Check for shortcuts
   if (textBeforeCursor.endsWith('log')) {
    event.preventDefault();
    insertShortcut(
     cursorPosition,
     textBeforeCursor,
     textAfterCursor,
     'console.log()',
     'log'.length,
     'console.log('.length
    );
   }

   
  }
 };

 const insertShortcut = (
  cursorPosition: number,
  textBeforeCursor: string,
  textAfterCursor: string,
  shortcut: string,
  lengthToCut: number,
  start: number,
  end?: number
 ) => {
  const newCode = `${textBeforeCursor.slice(0, -lengthToCut)}${shortcut}${textAfterCursor}`;
  setCode(newCode);

  // Set cursor position
  setTimeout(() => {
   if (textareaRef.current) {
    textareaRef.current.selectionStart = cursorPosition - lengthToCut + start;
    textareaRef.current.selectionEnd = end ? cursorPosition - lengthToCut + end : cursorPosition - lengthToCut + start;
   }
  }, 0);
 };

 

  return (
    <div className="relative w-full h-[500px] bg-gray-800 rounded-md shadow-md">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck="false"
        autoComplete="off"
        className="
          absolute
          top-0
          left-0
          z-10
          w-full
          h-full
          px-6
          py-8
          text-sm
          font-mono
          leading-snug
          border
          border-gray-700
          rounded-md
          outline-none
          resize-none
          bg-transparent
          text-transparent
          caret-black
          box-border
          overflow-hidden
          whitespace-pre-wrap
          break-words
        "
      />
      <div className="absolute top-0 left-0 pointer-events-none z-0 w-full h-full p-2.5 box-border overflow-hidden text-white text-sm font-mono leading-snug whitespace-pre-wrap break-words bg-transparent">
        <Highlight code={code} />
      </div>
    </div>
  );
};

export default CodeEditor;
