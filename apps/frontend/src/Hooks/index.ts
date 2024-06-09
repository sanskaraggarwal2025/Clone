import axios from "axios";
import { BACKEND_URL } from "../Config"
import { useState,useEffect } from "react"

export interface ProblemType{
 "id": string;
 "title":string;
 "description":string;

}

export const useProblems = () => {
 const [loading,setLoading] = useState(true);
 const [problems,setProblems] = useState<ProblemType[]>();

 useEffect(() => {
  const fetchProblems = async() => {
   let res = await axios.get(`${BACKEND_URL}/all-problems`);
   setProblems(res.data);
   setLoading(false);
  }

  fetchProblems();
 },[])
 return {
  loading,
  problems
 }

}