import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProblems } from '../Hooks';
import CodeEditor from './CodeEditor';

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { problems, loading } = useProblems();

  console.log('Problems from useProblems:', problems);

  const [problem, setProblem] = useState<{ id: string; title: string; description: string } | null>(location.state?.problem || null);

  useEffect(() => {
    if (!problem && !loading) {
      const fetchedProblem = problems?.find(p => p.id == id);

      if (fetchedProblem) {
        setProblem(fetchedProblem);
      } else {
        navigate('/'); // Redirect if the problem doesn't exist
      }
    }
  }, [id, problem, problems, loading, navigate]);

  if (loading || !problem) {
    return <p>Loading...</p>; // Or you can render a loading indicator or a message
  }

  return (
    <div className='flex justify-between h-screen'>
      <div className="problem-detail w-1/2 p-4">
        <h1>{problem.title}</h1>
        <p>{problem.description}</p>
        {/* Add more details as needed */}
      </div>
      <div className="w-1/2 p-4">
        <h1>Code Editor</h1>
        <div className="w-full h-full">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;
