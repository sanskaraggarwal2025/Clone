import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface signupType {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const Signup = () => {
  const { register, handleSubmit } = useForm<signupType>();
  const navigate = useNavigate();



  const onSubmit: SubmitHandler<signupType> = async (data: signupType) => {
    let res = await axios.post(`http://localhost:8000/signup`, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId);

    if (res) {
      navigate('/all-problems');
    }
    console.log('user signed up');
    console.log(res.data.token);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Signup</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
          <input
            {...register('name')}
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-400 mb-2">Phone Number</label>
          <input
            {...register('phone')}
            type="number"
            placeholder="Phone Number"
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="text-center">
          <Link to="/login">
            <p className="text-gray-400 pb-2">Already have an account?LogIn</p>
          </Link>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
