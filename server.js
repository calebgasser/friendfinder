const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const settings = require('./settings');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/app/public')));

require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.listen(settings.port,()=>{
    console.log(`Listening on ${settings.port}`);
});

