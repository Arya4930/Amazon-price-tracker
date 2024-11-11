const urls = [
    'https://www.amazon.in/gp/product/B0BB9ZH2LK/ref=ox_sc_act_image_1?smid=A3LMMNCB8LRXW0&psc=1',
    'https://www.amazon.in/ASUS-Battery-i7-12700H-Windows-FX507ZV-LP094W/dp/B0C4TW7328/?_encoding=UTF8&pd_rd_w=jHTm2&content-id=amzn1.sym.4d5b78c6-4f80-4b93-8d16-deb7aaa19e3f%3Aamzn1.symc.afd86303-4a72-4e34-8f6b-19828329e602&pf_rd_p=4d5b78c6-4f80-4b93-8d16-deb7aaa19e3f&pf_rd_r=94PTD8JAEMFMC55RTNN1&pd_rd_wg=OYGwn&pd_rd_r=38df7e9d-3514-42f2-be62-4bd4defedddb&ref_=pd_gw_ci_mcx_mr_hp_atf_m',
    'https://www.amazon.in/gp/product/B09BVCVTBC/ref=ox_sc_saved_image_1?smid=A14CZOWI0VEHLG&psc=1',
    'https://www.amazon.in/ASUS-Advantage-Battery-Sandstorm-FA617XS-N3026WS/dp/B0C4TW2SZM/ref=sr_1_1_sspa?crid=1FH1WBJ0VSBGZ&keywords=asus+tuf+f15&qid=1708280327&sprefix=asus+t%2Caps%2C256&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'
]
const cron = require('node-cron');
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");
const { scrapeWebsite } = require('./scrapeWebsite');

const { tracking } = require('./db/dbconfig');
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

bot.commands = new Collection();
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		bot.once(event.name, (...args) =>
			event.execute(...args, bot),
		);
	} else {
		bot.on(event.name, (...args) =>
			event.execute(...args, bot),
		);
	}
}

const CommandsPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(CommandsPath);

for (const folder of commandFolders) {
	const folderPath = path.join(CommandsPath, folder);
	const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filepath = path.join(folderPath, file);
		const command = require(filepath);

		if ("data" in command && "execute" in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filepath} is missing a required "data" or "execute" property.`,
			);
		}
	}
}

async function scrapeWebsites() {
    const d = new Date();
    console.log('======================' + d + '======================');
    for (const url of urls) {
        await scrapeWebsite(url);
    }
}

bot.login(process.env.BOT_TOKEN).then(() => {
    cron.schedule('0 */2 * * *', async () => {
        await scrapeWebsites();
    });

    scrapeWebsites();
});
