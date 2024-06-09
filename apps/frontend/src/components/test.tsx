import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";

const AddProblem = () => {
 const editor = useRef(null);
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [testcases, setTestcases] = useState([{ input: '', expectedOutput: '' }]);

 const handleSubmit = async () => {
  const formattedTestcases = testcases.reduce((acc, testcase, index) => {
   acc[`testcase${index + 1}`] = testcase;
   return acc;
  }, {});

  const payload = {
   title,
   description: content,
   testcases: formattedTestcases,
  };
  console.log(payload);
  

  try {
   const res = await axios.post('YOUR_API_ENDPOINT', payload);
   console.log('Response:', res.data);
  } catch (error) {
   console.error('Error:', error);
  }
 };

 const handleTestcaseChange = (index, field, value) => {
  const newTestcases = [...testcases];
  newTestcases[index][field] = value;
  setTestcases(newTestcases);
 };

 const addTestcase = () => {
  setTestcases([...testcases, { input: '', expectedOutput: '' }]);
 };

 return (
  <div>
   <div className="flex flex-col">
    <label className="required">Title</label>
    <input
     type="text"
     placeholder="Pick a title"
     className="border border-black"
     value={title}
     onChange={e => setTitle(e.target.value)}
    />
   </div>

   <div className="mt-12">
    <h1>Description</h1>
    <JoditEditor
     ref={editor}
     value={content}
     onBlur={newContent => setContent(newContent)}
     onChange={newContent => { }}
    />
   </div>

   <div className="mt-12">
    <h1>Add a Testcase</h1>
    {testcases.map((testcase, index) => (
     <div key={index} className="flex flex-col mt-4">
      <label>Input</label>
      <input
       type="text"
       placeholder="Input"
       className="border border-black"
       value={testcase.input}
       onChange={e => handleTestcaseChange(index, 'input', e.target.value)}
      />
      <label className="mt-4">Expected Output</label>
      <input
       type="text"
       placeholder="Expected Output"
       className="border border-black"
       value={testcase.expectedOutput}
       onChange={e => handleTestcaseChange(index, 'expectedOutput', e.target.value)}
      />
     </div>
    ))}
    <button type="button" className="border border-black mt-4" onClick={addTestcase}>
     Add Another Testcase
    </button>
   </div>

   <div>
    <button type="submit" className="border border-black mt-4" onClick={handleSubmit}>
     Contribute
    </button>
   </div>
  </div>
 );
};

export default AddProblem;
