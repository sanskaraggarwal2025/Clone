import { Link } from 'react-router-dom';
import { useProblems } from '../Hooks';
import Skeleton from './Skeleton';

const Problems = () => {
  const { loading, problems } = useProblems();
  console.log(problems);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-xl">
        <ul>
          {problems?.map((problem) => (
            <li key={problem.id}>
              <Link
                to={`/problem/${problem.id}`}
                state={{ problem }} // Pass the state directly here
              >
                {problem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Problems;
