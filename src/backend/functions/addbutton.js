import trackinglinks from "../DB/TrackingLinks.js";
import ScrapeWebsite from "./ScrapeWebsite.js";
import tracking from "../DB/tracking.js";

async function AddTrackingutton(url) {
  try {
    if (!url) return "Please provide a URL.";

    if (!url.startsWith('https://www.amazon.in/')) return "Please provide a valid Amazon.in product link.";

    const tracked = await trackinglinks.findOne({ where: { url: url } });

    if (tracked) return "This link is already being tracked. Please avoid adding duplicates.";

    await trackinglinks.create({ url: url, product_type: product_type });
    await ScrapeWebsite(url, tracking)
    return "Amazon Link added successfully";
  } catch (error) {
    console.error("Error adding tracking link:", error);
    throw new Error("Failed to add tracking link");
  }
}

export default AddTrackingutton;
