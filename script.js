$(function(){
    const easyLevel = [
        { word: "animal", translation: "тварина" },
        { word: "travel", translation: "подорож" },
        { word: "walking", translation: "ходьба" },
        { word: "family", translation: "родина" },
        { word: "pencil", translation: "олівець" },
        { word: "picture", translation: "картина" },
        { word: "bag", translation: "сумка" },
        { word: "ticket", translation: "квиток" },
        { word: "elevator", translation: "ліфт" },
        { word: "sweater", translation: "светр" },
        { word: "camera", translation: "камера" },
        { word: "airport", translation: "аеропорт" },
        { word: "tea", translation: "чай" },
        { word: "usually", translation: "зазвичай" },
        { word: "room", translation: "кімната" }
    ];

    const mediumLevel = [
        { word: "challenge", translation: "виклик" },
        { word: "experience", translation: "досвід" },
        { word: "intermediate", translation: "проміжний" },
        { word: "basic", translation: "основний" },
        { word: "patient", translation: "терплячий" },
        { word: "brave", translation: "хоробрий" },
        { word: "development", translation: "розвиток" },
        { word: "success", translation: "успіх" },
        { word: "society", translation: "суспільство" },
        { word: "meadow", translation: "луг" },
        { word: "charity", translation: "благодійність" },
        { word: "employee", translation: "працівник" },
        { word: "dedication", translation: "відданість" },
        { word: "celebrate", translation: "святкувати" },
        { word: "accurate", translation: "точний" }
    ];

    const hardLevel = [
        { word: "neglect", translation: "неуважність" },
        { word: "acknowledge", translation: "підтвердити" },
        { word: "inevitable", translation: "неминучий" },
        { word: "convoluted", translation: "заплутаний" },
        { word: "ineffable", translation: "невимовний" },
        { word: "ubiquitous", translation: "всюдисущий" },
        { word: "exemplary", translation: "зразковий" },
        { word: "eloquent", translation: "красномовний" },
        { word: "diligent", translation: "старанний" },
        { word: "substantiate", translation: "обґрунтовувати" },
        { word: "scrutinize", translation: "аналізувати" },
        { word: "comprehend", translation: "осягнути" },
        { word: "outcome", translation: "результат" },
        { word: "appeal", translation: "оскарження" },
        { word: "veracity", translation: "правдивість" }
    ];
    
    let step = 1;
    let correct = 0;
    let incorrect = 0;
    let currentLevel = easyLevel;

    $("#difficultySelect").change(function(){
        let level = $("#difficultySelect").val();
        switch(level) {
            case 'easy': currentLevel = easyLevel; break;
            case 'medium': currentLevel = mediumLevel; break;
            case 'hard': currentLevel = hardLevel; break;
        }
        resetGame();
    }) 
    
    function showWord(array){
        let word = array[Math.floor(Math.random() * array.length)];
        $("#word").text(word.word);
    }

    function updateStep(){
        if(step <= 10)
            $("#step").text(step);
    }

    function resetGame(){
        step = 1;
        correct = 0;
        incorrect = 0;
        $("#step").text(step);
        $("#correct").text("0");
        $("#incorrect").text("0");
        showWord(currentLevel)
    } 

    showWord(currentLevel);
    $("#word").click(function(){
        let userTranslation = $("#translationInput").val().trim().toLowerCase();
        let currentWord = currentLevel.find(word => word.word == $("#word").text());       
        if(userTranslation == currentWord.translation){
            correct++;
            $("#correct").text(correct);
        }
        else {
            incorrect++;
            $("#incorrect").text(incorrect);
        }
        step++;
        updateStep();
        $("#translationInput").val("");
        if (step <= 10)
            showWord(currentLevel);
        if((correct + incorrect) == 10) {
            setTimeout(function(){
                alert(`Ваш рівень знань мови: ${correct*10}%`);
                resetGame();
                showWord(currentLevel);
            }, 30);
        }
        if(correct + incorrect != 10 && step == 11){
            setTimeout(function(){
                alert("Надайте відповідь на 10 запитань!");
                step--;
                updateStep();
                showWord(currentLevel);
            }, 30);
        }
    });

    $("#prevStep").click(function(){
        if (step > 1) {
            step--;
            updateStep();
            showWord(currentLevel);
        }
    });
    
    $("#nextStep").click(function(){
        if (step < 10) {
            step++;
            updateStep();
            showWord(currentLevel);
        }
    });
});
