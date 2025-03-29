// JS Quiz

const questions = [
    {
        question: "Who is the longest serving Arsenal FC manager?",
        answer: [
            {text: 'Arsene Wenger', correct: true},
            {text: 'Mikel Arteta', correct: false},
            {text: 'George Graham', correct: false},
            {text: 'Unai Emery', correct: false},
        ]
    },

    {
        question: 'Who is current Arsenal FC manager?',
        answer: [
            {text: 'Arsene Wenger', correct: false},
            {text: 'Mikel Arteta', correct: true},
            {text: 'George Graham', correct: false},
            {text: 'Unai Emery', correct: false},
        ]
    },

    {
        question: 'Who is leading goalscorer of all-time in Arsenal FC?',
        answer: [
            {text: 'Ian Wright', correct: false},
            {text: 'Robert Pires', correct: false},
            {text: 'Thierry Henry', correct: true},
            {text: 'Dennis Bergkamp', correct: false},
        ]
    },

    {
        question: 'Who is the ex Russian player in Arsenal?',
        answer: [
            {text: 'Andrey Arshavin', correct: true},
            {text: 'Mikel Arteta', correct: false},
            {text: 'Thomas Partey', correct: false},
            {text: 'Igor Stepanovs', correct: false},
        ]
    },

    {
        question: 'Who is the best goalkeeper of Arsenal in Premier League Era?',
        answer: [
            {text: 'David Seaman', correct: true},
            {text: 'Wojciech Szczesny', correct: false},
            {text: 'David Raya', correct: false},
            {text: 'Manuel Almunia', correct: false},
        ]
    }


]

const question = document.getElementById('question')
const answerBtns = document.getElementById('answer-buttons') 
const nextBtn = document.getElementById('nextBtn')
const DarkBtn = document.getElementById('DarkBtn')
const LightBtn = document.getElementById('LightBtn')
const PicBtn = document.getElementById('PicBtn')
const QBox = document.getElementById('QBox')



let currentQI = 0
let score = 0

function startQuiz(){
    currentQI = 0
    score = 0
    nextBtn.innerHTML = 'Next'
    showQuestion()
}

function showQuestion(){
    resetScreen()
    let currentQuestion = questions[currentQI]
    let questionNo = currentQI + 1
    question.innerHTML = questionNo + '. ' + currentQuestion.question

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerBtns.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })

    // To apply dark mode again when next question appears, if dark mode is selected
    if(document.body.classList.contains('dark-mode')){
        const buttons = document.querySelectorAll('.btn')
        buttons.forEach(button =>{
            button.classList.add('btnDark')
        })
    }
}

function resetScreen(){
    
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++
    }
    else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextBtn.style.display = "block"
}

function showScore(){
    resetScreen()
    if(score == 5){
        question.innerHTML = `You have scored ${score} out of ${questions.length}! You are a real winner! Arsene Wenger would be proud! <img src='AW.jpg'>`
    }
    else if(score >=3 && score < 5){
        question.innerHTML = `You have scored ${score} out of ${questions.length}! You must train harder! <img src='PV.jpg'>`
    }
    else{
        question.innerHTML = `You have scored ${score} out of ${questions.length}! Have you ever watched a single Arsenal game?! <img src='PV.jpg'>`
    }
    nextBtn.innerHTML = 'Play Again'
    nextBtn.style.display = 'block'
}

function handleNextBtn(){
    currentQI++
    if(currentQI < questions.length){
        showQuestion()
    }
    else{
        showScore()
    }
}

nextBtn.addEventListener('click', () =>{
    if(currentQI < questions.length){
        handleNextBtn()
    }
    else{
        startQuiz()
    }
})

startQuiz()

function switchToDark(event){
    document.body.style.backgroundColor = 'black'
    document.body.style.backgroundImage = 'none'
    QBox.classList.remove('app')
    QBox.classList.add('appDark')

    // Add dark mode styles to body for tracking the dark mode
    document.body.classList.add('dark-mode')

    const buttons = document.querySelectorAll('.btn')
    buttons.forEach(button =>{
        button.classList.add('btnDark')
    })

    const BGbuttons = document.querySelectorAll('.btnBG')
    BGbuttons.forEach(BGbutton => {
        BGbutton.classList.add('btnBGDark')
    })

}

function switchToLight(event){
    document.body.style.backgroundColor = 'rgb(168, 168, 111)'
    document.body.style.backgroundImage = 'none'
    QBox.classList.remove('appDark')
    QBox.classList.add('app')

    document.body.classList.remove('dark-mode')


    const buttons = document.querySelectorAll('.btn')
    buttons.forEach(button => {
        button.classList.remove('btnDark')
    })

    const BGbuttons = document.querySelectorAll('.btnBG')
    BGbuttons.forEach(BGbutton => {
        BGbutton.classList.remove('btnBGDark')
    })
}

function insertPic(event){
    document.body.style.backgroundImage = 'url(image.jpg)'
    QBox.classList.remove('appDark')
    QBox.classList.add('app')

    document.body.classList.remove('dark-mode')

    const buttons = document.querySelectorAll('.btn')
    buttons.forEach(button => {
        button.classList.remove('btnDark')
    })

    const BGbuttons = document.querySelectorAll('.btnBG')
    BGbuttons.forEach(BGbutton => {
        BGbutton.classList.remove('btnBGDark')
    })
}

DarkBtn.addEventListener('click', switchToDark )
LightBtn.addEventListener('click', switchToLight)
PicBtn.addEventListener('click', insertPic)