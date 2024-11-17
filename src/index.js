require('dotenv').config();
const { Client, GatewayIntentBits, PermissionFlagsBits} = require('discord.js');
const { config } = require('dotenv');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', () => {
    console.log(`\u001B[35m${client.user.tag} \u001B[32mis running \u001B[0m`);
});



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    // erm command
    if (interaction.commandName === 'erm') {
        await interaction.reply('█░█░█ █░█ ▄▀█ ▀█▀\n▀▄▀▄▀ █▀█ █▀█ ░█░\n\n▀█▀ █░█ █▀▀\n░█░ █▀█ ██▄\n\n█▀ █ █▀▀ █▀▄▀█ ▄▀█\n▄█ █ █▄█ █░▀░█ █▀█');
    }
    
    // delete command
    if (interaction.commandName === 'delete') {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return await interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true,
            });
        } else {
            const user = interaction.options.getString('user');
            const msgCount = interaction.options.getInteger('msg-count');
            const channel = interaction.channel;
        
            await interaction.deferReply({ ephemeral: true });
        
            const messages = await channel.messages.fetch({ limit: 100 });
            const userMessages = messages
                .filter(msg => msg.author.username === user)
                .toJSON()
                .slice(0, msgCount);
        
            if (userMessages.length > 0) {
                try {
                    await channel.bulkDelete(userMessages.map(msg => msg.id), true);
                    await interaction.editReply({
                        content: `Deleted ${userMessages.length} messages from ${user}.`,
                    });
                } catch (error) {
                    console.error(`Failed to delete messages: ${error.message}`);
                    await interaction.editReply({
                        content: `There was an error deleting the messages.`,
                    });
                }
            } else {
                await interaction.editReply({
                    content: `No messages found from ${user}.`,
                });
            }    
        }
    } 
    
    // clear command
    if (interaction.commandName === 'clear') {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return await interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true,
            });
        } else {
            const msgCount = interaction.options.getInteger('msg-count');
            const channel = interaction.channel;
        
            await interaction.deferReply({ ephemeral: true });
        
            const messages = await channel.messages.fetch({ limit: 100 });
            const messagesToDelete = messages.toJSON().slice(0, msgCount);
        
            if (messagesToDelete.length > 0) {
                try {
                    await channel.bulkDelete(messagesToDelete.map(msg => msg.id), true);
                    await interaction.editReply({
                        content: `Deleted ${messagesToDelete.length} messages.`,
                    });
                } catch (error) {
                    console.error(`Failed to delete messages: ${error.message}`);
                    await interaction.editReply({
                        content: `There was an error deleting the messages.`,
                    });
                }
            } else {
                await interaction.editReply({
                    content: `No messages found.`,
                });
            }    
        }
    }
});

client.login(process.env.TOKEN);