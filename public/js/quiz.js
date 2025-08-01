totalQuizUi = document.getElementById('totalQuiz')
currentQuizUi = document.getElementById('currentQuiz')
question = document.getElementById('question')
inputSelect = document.getElementById('inputSelect')
inputText = document.getElementById('inputText')
buttonChangeAnswer = document.getElementById('buttonChangeAnswer')
buttonChangeQuestion = document.getElementById('buttonChangeQuestion')
submitButton = document.getElementById('submitButton')

typeQuestion = localStorage.getItem('typeQuestion');
typeAnswer = localStorage.getItem('typeAnswer');

currentQuiz = 1
totalQuiz = 1
correctQuiz = 0
inCorrectQuiz = 0
quiz = []
historyAnswer = []

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // get data kanji dan data local 
        const data = await listKanji();
        console.log('input text ', typeQuestion,  typeQuestion)
        if (typeQuestion == null) {
          localStorage.setItem('typeQuestion', 'jp');
          typeQuestion = 'jp'
        }
        if (typeAnswer == null) {
          localStorage.setItem('typeAnswer', 'select');
        }
        typeAnswer == 'select' ? inputSelect.classList.remove("hidden") : inputText.classList.remove("hidden")
        
        // set quiz
        quiz = data
        totalQuizUi.innerHTML = data.length
        totalQuiz = data.length
        question.innerHTML = typeQuestion == 'jp' ? quiz[currentQuiz -1]["jp"] : quiz[currentQuiz -1]["id"]
        
        // set function 
        buttonChangeQuestion.addEventListener('click', changeQuestion);
        buttonChangeAnswer.addEventListener('click', changeAnswer);
        submitButton.addEventListener('click', storeAnswer)
    } catch (error) {
        console.error('Error mengambil data:', error);
    }
});

async function listKanji() {
  const response = await fetch('https://api.npoint.io/2c0663b10b48a8698e29');
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

function changeQuestion() {
  let getLocalTypeQuestion = localStorage.getItem('typeQuestion') || 'jp';
  typeQuestion = getLocalTypeQuestion === 'jp' ? 'id' : 'jp';
  localStorage.setItem('typeQuestion', typeQuestion);
  question.innerHTML = typeQuestion == 'jp' ? quiz[currentQuiz -1]["jp"] : quiz[currentQuiz -1]["id"]
}

function changeAnswer() {
  let getLocalTypeAnswer = localStorage.getItem('typeAnswer') || 'select';
  typeAnswer = getLocalTypeAnswer === 'select' ? 'text' : 'select';
  localStorage.setItem('typeAnswer', typeAnswer);
  
  if (typeAnswer == "text") {
    inputSelect.classList.add("hidden")
    inputText.classList.remove("hidden")

    console.log('input text ', inputSelect)
  } else {
    inputSelect.classList.remove("hidden")
    inputText.classList.add("hidden")

    console.log('input select ', inputText)
  }
}

function storeAnswer() {
  if (currentQuiz < totalQuiz) {
    currentQuiz++
    console.log(currentQuiz)
    currentQuizUi.innerHTML = currentQuiz
  } else {
  }
}