const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
    
const WebSocket = require('ws');
const server = require('http').createServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/dist/gaugeApp')));

const wss = new WebSocket.Server({ server: server });

var headingI = 0;

wss.on('connection', (ws) => {
    var id = setInterval(() => {
        // Send radian values
        ws.send(JSON.stringify({'roll': (30 * Math.sin(headingI / 50))*Math.PI/180, 'pitch': (20 * Math.sin(headingI / 150))*Math.PI/180, 'yaw': (Math.sin(headingI / 500) * 360)*Math.PI/180}), (err, res) => {
            // errors then ignore for now
        })
        headingI++;
    }, 100);
    ws.on('close', () => {
        clearInterval(id);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/index.html');
});

server.on('request', app);

server.listen(8080, function() {
    console.log('Listening on http://localhost:8080');
})