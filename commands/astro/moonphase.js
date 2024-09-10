const { SlashCommandBuilder } = require('discord.js');
const { Moon } = require('lunarphase-js');
const chrono = require('chrono-node');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moonphase')
        .setDescription('Report the current phase of the moon')
        .addStringOption(option =>
            option.setName('on_date')
                .setDescription('Date for current phase')
        ),
    async execute(interaction) {
        const mp_date = chrono.parseDate(interaction.options.getString('on_date') ?? 'today');
        const phase = Moon.lunarPhase(mp_date);
        await interaction.reply(phase + ' ' + Moon.emojiForLunarPhase(phase));
    }
}
