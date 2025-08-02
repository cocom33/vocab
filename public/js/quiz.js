totalQuizUi = document.getElementById('totalQuiz')
currentQuizUi = document.getElementById('currentQuiz')
question = document.getElementById('question')
romanji = document.getElementById('romanji')
inputSelect = document.getElementById('inputSelect')
inputText = document.getElementById('inputText')
buttonChangeAnswer = document.getElementById('buttonChangeAnswer')
buttonChangeQuestion = document.getElementById('buttonChangeQuestion')
submitButton = document.getElementById('submitButton')

typeQuestion = localStorage.getItem('typeQuestion');
typeAnswer = localStorage.getItem('typeAnswer');
getQuiz = localStorage.getItem('allCurrentQuiz');
getHistoryQuiz = localStorage.getItem('getHistoryQuiz');
currentQuiz = parseInt(localStorage.getItem('currentQuiz')) || 0;
correctQuiz = parseInt(localStorage.getItem('correctQuiz')) || 0;
inCorrectQuiz = parseInt(localStorage.getItem('inCorrectQuiz')) || 0;

thisHistory = []
totalQuiz = 1
quiz = []
historyAnswer = []
choice = []

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // get data kanji dan data local 
    if (getQuiz == null) {
      const resQuiz = await listKanji();
      getQuiz = JSON.stringify(shuffleQuiz(resQuiz))
      localStorage.setItem('allCurrentQuiz', getQuiz);
    }
    if (typeQuestion == null) {
      localStorage.setItem('typeQuestion', 'kanji');
      typeQuestion = 'kanji'
    }
    if (typeAnswer == null) localStorage.setItem('typeAnswer', 'select');
    if (currentQuiz == 0) localStorage.setItem('currentQuiz', 0);
    if (correctQuiz == 0) localStorage.setItem('correctQuiz', 0);
    if (inCorrectQuiz == 0) localStorage.setItem('inCorrectQuiz', 0);
    if (getHistoryQuiz == null) localStorage.setItem('getHistoryQuiz', null);
    
    typeAnswer == 'select' ? inputSelect.classList.remove("hidden") : inputText.classList.remove("hidden")
    
    // set quiz
    quiz = JSON.parse(getQuiz)
    totalQuizUi.innerHTML = quiz.length
    currentQuizUi.innerHTML = parseInt(currentQuiz)+1
    totalQuiz = quiz.length
    question.innerHTML = typeQuestion == 'kanji' ? quiz[currentQuiz]["kanji"] : quiz[currentQuiz]["id"]
    romanji.innerHTML = quiz[currentQuiz]["jp"]
    choice = getRandomKanji(quiz, currentQuiz, typeQuestion == "id" ? "kanji" : "id")
    
    // set function 
    generateKanjiChoices(choice)
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
  let getLocalTypeQuestion = localStorage.getItem('typeQuestion') || 'kanji';
  typeQuestion = getLocalTypeQuestion === 'kanji' ? 'id' : 'kanji';
  localStorage.setItem('typeQuestion', typeQuestion);
  question.innerHTML = typeQuestion == 'kanji' ? quiz[currentQuiz -1]["kanji"] : quiz[currentQuiz -1]["id"]
  choice = getRandomKanji(quiz, currentQuiz, typeQuestion == "id" ? "kanji" : "id")
  generateKanjiChoices(choice)
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
  valid = checkAnswer(currentQuiz)  
  if (!valid) return 
  
  if (currentQuiz+1 < totalQuiz) {
    currentQuiz++
    
    currentQuizUi.innerHTML = currentQuiz+1
    localStorage.setItem('currentQuiz', currentQuiz)
    question.innerHTML = typeQuestion == 'kanji' ? quiz[currentQuiz]["kanji"] : quiz[currentQuiz]["id"]
    romanji.innerHTML = quiz[currentQuiz]["jp"]
    choice = getRandomKanji(quiz, currentQuiz, typeQuestion == "id" ? "kanji" : "id")
    generateKanjiChoices(choice)
  } else {
    alert('Selamat, Anda telah menyelesaikan quiz!')

    thisHistory = getHistoryQuiz == "" ? JSON.parse(getHistoryQuiz) : []
    thisHistory.push({
      correct: correctQuiz,
      inCorrect: inCorrectQuiz,
      totalQuiz: quiz.length,
      date: new Date().toLocaleDateString("id"),
    })
    localStorage.setItem('getHistoryQuiz', JSON.stringify(thisHistory))
    console.log(thisHistory)
    clearAll()
    window.location.href = "./quiz_finish.html";
  }
}

function checkAnswer(currentQuiz) {
  // const activeRadioGroup = document.getElementById('inputSelect');
  const activeTextInput = document.getElementById('inputJawaban');
  let valid = false;
  let input = ""

  // Jika radio aktif (tidak hidden)
  if (!inputSelect.classList.contains('hidden')) {
    const selected = document.querySelector('input[name="choice"]:checked');
    valid = selected; // true jika ada yg dipilih
    if (valid) input = selected.value;
  }

  // Jika input text aktif (tidak hidden)
  if (!inputText.classList.contains('hidden')) {
    const inputVal = activeTextInput.value.trim();
    valid = inputVal !== '';
    input = inputVal;
  }

  if (!valid) {
    alert('Silakan pilih atau isi jawaban terlebih dahulu.');
    return false;
  }
  
  const answerKey = typeQuestion === "kanji" ? "id" : "kanji";
  if (quiz[currentQuiz][answerKey] === input) {
    correctQuiz++;
    localStorage.setItem('correctQuiz', correctQuiz);
  } else {
    inCorrectQuiz++;
    localStorage.setItem('inCorrectQuiz', inCorrectQuiz);
  }
  return true
};

function getRandomKanji(quizzes, currentQuiz, type) {
  // Pilih 1 data berdasarkan index tertentu
  const fixedKanji = quizzes[currentQuiz][type]; // Index yang ingin dipilih

  // Pilih dua data secara acak, pastikan tidak memilih yang sama dengan fixedKanji
  const randomKanji = [];
  const availableData = quizzes.filter((item, index) => index !== currentQuiz); // Hapus item yang sudah dipilih

  // Ambil dua data acak dari availableData
  while (randomKanji.length < 2) {
    const randomIndex = Math.floor(Math.random() * availableData.length);
    randomKanji.push(availableData[randomIndex][type]);
    availableData.splice(randomIndex, 1); // Hapus item yang sudah dipilih
  }

  // Gabungkan fixedKanji dan randomKanji
  return shuffleQuiz([fixedKanji, ...randomKanji]);
}

function generateKanjiChoices(selectedKanji) {
  inputSelect.innerHTML = ""; // Bersihkan pilihan sebelumnya

  // Tambahkan pilihan ke dalam daftar
  selectedKanji.forEach((kanji, index) => {
      const li = document.createElement("li");
      li.classList.add("relative", "peer");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = `kelas-${index + 1}`;
      input.name = "choice";
      input.value = kanji;
      input.classList.add("opacity-0", "absolute", "peer");

      const label = document.createElement("label");
      label.setAttribute("for", `kelas-${index + 1}`);
      label.classList.add(
          "inline-flex", "items-center", "justify-between", "w-full", "py-3", "text-gray-500",
          "bg-transparent", "border", "border-blue-600", "rounded-lg", "cursor-pointer",
          "peer-checked:border-blue-600", "peer-checked:bg-blue-600", "peer-checked:text-white",
          "hover:text-gray-600", "hover:bg-blue-400"
      );

      const labelText = document.createElement("div");
      labelText.classList.add("w-full", "text-center", "text-lg", "font-semibold");
      labelText.textContent = kanji; // Menampilkan kanji sebagai pilihan

      label.appendChild(labelText);
      li.appendChild(input);
      li.appendChild(label);
      inputSelect.appendChild(li);
  });
}

function shuffleQuiz(quiz) {
  let currentIndex = quiz.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [quiz[currentIndex], quiz[randomIndex]] = [
      quiz[randomIndex], quiz[currentIndex]];
  }

  return quiz;
}

function clearAll() {
  localStorage.removeItem('allCurrentQuiz');
  localStorage.removeItem('currentQuiz');
}