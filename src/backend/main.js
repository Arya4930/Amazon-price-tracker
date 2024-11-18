import ScrapeWebsite from "./functions/ScrapeWebsite.js";
import tracking from "./DB/tracking.js";
import trackinglinks from "./DB/TrackingLinks.js";

export default async function scrapeWebsites(clients, cachedProducts) {
    const data = await trackinglinks.findAll()
    const urls = data.map(item => item.dataValues.url)
    const d = new Date();
    console.log(`====================== ${d} ======================`);
    for (const url of urls) {
        await ScrapeWebsite(url, tracking);
    }
    cachedProducts = await tracking.findAll();
    for (const client of clients) {
        client.send("reload");
    }
}