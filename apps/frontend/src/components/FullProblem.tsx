import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProblems } from '../Hooks';
import CodeEditor from './CodeEditor';
import axios from 'axios';
import { BACKEND_URL } from '../Config';

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  let userId = localStorage.getItem('userId');
  const location = useLocation();
  const navigate = useNavigate();
  const { problems, loading } = useProblems();

  const [problem, setProblem] = useState<{ id: string; title: string; description: string } | null>(location.state?.problem || null);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    if (!problem && !loading) {
      const fetchedProblem = problems?.find(p => p.id === id);

      if (fetchedProblem) {
        setProblem(fetchedProblem);
      } else {
        navigate('/'); // Redirect if the problem doesn't exist
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
        code:code
      })
      console.log(code);
      
      console.log('submission should be submitted');

    } catch (error) {
      console.error('Error submitting code:', error);
      // Handle network or other errors
    }
  };

  if (loading || !problem) {
    return <p>Loading...</p>; // Or you can render a loading indicator or a message
  }

  return (
    <div className='flex justify-between h-screen'>
      <div className="problem-detail w-1/2 p-4">
        <h1>{problem.title}</h1>
        <p>{problem.description}</p>
      </div>
      <div className="w-1/2 p-4">
        <h1>Code Editor</h1>
        <div className="w-full h-full">
          <CodeEditor onCodeChange={handleCodeChange} />
          <button type="submit" className='border border-black p-3 rounded-md' onClick={handleClick}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
