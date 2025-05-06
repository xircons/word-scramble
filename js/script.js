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
  const inputField = document.querySelector("input");
  const refreshBtn = document.querySelector(".refresh-btn");
  const checkBtn = document.querySelector(".check-btn");
  
  let correctWord, timer;
  let correctAnswers = 0;
  
  const startTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (maxTime > 0) {
        maxTime--;
        timeDisplay.textContent = maxTime;
      } else {
        clearInterval(timer);
        showMessage(`หมดเวลาละน้องเอ้ย`);
        startGame();
      }
    }, 1000);
  };
  
  const showMessage = message => {
    alert(message);
  };
  
  const shuffleWord = word => {
    let letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("");
  };
  
  const startGame = () => {
    startTimer(30);
    
    const randomObj = words[Math.floor(Math.random() * words.length)];
    correctWord = randomObj.word.toLowerCase();
    
    let shuffled = shuffleWord(correctWord);
    
    while (shuffled === correctWord) {
      shuffled = shuffleWord(correctWord);
    }
    
    wordDisplay.textContent = shuffled;
    hintText.textContent = randomObj.hint;
    
    inputField.value = "";
    inputField.focus();
  };
  
  const checkAnswer = () => {
    const userWord = inputField.value.toLowerCase().trim();
  
    if (!userWord) {
      showMessage("ใส่คำก่อนดิค่อยกด submit ไอ่น้อง");
      return;
    }
  
    if (userWord === correctWord) {
      correctAnswers++;
  
      const remaining = 7 - correctAnswers;
  
      if (correctAnswers === 7) {
        const hiddenMsg = atob("bW9zdCBtYXRjaCBtdnAgdmFsb3JhbnQgZnJlc2htZW4gZ2FtZSAyMDI0");
        showMessage(hiddenMsg);
        correctAnswers = 0;
      } else {
        showMessage(`ถูกละ! "${correctWord.toUpperCase()}" เหลืออีก ${remaining} คำถึงจะได้คำใบ้เพิ่มนะน้อง`);
      }
  
      startGame();
    } else {
      showMessage(`ผิด! ไปใส่มาใหม่ไป`);
      correctAnswers = 0;
    }
  };
  
  
  refreshBtn.addEventListener("click", startGame);
  checkBtn.addEventListener("click", checkAnswer);
  
  inputField.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  });
  
  startGame();