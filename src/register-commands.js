require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, time} = require('discord.js');

const commands = [
    {
        name: 'delete',
        description: 'auto delete messages from a specific user',
        options: [
            {
                name: 'user',
                description: 'the user to delete messages from',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'msg-count',
                description: 'the number of messages to delete',
                type: ApplicationCommandOptionType.Integer,
                required: true
            }
        ]
    },
    {
        name: 'clear',
        description: 'clears specied number of messages',
        options: [
            {
                name: 'msg-count',
                description: 'the number of messages to delete',
                type: ApplicationCommandOptionType.Integer,
                required: true
            }
        ]
    },
    {
        name: 'erm',
        description: 'what the sigma'
    }
];


const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
(async () => {

    try {
        console.log(`\u001B[93mReloading (/) commands.\u001b[0m`); 
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log(`\u001B[93mReloaded (/) commands.\u001b[0m`); 
    } catch (error) {
        console.error(error);
    }
})();