document.addEventListener('DOMContentLoaded', function () {
  selectedCategory = localStorage.getItem("category") || null
  
  if (selectedCategory == null) {return} 
  
  selectedlevel = localStorage.getItem("level") || null
  if (selectedlevel == null) checkLevel(selectedCategory) 

  // if (selectedCategory) checkType(selectedLevel) 
})

function checkCategory() {
  const selected = document.querySelector('input[name="choice"]:checked');
  const type = document.getElementById("type").value

  if (!selected) {
    alert('Silakan pilih terlebih dahulu.');
    return false;
  }
  console.log("selected value", selected.value)
  console.log("type value", type)
  
  selectedCategory = localStorage.getItem("category") || null
  if (type == "base") { 
    localStorage.setItem("category", selected.value)
    checkLevel(selected.value)
  }
  
  selectedLevel = localStorage.getItem("level") || null
  if (type == 'level') {
    localStorage.setItem("level", selected.value)
    checkType(selected.value)
  }
  
  console.log("1234124 " + type + " teasdfst " + selectedCategory)
  selectedCategory = localStorage.getItem("category") || null
  if (type == 'bagian' || selectedCategory == "random") {
    // window.location.href = "./quiz.html"
    checkChoice()
  }
  
  if (type == "choice") {
    localStorage.setItem("choiceAmount", selected.value || 3)
    window.location.href = "./quiz.html"
  }
};

function checkLevel(category) {
  console.log("check level " + localStorage.getItem("category"))
  if (category == 'random') {
    checkChoice()
    return 
  };
  
  document.getElementById("subtitle").innerHTML = "module mana yang kamu pilih?"
  category = document.getElementById('chooseCategory')
  category.innerHTML = '';
  
  const inputType = document.createElement("input");
  inputType.type = "hidden";
  inputType.id = `type`;
  inputType.name = "type";
  inputType.value = "level";
  category.appendChild(inputType)
  
  const level = ['n4', 'n5'];
  level.forEach((kanji, index) => {
      const li = document.createElement("li");
      li.classList.add("relative", "peer");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = `level-${index + 1}`;
      input.name = "choice";
      input.value = kanji;
      input.classList.add("opacity-0", "absolute", "peer");

      const label = document.createElement("label");
      label.setAttribute("for", `level-${index + 1}`);
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
      category.appendChild(li);
  });
}

function checkType(level) {
  document.getElementById("subtitle").innerHTML = "Pilih level yang kamu inginkan!"
  category = document.getElementById('chooseCategory')
  category.innerHTML = '';
  
  const type = ['1', '2'];
  if (level == 'n4') type.push('3', '4')
  
  const inputType = document.createElement("input");
  inputType.type = "hidden";
  inputType.id = `type`;
  inputType.name = "type";
  inputType.value = "bagian";
  category.appendChild(inputType)

  type.forEach((kanji, index) => {
      const li = document.createElement("li");
      li.classList.add("relative", "peer");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = `type-${index + 1}`;
      input.name = "choice";
      input.value = kanji;
      input.classList.add("opacity-0", "absolute", "peer");

      const label = document.createElement("label");
      label.setAttribute("for", `type-${index + 1}`);
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
      category.appendChild(li);
  });
}

function checkChoice() {
  document.getElementById("subtitle").innerHTML = "Pilih jumlah pilihan jawaban yang kamu inginkan!"
  category = document.getElementById('chooseCategory')
  category.innerHTML = '';
  
  const inputChoice = document.createElement("input");
  inputChoice.type = "hidden";
  inputChoice.id = `type`;
  inputChoice.name = "type";
  inputChoice.value = "choice";
  category.appendChild(inputChoice)

  const type = [3, 4, 5, 6];
  type.forEach((number, index) => {
      const li = document.createElement("li");
      li.classList.add("relative", "peer");

      const input = document.createElement("input");
      input.type = "radio";
      input.id = `type-${index + 1}`;
      input.name = "choice";
      input.value = number;
      input.classList.add("opacity-0", "absolute", "peer");
      input.checked = number == 3;

      const label = document.createElement("label");
      label.setAttribute("for", `type-${index + 1}`);
      label.classList.add(
          "inline-flex", "items-center", "justify-between", "w-full", "py-3", "text-gray-500",
          "bg-transparent", "border", "border-blue-600", "rounded-lg", "cursor-pointer",
          "peer-checked:border-blue-600", "peer-checked:bg-blue-600", "peer-checked:text-white",
          "hover:text-gray-600", "hover:bg-blue-400"
      );

      const labelText = document.createElement("div");
      labelText.classList.add("w-full", "text-center", "text-lg", "font-semibold");
      labelText.textContent = number + " Pilihan"; // Menampilkan kanji sebagai pilihan

      label.appendChild(labelText);
      li.appendChild(input);
      li.appendChild(label);
      category.appendChild(li);
  });
}