$(()=>{
    $.ajaxSetup({traditional: true});
    let currentQuestionIndex = null;
    let currentQuestionDropdown = null;
    let user = {
        name: null,
        photoURL: null,
        questionAnswers: []
    }
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    })
    $(".dropdown-toggle").on('click', function(e){
        currentQuestionIndex = $(this).data('value');
        currentQuestionDropdown = $(this);
    });
    $(".dropdown a").on('click',function(e){
        let choice = $(this).data('value');
        user.questionAnswers[currentQuestionIndex] = choice;
        currentQuestionDropdown.text($(this).data('value'));
    })
    $("#submit").on('click', function(e){
        if($('#name').val() && $("#photoURL").val()){
            user.name = $('#name').val();
            user.photoURL = $('#photoURL').val();
        }
        validateChoices(user,(isValid)=>{
            if(isValid){
                $.post('/api/friends', user, (data)=>{
                    if(data){
                        $(".modal-title").text(data.name);
                        $(".modal-image").attr('src', data.photoURL);
                        $("#myModal").modal('show');
                    } else {
                        $(".modal-title").text("No match found!");
                        $(".modal-image").attr('src', "https://d30y9cdsu7xlg0.cloudfront.net/png/116456-200.png");
                        $("#myModal").modal('show');
                    }
                });
            } else{
                alert("All fields required.");
            }
        });
    })
})

function validateChoices(currentUser, callback){
    let isValid = true;
    for(let choice = 0; choice < currentUser.questionAnswers.length; choice++){
        if(typeof currentUser.questionAnswers[choice] === 'undefined' ||
        currentUser.questionAnswers[choice] < 0 ||
        currentUser.questionAnswers[choice] > 5 ||
        currentUser.questionAnswers.length < 10 ||
        currentUser.name === null ||
        currentUser.photoURL === null){
            isValid = false;
        }
    }
    callback(isValid);
}