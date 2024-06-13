import express from "express";
import db from "@repo/db";
import { node } from "compile-run";
import { createClient } from "redis";

const client = createClient();
const pubClient = createClient();

async function runTestCases(submission: any) {
 const { code, testcases, userId } = JSON.parse(submission);
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

   function cleanString(str: string) {
    return str.replace(/\s+/g, '');
   }

   const cleanedExpectedOutput = cleanString(expectedOutput);
   const cleanedActualOutput = cleanString(actualOutput);
   const passed = cleanedActualOutput === cleanedExpectedOutput;

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

 console.log(outputs);
 const resultMessage = JSON.stringify({ userId, results: outputs });
 await pubClient.publish('testcase_results', resultMessage);
 console.log('worker se msg chla gya');
 console.log(resultMessage);
 

 return outputs;
}

async function startWorker() {
 try {
  await client.connect();
  await pubClient.connect();
  console.log('worker connected to redis');

  while (true) {
   try {
    console.log("redis is starting to run the code");
    const submission = await client.brPop("submissions", 0);
    await runTestCases(submission?.element);
   } catch (err) {
    console.log('error processing submission', err);
   }
  }
 } catch (error) {
  console.error("Failed to connect to Redis", error);
 } finally {
  await client.quit();
  await pubClient.quit();
 }
}

startWorker();
