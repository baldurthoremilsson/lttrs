$(function() {
    var scorecount = 0,
        WRONGDELTA = -1,
        RIGHTDELTA = 5,
        currentChar = '',
        guessChar = '',
        state = "animation";
    
    var msg = $('.msg'),
        scores = $('.scores'),
        letter = $('.letter'),
        answerfield = $('#answerfield');
        
    var CHARACTERS = [
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y',
        'Z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8',
        '9',
    ];
    
    var go = function(callback) {
        msg.text('ready');
        setTimeout(function() {
            msg.text('set');
        }, 1000);
        setTimeout(function() {
            msg.text('GO!');
            callback.call(this);
        }, 2000);
    }
    
    var updateScore = function(delta) {
        scorecount += delta;
        if(scorecount == 0) {
            scores.css({color: 'black'});
        }
        else if(scorecount > 0) {
            scores.css({color: 'green'});
        }
        else {
            scores.css({color: 'red'});
        }
        scores.text(scorecount);
    }
    
    var getRandomCharacter = function() {
        var i = Math.floor(Math.random() * CHARACTERS.length);
        return CHARACTERS[i];
    }
    
    var nextRound = function() {
        answerfield.val('').attr('disabled', true);
        go(function() {
            currentChar = getRandomCharacter();
            letter.text(currentChar);
            var height = letter.height;
            letter.animate({bottom: 0}, 2500, 'linear', function() {
                letter.css({bottom: ''});
                msg.text('guess');
                state = 'guess';
                answerfield.attr('disabled', false);
                answerfield.focus();
            });
        });
    }
    
    answerfield.keydown(function(event) {
        if(state != 'guess')
            return;
        
        var guess = event.which;
        if(guess >= 48 && guess <=57 || guess >= 65 && guess <= 90) {
            guessChar = String.fromCharCode(guess);
            $(this).val(guessChar);
            if(guessChar === currentChar) {
                msg.text('correct');
                updateScore(RIGHTDELTA);
            }
            else {
                msg.text('wrong');
                updateScore(WRONGDELTA);
            }
            setTimeout(nextRound, 1000);
        }
        return false;
    });
    
    nextRound();
});
