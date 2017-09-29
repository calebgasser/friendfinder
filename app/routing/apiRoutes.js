const data = require('../data/friends');
const path = require('path');

module.exports = (app)=>{
    app.get('/api/friends', (request,response)=>{
        response.json(data);
    })
    app.post('/api/friends', (request,response)=>{
        data.push(request.body);
        let currentPerson = request.body;
        let bestMatch = {
            index: null,
            score: 100,
        }
        for(person in data){
            let score  = 0;
            if(data[person].name !== currentPerson.name && data[person] !== 'undefined'){
                for(let choice in data[person].questionAnswers){
                    score += Math.abs(currentPerson.questionAnswers[choice] - data[person].questionAnswers[choice]);
                }
    
                if(score <= bestMatch.score){
                    bestMatch.index = person;
                    bestMatch.score = score;
                }
            }
            
        }
        if(bestMatch.index !== null){
            response.json(data[bestMatch.index]);
        }
        
    })
}