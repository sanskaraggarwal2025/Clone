import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
interface loginType {
 email: string;
 password: string;
}

const Login = () => {
 const { register, handleSubmit } = useForm<loginType>();
 const navigate = useNavigate();


 const onSubmit: SubmitHandler<loginType> = async (data: loginType) => {
  console.log(data);
  console.log(data.email);
  console.log(data.password);
  let res = await axios.post(`http://localhost:8000/login`, {
   email: data.email,
   password: data.password,
  });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("userId", res.data.userId);

  if(res){
   navigate('/all-problems');
  }
  console.log(res.data.msg);
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
   <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
   >
    <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
    <div className="mb-4">
     <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
     <input
      {...register("email")}
      type="email"
      placeholder="Email"
      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
     />
    </div>
    <div className="mb-4">
     <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
     <input
      {...register("password")}
      type="password"
      placeholder="Password"
      className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
     />
    </div>
    <div className="text-center">
     <Link to = "/signup">
     <p className="text-gray-400 pb-2">Don't have an account?SignUp</p>
     </Link>
     <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
     >
      Login
     </button>
    </div>
   </form>
  </div>
 );
};

export default Login;







