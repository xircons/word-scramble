console.log('%c"นั่นแหนะ ไม่มีอะไรให้ดูหรอกโค้ดพี่ง่ายๆ"', 'color: red; font-weight: bold;');

const words = [
  { word: atob("amF2YXNjcmlwdA=="), hint: "A language used to make websites interactive." },
  { word: atob("aHRtbA=="), hint: "The code that builds the structure of a website." },
  { word: atob("Y3Nz"), hint: "The code that makes websites look cool." },
  { word: atob("c3Fs"), hint: "A language used to manage and get information from databases." },
  { word: atob("bm9kZQ=="), hint: "A tool that lets you run JavaScript on a server." },
  { word: atob("amF2YQ=="), hint: "A programming language used to create different kinds of software." },
  { word: atob("YXNzZW1ibHk="), hint: "A very basic programming language used close to the computer's hardware." },
  { word: atob("amF2YXN3aW5n"), hint: "A Java tool for creating simple windows and buttons in programs." },
  { word: atob("cHl0aG9u"), hint: "A popular programming language known for being simple and clear." },
  { word: atob("cGhw"), hint: "A language used to make websites that can work with databases." },
  { word: atob("cmVhY3Q="), hint: "A JavaScript library for building user interfaces." },
  { word: atob("Ym9vdHN0cmFw"), hint: "A tool that helps design websites quickly with ready-made styles." },
  { word: atob("Z2l0aHVi"), hint: "A website to store code online and work together with others." },
  { word: atob("anNvbg=="), hint: "A simple way to store and share data, looks like JavaScript objects." },
  { word: atob("eG1s"), hint: "A way to store data in a format that looks like HTML." }
];

const wordDisplay = document.querySelector(".scrambled-word");
const hintText = document.querySelector(".hint span");
const timeDisplay = document.querySelector(".timer span");
const timerElement = document.querySelector(".timer");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-btn");
const checkBtn = document.querySelector(".check-btn");
const solvedCount = document.querySelector(".solved-count");
const progressFill = document.querySelector(".progress-fill");
const toast = document.querySelector(".toast");

let correctWord, timer;
let correctAnswers = 0;
let usedWords = [];
let toastTimeout;

const startTimer = maxTime => {
  clearInterval(timer);
  timeDisplay.textContent = maxTime;
  timerElement.classList.remove("urgent");
  
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      timeDisplay.textContent = maxTime;
      
      if (maxTime <= 5) {
        timerElement.classList.add("urgent");
      }
    } else {
      clearInterval(timer);
      showToast(`หมดเวลาละน้องเอ้ย`);
      correctAnswers = 0;
      updateProgress();
      startGame();
    }
  }, 1000);
};

const showToast = message => {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add("show");
  
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

const shuffleWord = word => {
  let letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  
  const shuffled = letters.join("");
  return shuffled === word ? shuffleWord(word) : shuffled;
};

const getRandomWord = () => {
  if (usedWords.length === words.length) {
    usedWords = [];
  }
  
  let randomIndex;
  let randomObj;
  
  do {
    randomIndex = Math.floor(Math.random() * words.length);
    randomObj = words[randomIndex];
  } while (usedWords.includes(randomObj.word));
  
  usedWords.push(randomObj.word);
  return randomObj;
};

const updateProgress = () => {
  solvedCount.textContent = correctAnswers;
  const percentage = (correctAnswers / 10) * 100;
  progressFill.style.width = `${percentage}%`;
};

const startGame = () => {
  startTimer(15);
  
  const randomObj = getRandomWord();
  correctWord = randomObj.word.toLowerCase();
  
  const shuffled = shuffleWord(correctWord);
  wordDisplay.textContent = shuffled;
  hintText.textContent = randomObj.hint;
  
  inputField.value = "";
  inputField.focus();
};

const checkAnswer = () => {
  const userWord = inputField.value.toLowerCase().trim();

  if (!userWord) {
    showToast("ใส่คำก่อนดิค่อยกด submit ไอ่น้อง");
    return;
  }

  if (userWord === correctWord) {
    correctAnswers++;
    updateProgress();

    const remaining = 10 - correctAnswers;

    if (correctAnswers === 10) {
      const hiddenMsg = atob("bW9zdCBtYXRjaCBtdnAgdmFsb3JhbnQgZnJlc2htZW4gZ2FtZSAyMDI0");
      showToast(hiddenMsg);
      setTimeout(() => {
        correctAnswers = 0;
        updateProgress();
        startGame();
      }, 3000);
    } else {
      showToast(`ถูกละ! "${correctWord.toUpperCase()}" เหลืออีก ${remaining} คำถึงจะได้คำใบ้เพิ่มนะน้อง`);
      startGame();
    }
  } else {
    showToast(`ผิดนะน้อง "${userWord}" ยังไม่ถูก`);
    correctAnswers = 0;
    updateProgress();
  }
};

// Event listeners
refreshBtn.addEventListener("click", () => {
  clearInterval(timer);
  startGame();
});

checkBtn.addEventListener("click", checkAnswer);

inputField.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// Start the game
startGame();
