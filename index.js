const mineflayer = require('mineflayer');
const http = require('http');

// 1. THIS KEEPS RENDER'S FREE TIER HAPPY
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running and keeping the server alive!\n');
});
server.listen(process.env.PORT || 3000, () => {
    console.log('Web server running to bypass free tier restrictions.');
});

// 2. YOUR MINECRAFT BOT SETTINGS
const botArgs = {
    host: 'kaiquest15.aternos.me', 
    port: 40729,                     
    username: 'KaiQuestAFK',     
    version: false                  
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log(`${bot.username} successfully joined the PaperMC server!`);
        
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
