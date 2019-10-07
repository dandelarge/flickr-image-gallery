const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3300;
const publicFolder = path.join(__dirname, 'public');

const clientId = 'cy0CoCeF-oY1wg';
const clientSecret = 'f_3DfBCKhXQtLEnDN6yiVd7it6I';
const state = Math.round(Math.random() *100000);
const redirectUri = 'http://127.0.0.1:3300/gallery'


app.set('view engine', 'pug');
app.set('views', './server/templates');

app.get('/', introPage);
app.get('/gallery', (req, res) => {
    console.log(req.query);
    if(req.query.error) {
        console.log(req.query.error);
        res.send(req.query.error);
    }
    getToken(req.query.code).then(
        token => {
            res.render('gallery', {data: token});
        },
        err => {
            console.log(err);
            res.send(err);
        }
    );

    

});

app.listen(port);


function introPage (req, res) {
    const params = `?client_id=${clientId}&response_type=code&state=${state}&duration=temporary&redirect_uri=${encodeURI(redirectUri)}&scope=identity`;
    const url = 'https://www.reddit.com/api/v1/authorize' + params;
    const title = 'Hello there!'
    
    res.render('index', {title, url});
}

function getToken(code) {
    console.log(code);
    return axios({
        method: 'POST',
        url: 'https://www.reddit.com/api/v1/access_token', 
        data: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
        auth: {
            username: clientId,
            password: clientSecret
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.data.access_token)
    .catch(error => console.log(error));
}