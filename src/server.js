import express from 'express'
import cron from "node-cron";
import scrapeWebsites from './backend/main.js';
import tracking from "./backend/DB/tracking.js";
import { WebSocketServer } from 'ws'

const app = express();
const port = 5000;

let cachedProducts = []; // Holds the latest scraped products
const clients = new Set() // Track WebSocket Clients

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    cachedProducts = await tracking.findAll()
    res.render("index.ejs", { cachedProducts });
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

const server =  app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const wss = new WebSocketServer({ server })

wss.on("connection", (ws) => {
   clients.add(ws)

   ws.on('close', () => {
    clients.delete(ws)
   })
})

cron.schedule("0 */2 * * *", async () => {
  await scrapeWebsites(clients, cachedProducts);
});

await scrapeWebsites(clients, cachedProducts)