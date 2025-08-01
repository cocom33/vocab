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
choice = []

document.addEventListener('DOMContentLoaded', async function () {
    try {
        // get data kanji dan data local 
        const data = await listKanji();
        console.log('input text ', typeQuestion,  typeQuestion)
        if (typeQuestion == null) {
          localStorage.setItem('typeQuestion', 'kanji');
          typeQuestion = 'kanji'
        }
        if (typeAnswer == null) {
          localStorage.setItem('typeAnswer', 'select');
        }
        typeAnswer == 'select' ? inputSelect.classList.remove("hidden") : inputText.classList.remove("hidden")
        
        // set quiz
        quiz = data
        totalQuizUi.innerHTML = data.length
        totalQuiz = data.length
        question.innerHTML = typeQuestion == 'kanji' ? quiz[currentQuiz -1]["kanji"] : quiz[currentQuiz -1]["id"]
        choice = getRandomKanji(quiz, currentQuiz, typeQuestion == "id" ? "kanji" : "id")
        console.log(choice)
        
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
  console.log(choice)
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
    question.innerHTML = typeQuestion == 'kanji' ? quiz[currentQuiz -1]["kanji"] : quiz[currentQuiz -1]["id"]
    choice = getRandomKanji(quiz, currentQuiz, typeQuestion == "id" ? "kanji" : "id")
    generateKanjiChoices(choice)
  } else {
    alert('Selamat, Anda telah menyelesaikan quiz!')
    window.location.href = "./quiz_finish.html";
  }
}

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
  return [fixedKanji, ...randomKanji];
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