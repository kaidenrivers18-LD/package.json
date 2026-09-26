const mineflayer = require('mineflayer');

const botArgs = {
    host: 'kaiquest15.aternos.me', 
    port: 40729,                     
    username: 'KaiQuestAFK',     
    version: false                  
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log(`${bot.username} joined the PaperMC server!`);
        
        // Jump every 2 minutes to avoid idle kick
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 120000);
    });

    bot.on('error', (err) => console.log(`Connection error: ${err.message}`));

    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 15 seconds...');
        setTimeout(createBot, 15000);
    });
}

createBot();
