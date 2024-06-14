import { Link } from 'react-router-dom';
import { useProblems } from '../Hooks';
import Skeleton from './Skeleton';

const Problems = () => {
  const { loading, problems } = useProblems();

  return (
    <>
    <div className="min-h-screen flex justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-xl">
        {loading ? (
          <Skeleton />
        ) : (
          <ul className="space-y-4">
            {problems?.map((problem) => (
              <li key={problem.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:bg-gray-700 transition-colors">
                <Link
                  to={`/problem/${problem.id}`}
                  state={{ problem }} // Pass the state directly here
                  className="text-blue-400 hover:text-blue-300"
                >
                  {problem.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default Problems;
