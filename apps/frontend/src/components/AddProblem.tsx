import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import 'tailwindcss/tailwind.css';

const AddProblem = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [testcases, setTestcases] = useState<Array<{ input: string, expectedOutput: string }>>([{ input: '', expectedOutput: '' }]);

  const handleSubmit = async () => {
    const formattedTestcases = testcases.reduce((acc, testcase, index) => {
      acc[`testcase${index + 1}`] = testcase;
      return acc;
    }, {} as Record<string, { input: string, expectedOutput: string }>);

    const payload = {
      title,
      description: content,  
      testcases: formattedTestcases,
    };

    try {
      const res = await axios.post('http://localhost:8000/create-problem', payload);
      console.log('Response:', res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTestcaseChange = (index: number, field: string, value: string) => {
    const newTestcases = [...testcases];
    newTestcases[index] = { ...newTestcases[index], [field]: value };
    setTestcases(newTestcases);
  };

  const addTestcase = () => {
    setTestcases([...testcases, { input: '', expectedOutput: '' }]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <div className="flex flex-col w-full max-w-xl">
        <label className="required mb-2">Title</label>
        <input
          type="text"
          placeholder="Pick a title"
          className="p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-12 w-full max-w-xl">
        <h1 className="mb-2">Description</h1>
        <div className="bg-gray-700 rounded-md p-2">
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={newContent => setContent(newContent)}
            config={{
              readonly: false,
              theme: "dark",
            }}
          />
        </div>
      </div>

      <div className="mt-12 w-full max-w-xl">
        <h1 className="mb-4">Add a Testcase</h1>
        {testcases.map((testcase, index) => (
          <div key={index} className="flex flex-col mt-4 bg-gray-800 p-4 rounded-md">
            <label className="mb-2">Input</label>
            <input
              type="text"
              placeholder="Input"
              className="p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={testcase.input}
              onChange={e => handleTestcaseChange(index, 'input', e.target.value)}
            />
            <label className="mt-4 mb-2">Expected Output</label>
            <input
              type="text"
              placeholder="Expected Output"
              className="p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={testcase.expectedOutput}
              onChange={e => handleTestcaseChange(index, 'expectedOutput', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          onClick={addTestcase}
        >
          Add Another Testcase
        </button>
      </div>

      <div className="mt-12">
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-700"
          onClick={handleSubmit}
        >
          Contribute
        </button>
      </div>
    </div>
  );
};

export default AddProblem;
