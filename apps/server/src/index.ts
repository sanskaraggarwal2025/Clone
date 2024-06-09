import express from "express";
import db from "@repo/db";
import jwt from "jsonwebtoken"
import cors from "cors"
import * as dotenv from 'dotenv';
import { createClient } from "redis";
dotenv.config();

const app = express();

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
app.use(express.json())
app.use(cors());

app.post('/login', async (req, res) => {
 const { email, password } = req.body;
 const user = await db.user.findFirst({
  where: {
   email: email,
  }
 });

 if (!user) {
  return res.status(411).send('Email not exist');
 }

 if (password !== user.password) {
  return res.status(411).send('Invalid Credentials');
 }

 const jwtToken = jwt.sign({ email: email }, process.env.JWT_SECRET as string);

 return res.status(200).json({
  msg: 'User LoggedIn',
  token: jwtToken
 });

})

app.post('/signup', async (req, res) => {
 const { name, email, phone, password } = req.body;

 if (!email || !password || !name || !phone) {
  return res.status(411).send("All fields are mandatory");
 }

 const isUser = await db.user.findFirst({
  where: {
   OR: [
    { email: email },
    { phone: phone }
   ]

  }
 })

 if (isUser) {
  return res.status(411).send('User already exist');
 }

 const newUser = await db.user.create({
  data: {
   name: name,
   email: email,
   phone: phone,
   password: password
  }
 })

 const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string);
 return res.status(200).json({
  msg: "User Created",
  token: token
 })
})

app.post('/create-problem', async (req, res) => {
 const { description, testcases,title } = req.body;

 const newProblem = await db.problem.create({
  data: {
   title:title,
   description: description,
   testcases: testcases,
  }
 })

 return res.status(200).json({
  msg: "New Problem created",
  ProblemId: newProblem.id
 })
})

app.get('/all-problems', async (req, res) => {

 const allProblems = await db.problem.findMany();

 if (!allProblems) return res.status(411).send('No Problem Found');

 return res.status(200).json(allProblems);
})

app.get('/get-problem/:id', async (req, res) => {
 const id = parseInt(req.params.id);

 const problem = await db.problem.findFirst({
  where: {
   id: id
  }
 })

 if (!problem) {
  return res.status(411).send('Problem not found');
 }

 return res.status(200).json(problem);

})

async function startServer() {
 try {
  await client.connect();
  console.log("connected to redis");
 }
 catch (error) {
  console.error("Failed to connect to Redis", error);
 }
}
startServer();

//cmd to start redis -> docker run --name my-redis -d -p 6379:6379 redis

app.post('/submit', async (req, res) => {
 const { userId, problemId, code, testcases } = req.body;
 try {
  await client.lPush("submissions", JSON.stringify({ userId, problemId, code, testcases }));
  // Store in the database
  res.status(200).send("Submission received and stored.");
 } catch (error) {
  console.error("Redis error:", error);
  res.status(500).send("Failed to store submission.");
 }
})

app.listen(8000, () => {
 console.log('Listening on port 8000');
})