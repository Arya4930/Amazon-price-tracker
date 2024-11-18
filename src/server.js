import express from "express";
import cron from "node-cron";
import scrapeWebsites from "./backend/main.js";
import tracking from "./backend/DB/tracking.js";
import { WebSocketServer } from "ws";
import AddTrackingutton from "./backend/functions/addbutton.js";

const app = express();
const port = 5000;

let cachedProducts = []; // Holds the latest scraped products
const clients = new Set(); // Track WebSocket Clients

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()); // Parse JSON requests


app.get("/", async (req, res) => {
  try {
    cachedProducts = await tracking.findAll();
    res.render("index.ejs", { cachedProducts });
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

// API Endpoint for ading Trackinglinks
app.post("/api/add-tracking", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const result = await AddTrackingutton(url);
    if (result === "Amazon Link added successfully") {
      res.status(200).json({ message: result });
    } else {
      res.status(400).json({ message: result });
    }
  } catch (error) {
    console.error("Error adding tracking link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// WebSocket 
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  clients.add(ws);

  ws.on("close", () => {
    clients.delete(ws);
  });
});

// Schedule
cron.schedule("0 */2 * * *", async () => {
  await scrapeWebsites(clients, cachedProducts);
});


await scrapeWebsites(clients, cachedProducts);
