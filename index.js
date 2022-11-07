const sleep = ms => new Promise(r => setTimeout(r, ms));
const express = require('express');
const path = require('path');
var busboy = require('connect-busboy')
const { port } = require('./config.json');
var fs = require('fs');
const qr = require('qrcode');
const fp = require('find-free-port');
const { json, response } = require('express');
const extend = require('util')._extend;

const app = express();

app.use(busboy(), express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    return response.sendFile('index.html', { root: '.' });
});

app.get('/getFile', (req, res) => {
    switch (req.query.format) {
        case "pdf":
            return res.sendFile('./public/images/pdftemp.png', { root: '.' });
        case "mp4":
            return res.sendFile('./public/images/mp4temp.png', { root: '.' });
    }
    var d = new Date();
    res.setHeader('Content-Type', 'image/png');
    var folderDate = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;
    return res.sendFile(`./files/${folderDate}/${req.query.name}.${req.query.format}`, { root: '.' })
})

app.get('/getUploads', (req, res) => {
    return res.sendFile('./log/uploadlog.json', { root: '.' });
})

app.get('/qr', (req, res) => {
    const reqUrl = req.headers.host;
    qr.toFile("./public/images/qr.png", `${reqUrl}/upload`).then(() => {
        return res.sendFile("./public/images/qr.png", { root: '.' });
    });
})

app.get('/upload', (req, res) => {
    return res.sendFile('upload.html', { root: '.' })
})

app.get('/dashboard', (req, res) => {
    return res.sendFile('dashboard.html', { root: '.' })
})

app.get('/getUpLog', (req, res) => {
    return res.send(uploadLogGet());
});

app.post('/uploadfile', async (req, res) => {
    d = new Date();
    var folderDate = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`;
    var fstream;
    var upTime = `${d.getHours() + 1}.${d.getMinutes() + 1}.${d.getSeconds() + 1}`;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("\n-----------------\nUploading: " + req.headers["format"]);
        if (req.headers["format"] == "") {
            console.log("\nError\n-----------------")
            return;
        }
        if (!fs.existsSync(__dirname + `/files/${folderDate}/`)) {
            fs.mkdirSync(__dirname + `/files/${folderDate}/`);
        }
        var name = randomName(32);
        fstream = fs.createWriteStream(`${__dirname}/files/${folderDate}/` + name + '.' + req.headers["format"]);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.sendStatus(200);
            uploadLogNew(name, folderDate.replace(/_/g, "."), upTime, req.headers["format"]);
            console.log("\nDone\n-----------------");
        });
    });
});

function randomName(length) {
    var name = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numbers = '1234567890'
    var lowCharacteres = characters.toLowerCase();
    characters += lowCharacteres + numbers;
    var charactersLength = characters.length;
    for (i = 0; i < length; i++) {
        name += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return name;
}

function uploadLogNew(name, date, upTime, format) {
    var fileLog = fs.readFileSync('./log/uploadlog.json');
    var jsonLog = JSON.parse(fileLog);
    var newNum = Object.keys(jsonLog).length;

    var upLog = JSON.parse(`{"${newNum}": {"name": "${name}" ,"date": "${date}", "time": "${upTime}", "format": "${format}"}}`);
    jsonLog = extend(jsonLog, upLog);
    fs.writeFile("./log/uploadlog.json", JSON.stringify(jsonLog), (err) => {
        if(err){
            console.error(err);
        }
    });
}

function uploadLogGet() {
    var fileLog = fs.readFileSync('./log/uploadlog.json');
    var jsonLog = JSON.parse(fileLog);
    var jsonLogLength = Object.keys(jsonLog).length;

    var files = {
        "name": "",
        "format": ""
    };

    for (let i = 0; i < jsonLogLength; i++) {
        if (!timeCheck(jsonLog[i].date, jsonLog[i].time)) continue;
        files.name = jsonLog[i].name;
        files.format = jsonLog[i].format;
    }
    return files;
}

function timeCheck(date, upTime) {
    var d = new Date();

    date = date.split(".");

    var yearOld = date[0];
    var monthOld = date[1];
    var dayOld = date[2];

    var yearNew = d.getFullYear();
    var monthNew = d.getMonth() + 1;
    var dayNew = d.getDate();

    if (dayNew != dayOld && monthNew != monthOld && yearNew != yearOld) return false;

    var upTime = upTime.split(".");

    var hoursOld = upTime[0];
    var minutesOld = upTime[1];
    var secondsOld = upTime[2];

    var hoursNew = d.getHours() + 1;
    var minutesNew = d.getMinutes() + 1;
    var secondsNew = d.getSeconds() + 1;
    if (hoursOld < hoursNew) {
        return false;
    } else if (minutesNew - minutesOld > 1) {
        return false;
    } else if (Math.abs(((minutesNew - minutesOld) * 60) - (Math.abs(secondsNew - secondsOld))) > 30) {
        return false;
    }

    return true;
}

fp(3000).then(([freePort]) => {
    app.listen(freePort, () => console.log(`App listening at http://localhost:${freePort}`));
}).catch((err) => {
    if (err) {
        console.error(err);
    }
})