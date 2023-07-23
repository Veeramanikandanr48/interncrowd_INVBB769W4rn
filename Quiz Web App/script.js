const quizData = [
    {
      question: "Among the following, which is the HTML paragraph tag?",
      option_a: "<p>",
      option_b: "<pre>",
      option_c: "<hr>",
      option_d: "<a>",
      correct: "a"
    },
    {
      question: "Who is the father of HTML?",
      option_a: "Rasmus Lerdorf",
      option_b: "Tim Berners-Lee",
      option_c: "Brendan Eich",
      option_d: "Sergey Brin",
      correct: "b"
    },
    {
      question: "HTML stands for __________",
      option_a: "HyperText Markup Language",
      option_b: "HyperText Machine Language",
      option_c: "HyperText Marking Language",
      option_d: "HighText Marking Language",
      correct: "a"
    },
    {
      question: "What is the correct syntax of doctype in HTML5?",
      option_a: "</doctype html>",
      option_b: "<doctype html>",
      option_c: "<doctype html!>",
      option_d: "<!doctype html>",
      correct: "d"
    },
    {
      question: "Which of the following tag is used for inserting the largest heading in HTML?",
      option_a: "head",
      option_b: "<h1>",
      option_c: "<h6>",
      option_d: "heading",
      correct: "b"
    },
    {
      question: "In which part of the HTML metadata is contained?",
      option_a: "head tag",
      option_b: "title tag",
      option_c: "html tag",
      option_d: "body tag",
      correct: "a"
    },
    {
      question: "Which element is used to get highlighted text in HTML5?",
      option_a: "<u>",
      option_b: "<mark>",
      option_c: "<highlight>",
      option_d: "<b>",
      correct: "b"
    },
    {
      question: "Which of the following is not an HTML5 tag?",
      option_a: "<track>",
      option_b: "<video>",
      option_c: "<slider>",
      option_d: "<source>",
      correct: "c"
    },
    {
      question: "How do we write comments in HTML?",
      option_a: "</!-->",
      option_b: "<!---->",
      option_c: "</----/>",
      option_d: "<!----!>",
      correct: "b"
    },
    {
      question: "Which element is used for styling HTML5 layout?",
      option_a: "CSS",
      option_b: "jQuery",
      option_c: "JavaScript",
      option_d: "PHP",
      correct: "a"
    },
    {
      question: "What does CSS stand for?",
      option_a: "Creative Style Sheets",
      option_b: "Computer Style Sheets",
      option_c: "Cascading Style Sheets",
      option_d: "Colorful Style Sheets",
      correct: "c"
    },
    {
      question: "Which property is used to change the font size of text?",
      option_a: "font-weight",
      option_b: "font-style",
      option_c: "font-family",
      option_d: "font-size",
      correct: "d"
    },
    {
      question: "What is the correct way to comment in CSS?",
      option_a: "/* This is a comment */",
      option_b: "// This is a comment",
      option_c: "// This is a comment //",
      option_d: "<!-- This is a comment -->",
      correct: "a"
    },
    {
      question: "Which property is used to add space between the elements' content and its border?",
      option_a: "padding",
      option_b: "margin",
      option_c: "border",
      option_d: "spacing",
      correct: "a"
    },
    {
      question: "What does HTML stand for?",
      option_a: "Hyperlinks and Text Markup Language",
      option_b: "Home Tool Markup Language",
      option_c: "Hyper Text Markup Language",
      option_d: "Hyper Text Makeup Language",
      correct: "c"
    },
    // Add more quiz questions here...
  ];
  
  // Rest of the code remains the same...
  
  
  const quiz = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const optionAElement = document.getElementById("option_a");
  const optionBElement = document.getElementById("option_b");
  const optionCElement = document.getElementById("option_c");
  const optionDElement = document.getElementById("option_d");
  const submitButton = document.getElementById("submitBtn");
  const resultElement = document.getElementById("result");
  const playAgainBtn = document.getElementById("playAgainBtn");
  
  let currentQuiz = 0;
  let score = 0;
  let answeredQuestions = [];
  
  const shuffleOptions = () => {
    const currentQuizData = quizData[currentQuiz];
    const options = [currentQuizData.option_a, currentQuizData.option_b, currentQuizData.option_c, currentQuizData.option_d];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };
  
  const loadQuiz = () => {
    if (answeredQuestions.length === quizData.length) {
      // If all questions are answered, show the result
      showResult();
    } else {
      // Find a new question index that has not been answered
      let newQuestionIndex = Math.floor(Math.random() * quizData.length);
      while (answeredQuestions.includes(newQuestionIndex)) {
        newQuestionIndex = Math.floor(Math.random() * quizData.length);
      }
  
      // Update the currentQuiz with the new question index
      currentQuiz = newQuestionIndex;
      const currentQuizData = quizData[currentQuiz];
  
      // Shuffle the options
      const shuffledOptions = shuffleOptions();
  
      questionElement.innerText = currentQuizData.question;
      optionAElement.innerText = shuffledOptions[0];
      optionBElement.innerText = shuffledOptions[1];
      optionCElement.innerText = shuffledOptions[2];
      optionDElement.innerText = shuffledOptions[3];
    }
  };
  
  const getSelectedOption = () => {
    const options = document.querySelectorAll('input[name="option"]');
    let selectedOption;
    options.forEach((option) => {
      if (option.checked) selectedOption = option.value;
    });
    return selectedOption;
  };
  
  const deselectOptions = () => {
    const options = document.querySelectorAll('input[name="option"]');
    options.forEach((option) => (option.checked = false));
  };
  
  const celebrate = () => {
    const emojis = ["🎉", "🎊", "🥳", "👏", "👍", "🌟", "🎈"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const celebrationElement = document.createElement("span");
    celebrationElement.innerText = emoji;
    celebrationElement.classList.add("celebration");
    questionElement.appendChild(celebrationElement);
  
    setTimeout(() => {
      celebrationElement.remove();
    }, 1000);
  };
  
  const checkAnswer = () => {
    const selectedOption = getSelectedOption();
    const currentQuizData = quizData[currentQuiz];
    if (selectedOption === currentQuizData.correct) {
      score++;
      celebrate();
    }
    // Add the current question index to the answeredQuestions array
    answeredQuestions.push(currentQuiz);
  };
  
  const showResult = () => {
    quiz.style.display = "none";
    resultElement.innerText = `You scored ${score} out of ${quizData.length}`;
    resultElement.style.display = "block";
    playAgainBtn.style.display = "block";
  };
  
  submitButton.addEventListener("click", () => {
    const selectedOption = getSelectedOption();
    if (selectedOption) {
      checkAnswer();
      loadQuiz();
      deselectOptions();
    }
  });
  
  playAgainBtn.addEventListener("click", () => {
    // Reset variables
    currentQuiz = 0;
    score = 0;
    answeredQuestions = [];
    loadQuiz();
    resultElement.style.display = "none";
    playAgainBtn.style.display = "none";
    quiz.style.display = "block";
  });
  
  loadQuiz();