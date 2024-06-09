// import { Router } from "react-router-dom"
import AddProblem from "./Components/AddProblem"
import FullProblem from "./Components/FullProblem"
import Login from "./Components/Login"
import Problems from "./Components/Problems"
import Signup from "./Components/Signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/all-problems' element={<Problems />} />
          <Route path='/create-problem' element={<AddProblem />} />
          <Route path ='/problem/:id' element={<FullProblem />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
