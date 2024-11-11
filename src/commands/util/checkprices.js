const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tracking } = require('../../db/dbconfig');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkprices')
        .setDescription('Checks the prices of stuff!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('provide the name of the item you want to check the price of.')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused()
        const ch = await tracking.findAll({ attributes: ['name'] })
        const choices = await ch.map(t => t.name)
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        const tracked = await tracking.findOne({ where: { name: interaction.options.getString('name') } });
        const embed = new EmbedBuilder()
            .setTitle(tracked.get('name'))
            .addFields(
                { name: 'Price in INR', value: tracked.get('price_INR').toString(), inline: true},
                { name: 'Price in USD', value: tracked.get('price_USD').toString(), inline: true},
            )
            .setTimestamp()
            .setColor('#00ff00')
            .setThumbnail(tracked.get('product_image'));

        await interaction.reply({ embeds: [embed]});
    },
};