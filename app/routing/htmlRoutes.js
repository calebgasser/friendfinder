const path = require('path');

module.exports = (app)=>{
    app.get('/',(request,response)=>{
        response.sendFile(path.resolve(__dirname + '/../public/home.html'));
    });

    app.get('/survey', (request, response)=>{
        response.sendFile(path.resolve(__dirname + '/../public/survey.html'));
    })
}