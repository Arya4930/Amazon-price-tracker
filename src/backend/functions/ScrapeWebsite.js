import * as cheerio from "cheerio";
import axios from "axios";
import CC from "currency-converter-lt";
let CurrencyConverter = new CC();

export default async function ScrapeWebsite(url, tracking) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const price_new = parseInt(
      $(".a-price-whole").first().text().replace(/,/g, "")
    );
    const price_new_USD = await CurrencyConverter.from("INR")
      .to("USD")
      .amount(price_new)
      .convert();
    const title = $(".product-title-word-break")
      .first()
      .text()
      .split(",")[0]
      .trim();

    const product_image = $("#imgTagWrapperId").first().find("img").attr("src")

    const tracked = await tracking.findOne({ where: { name: title } });

    if (tracked) {
      const trackedWithSamePrice = await tracking.findAll({
        where: { name: title, price_INR: price_new },
      });
      if (trackedWithSamePrice.length > 0)
        return console.log(
          `| ✅ Price for ${title} stayed same since last checked, No changes made`
        );
      await tracking.update(
        { price_INR: price_new, price_USD: price_new_USD },
        { where: { name: title } }
      );
      console.log(
        `| ✅ The price of ${title} has Updated to ${price_new.toLocaleString()} INR and ${price_new_USD.toLocaleString()} USD`
      );
    } else {
      await tracking.create({
        name: title,
        price_INR: price_new,
        price_USD: price_new_USD,
        product_image,
        product_url: url,
      });
      console.log(`| ✅ Data for ${title} added to database`);
    }
  } catch (error) {
    console.error("| ❌ Error fetching website:", error);
  }
}