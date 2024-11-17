require('dotenv').config();
const { Client, GatewayIntentBits} = require('discord.js');
const { config } = require('dotenv');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} is running`);
});



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    // erm command
    if (interaction.commandName === 'erm') {
        await interaction.reply({ content: interaction.commandName, ephemeral: true });
    }
    // delete command
    if (interaction.commandName === 'delete') {
        const user = interaction.options.getString('user');
        const msgCount = interaction.options.getInteger('msg-count');
        const channel = interaction.channel;
    
        await interaction.deferReply({ ephemeral: true });
    
        const messages = await channel.messages.fetch({ limit: 100 });
    
        const userMessages = messages
            .filter(msg => msg.author.username === user)
            .toJSON()
            .slice(0, msgCount);
    
        const deleteResults = await Promise.all(
            userMessages.map(async msg => {
                try {
                    await msg.delete();
                    return true;
                } catch (error) {
                    console.error(`Failed to delete message: ${error.message}`);
                    return false;
                }
            })
        );
    
        const deletedCount = deleteResults.filter(success => success).length;
    
        await interaction.editReply({
            content: `Deleted ${deletedCount} messages from ${user}.`,
        });
    }
    
});
    
    

client.login(process.env.TOKEN);