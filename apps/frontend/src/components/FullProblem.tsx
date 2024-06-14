import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useProblems } from '../Hooks';
import CodeEditor from './CodeEditor';
import axios from 'axios';
import { BACKEND_URL } from '../Config';
import Modal from './Modal';
import DOMPurify from 'dompurify';
import Navbar from './Navbar';

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const userId = localStorage.getItem('userId');
  const location = useLocation();
  const navigate = useNavigate();
  const { problems, loading } = useProblems();

  const [problem, setProblem] = useState<{ id: string; title: string; description: string } | null>(location.state?.problem || null);
  const [code, setCode] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000'); // Update to your WebSocket server URL

    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send(JSON.stringify({ userId }));
    };

    ws.onmessage = (message) => {
      const receivedResults = JSON.parse(message.data);
      setResults(receivedResults);
      setModalOpen(true); // Open the modal when results are received
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  useEffect(() => {
    if (!problem && !loading) {
      const fetchedProblem = problems?.find(p => p.id === id);

      if (fetchedProblem) {
        setProblem(fetchedProblem);
      } else {
        navigate('/all-problems'); // Redirect if the problem doesn't exist
      }
    }
  }, [id, problem, problems, loading, navigate]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleClick = async () => {
    if (!code) {
      alert('Please write some code before submitting.');
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}/submit`, {
        userId: userId,
        problemId: id,
        code: code
      });
      console.log('Submission should be submitted');
    } catch (error) {
      console.error('Error submitting code:', error);
      // Handle network or other errors
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setResults(null);
  };

  if (loading || !problem) {
    return <p className="text-white">Loading...</p>; // Or you can render a loading indicator or a message
  }

  const sanitizedDescription = DOMPurify.sanitize(problem.description);

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
        <div className="flex flex-grow overflow-hidden mb-8 px-4">
          <div className="flex flex-col w-1/2 p-6 bg-gray-800 rounded-md shadow-md overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
            <div
              className="text-gray-300 max-h-full overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
          
          <div className="flex flex-col w-1/2 p-6 ml-2 bg-gray-800 rounded-md shadow-md overflow-y-auto">
            <div className="flex-grow overflow-auto">
            <CodeEditor onCodeChange={handleCodeChange} />
          </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Results</h2>
          {results && results.map((result: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="text-gray-300">Test Case {result.key}: {result.status}</p>
              <p className="text-gray-300">Expected: {result.expectedOutput}</p>
              <p className="text-gray-300">Actual: {result.actualOutput}</p>
            </div>
          ))}
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-700"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal>
      )}
    </>
  );
};

export default ProblemDetail;
