const { SlashCommandBuilder } = require('discord.js');
const https = require('node:https');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ismercuryretrograde')
            .setDescription('Sees whether mercury is retrograde now'),
    async execute(interaction) {
        https.get('https://mercuryretrogradeapi.com', {}, async (res) => {
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
