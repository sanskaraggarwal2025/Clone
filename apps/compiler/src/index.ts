import express from "express";
import db from "@repo/db";
import { node } from "compile-run";

const app = express();
const PORT = 8001;

app.use(express.json());

async function runTestCases(code: any, testcases: any) {
 const outputs = [];
 for (let key in testcases) {
  const { input, expectedOutput } = testcases[key];
  const [inputArrayStr, inputNumberStr] = input.split(/\s+/);

  const inputArray = JSON.parse(inputArrayStr);
  const inputNumber = parseInt(inputNumberStr);

  const codeWithTestcase = `${code}; let ans = func(${JSON.stringify(inputArray)},${inputNumber}); console.log(ans)`;

  try {
   const result = await node.runSource(codeWithTestcase);

   const actualOutput = result.stdout.trim();

   const passed = actualOutput === expectedOutput;

   outputs.push({
    key: key,
    expectedOutput: expectedOutput,
    actualOutput: actualOutput,
    status: passed ? 'Passed' : 'Failed'
   });
  } catch (err) {
   console.error('Error occurred:', err);
  }
 }

 return outputs;
}

app.post('/execute', async (req, res) => {
 const { userId, problemId, code, testcases } = req.body;

 const results = await runTestCases(code, testcases);

 const newSubmission = await db.submission.create({
  data: {
   code: code,
   userId: userId,
   problemId: problemId
  }
 })

 res.json(results);
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});




// {
//  "userId": 1,
//   "problemId": 1,
//    "code": "function func(a,b){return a+b;}",
//     "testcases": {
//   "testcase1": {
//    "input": "12 2",
//     "expectedOutput": "14"
//   },
//   "testcase2": {
//    "input": "2 2",
//     "expectedOutput": "4"
//   }
//  }
// }