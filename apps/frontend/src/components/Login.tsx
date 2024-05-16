
const Login = () => {
  return (
   <div className="bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="bg-gray-800 text-white px-10 py-8 rounded shadow-lg">
     <h2 className="text-xl font-bold mb-4">Login</h2>
     <form className="flex flex-col space-y-4">
      <input type="text" placeholder="Username" className="bg-gray-700 px-4 py-2 rounded" />
      <input type="password" placeholder="Password" className="bg-gray-700 px-4 py-2 rounded" />
      <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Login</button>
     </form>
    </div>
   </div>
  )
}

export default Login