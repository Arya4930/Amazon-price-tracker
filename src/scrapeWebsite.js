const axios = require('axios');
const cheerio = require('cheerio');
const CC = require('currency-converter-lt');
const { tracking } = require('./db/dbconfig');
let CurrencyConverter = new CC

async function scrapeWebsite(url) {
    try {
        const response = await axios.get(url)
        const html = response.data

        const $ = cheerio.load(html);

        const price_new = await parseInt($('.a-price-whole').first().text().replace(/,/g, ''));
        const price_new_USD  = await CurrencyConverter.from('INR').to('USD').amount(price_new).convert()
        const title = $('.product-title-word-break').first().text().split(',')[0].trim()
        const product_image = $('.a-dynamic-image').first().attr('src')

        const trackedWithSamePrice = await tracking.findAll({ where: { name: title, price_INR: price_new, price_USD: price_new_USD } });
        const tracked = await tracking.findOne({ where: { name: title } });
        if (trackedWithSamePrice.length > 0) {
            console.log('| ✅ Price for ' + title + ' stayed same since last checked, No changes made');
        }
        else if (tracked) {
            await tracking.update({
                price_INR: price_new,
                price_USD: price_new_USD
            }, {
                where: {
                    name: title
                }
            });
            console.log('| ✅ The price of ' + title + ' has Updated on to ' + price_new.toLocaleString() + ' INR and ' + (price_new_USD).toLocaleString() + ' USD');
        }
        else {
            try {
                await tracking.create({
                    name: title,
                    price_INR: price_new,
                    price_USD: price_new_USD,
                    product_image: product_image
                });
                console.log(`| ✅ Data for ${title} added to database`);
            }
            catch (error) {
                console.log('| ❌ Error adding data to database:', error);
            }
        }
    } catch (error) {
        console.error('| ❌ Error fetching website:', error.name);
    }
}

module.exports = { scrapeWebsite }