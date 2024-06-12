import { useForm,SubmitHandler } from "react-hook-form";
import axios from "axios";

interface loginType{
 email:string
 password:string
}

const Login = () => {
 const { register,  handleSubmit } = useForm<loginType>();

 const onSubmit:SubmitHandler<loginType> = async (data: loginType) => {
  console.log(data);
  console.log(data.email);
  console.log(data.password);
  let res =  await axios.post(`http://localhost:8000/login`,{
   email:data.email,
   password:data.password
  })
  localStorage.setItem("token",res.data.token);
  localStorage.setItem("userId",res.data.userId);
  console.log(res.data.msg);
  
 }

 return (
  <>
   <form onSubmit={handleSubmit(onSubmit)}>
    <div>
     <input
      {...register("email")}
      type="text"
      placeholder='Username'
     />
     <input
      {...register("password")}
      type="text"
      placeholder='password'
     />
    </div>
    <div>
     <button type='submit'>Login</button>
    </div>
   </form>

  </>
 )
}

export default Login