const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const twilio = require("twilio");


// Init app
const accountSid = 'accountSid'; 
const authToken = 'authToken'; 
const client = new twilio(accountSid, authToken); 

const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
  const { number, text } = req.body;

  client.messages 
      .create({ 
         body: number,  
         messagingServiceSid: 'MG0b532344f1aca1f5c02e047f17b88af3',      
         to: text 
       }) 
      .then(message => console.log(message.sid)) 
      .catch(err => console.log(err))
      .done();

 
});


app.listen(3001,()=>{
    console.log('My server port is '+3001);
})
