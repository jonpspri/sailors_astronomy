const { SlashCommandBuilder } = require('discord.js');
const https = require('node:https');
const chrono = require('chrono-node');
const dayjs = require('dayjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ismercuryretrograde')
        .setDescription('Sees whether mercury is retrograde now')
        .addStringOption(option =>
            option.setName('on_date')
                .setDescription('Date for current phase')
        ),
    async execute(interaction) {
        const day = dayjs(chrono.parseDate(interaction.options.getString('on_date') ?? 'today'));
        https.get(
            'https://mercuryretrogradeapi.com?date=' + day.format('YYYY-MM-DD'),
            {},
            async (res) => {
                res.setEncoding('utf8');
                let response = "";
                res.on('data', (chunk) => {
                    response = response + chunk;
            });
            res.on('end',  async () => {
                try {
                    await interaction.reply(
                        JSON.parse(response).is_retrograde ? "Yes" : "No"
                    )
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
    }
}
