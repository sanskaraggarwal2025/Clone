import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createClient } from "redis";

const subClient = createClient();
const userConnection = new Map();

async function startWebSocketServer() {
 await subClient.connect();

 const server = createServer();
 const wss = new WebSocketServer({ server });

 subClient.subscribe('testcase_results', (message) => {
  const { userId, results } = JSON.parse(message);
  console.log(message);

  const userSocket = userConnection.get(userId);

  if (userSocket && userSocket.readyState === userSocket.OPEN) {
   userSocket.send(JSON.stringify(results));
  }
 })

 wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {


   const { userId } = JSON.parse(message.toString());
   userConnection.set(userId, ws);
   console.log('gya kya');

  })

  ws.on('close', () => {
   console.log('client connected');
   userConnection.forEach((value, key) => {
    if (value == ws) {
     userConnection.delete(key);
    }
   })

  })

 })

 server.listen(3000, () => {
  console.log('WebSocket server is listening on port 3000');
 });
}

startWebSocketServer();