var questionsArry = [
  {
    title: "What can the value of a Boolean be?:",
    choices: ["1. True", "2. False", "3. 1 and 2", "4. Neither"],
    answer: "3. 1 and 2",
  },
  {
    title: "Where does the JS tag go in the HTML?",
    choices: [
      "1. We do not need it",
      "2. Another Body",
      "3. Head",
      "4. Body",
    ],
    answer: "4. Body",
  },
  {
    title: "What HTML element is used for JavaScript?",
    choices: [
      "1. <js>",
      "2. <scripture>",
      "3. <script>",
      "4. <ScriptofJava>",
    ],
    answer: "3. <script>",
  },
  {
    title:
      "What does a function need to operate?",
    choices: ["1. a key", "2. Power Cable", "3. ()", "4. Asking it nicely to work"],
    answer: "3. ()",
  },
];
var currentTime = document.querySelector("#countdown");
var timer = document.querySelector("#start-time");
var questions = document.querySelector("#question");
var pageContent = document.querySelector("#page-content");
var ulCreate = document.createElement("ul");
var counter = 0;
var score = 0;
var timeLeft = 75;
var timePenalty = 10;
var timeInterval;

/**
 * This function is used to track and update the timer.
 */
var countDown = function () {
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      currentTime.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft <= 0) {
      clearInterval(timeInterval);
      allDone();
      currentTime.textContent = 0;
    }
  }, 1000);

  displayQuestion(counter);
};

/**
 * This function is used to display the questions and their choices for the user by
 * taking the counter for the question index.
 * @param {} counter
 */
var displayQuestion = function (counter) {
  questions.innerHTML = "";
  ulCreate.innerHTML = "";
  for (let i = 0; i < questionsArry.length; i++) {
    questions.innerHTML = questionsArry[counter].title;
    var userChoices = questionsArry[counter].choices;
    questions.setAttribute("style", "font-weight:bold; font-size:20px");
  }

  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questions.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
};

/**
 * This function is used to compare the user selection with the correct answer
 * from the object by used the event handler to target the user selection.
 * @param {} event
 */
var compare = function (event) {
  var element = event.target;

  if (element.matches("li")) {
    var divisor = document.createElement("div");
    divisor.setAttribute("class", "divisor");
    if (element.textContent === questionsArry[counter].answer) {
      divisor.textContent = "Correct!";
    } else {
      timeLeft = timeLeft - 10;
      divisor.textContent = "Wrong!";
    }
    counter++;

    if (counter >= questionsArry.length) {
      allDone();
      divisor.removeProperty();
      if (timeLeft <= 0) {
        currentTime.textContent = 0;
      }
    } else {
      displayQuestion(counter);
    }
  }
  questions.appendChild(divisor);
};

/**
 * This function is the final page of the program to promote user input their
 * initials for the high score record in the local storage room. After the submit
 * button, the website will direct the user to the Highscore page.
 */
var allDone = function () {
  clearInterval(timeInterval);
  if (timeLeft <= 0) {
    currentTime.textContent = 0;
  }

  questions.innerHTML = "";
  ulCreate.innerHTML = "";

  var headerEl = document.createElement("h1");
  headerEl.setAttribute("class", "all-done-header");
  headerEl.textContent = "All Done!";
  questions.appendChild(headerEl);

  var paragraghEl = document.createElement("p");
  paragraghEl.setAttribute("class", "all-done-p");
  if (timeLeft >= 0) {
    paragraghEl.textContent = "Your final score is " + timeLeft;
    score = timeLeft;
    questions.appendChild(paragraghEl);
  } else {
    paragraghEl.textContent = "Your final score is 0";
    score = 0;
    questions.appendChild(paragraghEl);
  }

  var labelEl = document.createElement("label");
  labelEl.setAttribute("class", "all-done-l");
  labelEl.textContent = "Enter initials: ";
  questions.appendChild(labelEl);

  var inputEl = document.createElement("input");
  inputEl.setAttribute("class", "all-done-input");
  inputEl.setAttribute("type", "text");
  questions.appendChild(inputEl);

  var submitEl = document.createElement("button");
  submitEl.setAttribute("class", "all-done-button");
  submitEl.textContent = "Submit";
  questions.appendChild(submitEl);

  submitEl.addEventListener("click", function () {
    var initials = inputEl.value;

    if (initials === null) {
    } else {
      var finalScore = { initials: initials, score: score };
      var temp = localStorage.getItem("local");
      if (temp === null) {
        temp = [];
      } else {
        temp = JSON.parse(temp);
      }

      temp.push(finalScore);

      var record = JSON.stringify(temp);
      localStorage.setItem("local", record);

      window.location.replace("./highScore.html");
    }
  });
};

timer.addEventListener("click", countDown);
