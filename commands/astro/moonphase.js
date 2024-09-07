const { SlashCommandBuilder } = require('discord.js');
const { Moon } = require('lunarphase-js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('moonphase')
            .setDescription('Report the current phase of the moon'),
    async execute(interaction) {
        const phase = Moon.lunarPhase();
        await interaction.reply(phase + ' ' + Moon.lunarPhaseEmoji());
    }
}
