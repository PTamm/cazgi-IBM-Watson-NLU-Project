const express = require('express');
const dotenv = require('dotenv');
const app = new express();

dotenv.config()

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey = api_key,
        }),
        serviceurl = api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const nlu_url_em = getNLUInstance();
    return res.send(nlu_url_em.analyze(req.query.url));
});

app.get("/url/sentiment", (req,res) => {
    const nlu_url_se = getNLUInstance();
    return res.send(nlu_url_se.analyze(req.query.url));
});

app.get("/text/emotion", (req,res) => {
    const nlu_txt_em = getNLUInstance();
    return res.send(nlu_txt_em.analyze(req.query.text));
});

app.get("/text/sentiment", (req,res) => {
    const nlu_txt_se = getNLUInstance();
    return res.send(nlu_txt_se.analyze(req.query.text));
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

