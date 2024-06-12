import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"


interface signupType {
 name: string
 email: string
 phone: string
 password: string
}
const Signup = () => {
 const { register, handleSubmit } = useForm<signupType>();

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
  })

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('userId', res.data.userId);
  console.log('user signed up');
  console.log(res.data.token);


 }

 return (
  <>
   <form onSubmit={handleSubmit(onSubmit)}>
    <div>
     <input
      {...register('name')}
      type="text"
      placeholder='Name' />
     <input
      {...register('email')}
      type="text"
      placeholder='Email' />
     <input
      {...register('phone')}
      type="Number"
      placeholder='Phone Number' />
     <input
      {...register('password')}
      type="Password"
      placeholder='Password' />
    </div>
    <div>
     <button type="submit">Submit</button>
    </div>
   </form>
  </>
 )
}

export default Signup