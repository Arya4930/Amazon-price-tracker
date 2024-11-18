import trackinglinks from "../DB/TrackingLinks.js";

async function AddTrackingutton(url) {
  try {
    if (!url) return "Please provide a URL.";

    const amazonRegex = /^https:\/\/www\.amazon\.in\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/;
    if (!amazonRegex.test(url)) return "Please provide a valid Amazon.in product link.";

    const normalizedUrl = url.toLowerCase();
    const tracked = await trackinglinks.findOne({ where: { url: normalizedUrl } });

    if (tracked) return "This link is already being tracked. Please avoid adding duplicates.";

    await trackinglinks.create({ url: normalizedUrl });

    console.log(`Added new tracking link: ${normalizedUrl}`);
    return "Amazon Link added successfully";
  } catch (error) {
    console.error("Error adding tracking link:", error);
    throw new Error("Failed to add tracking link");
  }
}

export default AddTrackingutton;
