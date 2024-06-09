import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';

interface HighlightProps {
 code: string;
}

const Highlight: React.FC<HighlightProps> = ({ code }) => {
 const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
 return (
  <pre className="language-js m-0 p-0 whitespace-pre-wrap break-words leading-snug text-sm font-mono bg-transparent">
   <code dangerouslySetInnerHTML={{ __html: highlightedCode }} className="block whitespace-pre-wrap break-words font-mono text-sm bg-transparent" />
  </pre>
 );
};

export default Highlight;
