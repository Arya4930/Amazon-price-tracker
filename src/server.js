import express from 'express'
const app = express();
const port = 3001;
import tracking from './backend/tracking'

app.set("view engine", "ejs");
app.use(express.static("public")); // Serve static files

// Route to render the tracked products page
app.get("/", async (req, res) => {
  try {
    const products = await tracking.findAll();
    res.render("index.ejs", { products });
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
