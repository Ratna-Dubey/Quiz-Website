const questions = [
    {
        question: "What is the correct syntax to print 'Hello, World!' in the console?",
        answers: [
            {text: "console.print('Hello, World!');", correct: false},
            {text: "console.log('Hello, World!');", correct: true},
            {text: "print('Hello, World!');", correct: false},
            {text: "log.console('Hello, World!');", correct: false},
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "const", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        answers: [
            {text: "!-- This is a comment -->", correct: false},
            {text: "# This is a comment", correct: false},
            {text: "// This is a comment", correct: true},
            {text: "** This is a comment **", correct: false},
        ]
    },
    {
        question: "Which of the following is not a data type in JavaScript?",
        answers: [
            {text: "string", correct: false},
            {text: "number", correct: false},
            {text: "boolean", correct: false},
            {text: "character", correct: true},
        ]
    },
    {
        question: "What will typeof null return?",
        answers: [
            {text: "'null'", correct: false},
            {text: "'object'", correct: true},
            {text: "'undefined'", correct: false},
            {text: "'number'", correct: false},
        ]
    }
    
];

const questionElement= document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
} 

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton()
    }
    else{
        startQuiz();
    }
})

startQuiz();0