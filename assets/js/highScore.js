var ulEl = document.querySelector("#highscores");
var clearEl = document.querySelector("#clear-btn");
var goBackEl = document.querySelector("#back-btn");
var scores = localStorage.getItem("local");
var MAX_LENGTH = 3;

clearEl.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

goBackEl.addEventListener("click", function () {
  window.location.replace("./index.html");
});

/**
 * This function is used to display the highest three user score from
 * the local storage.
 */
var display = function () {
  scores = JSON.parse(scores);

  for (var k = 1; k < scores.length; k++) {
    for (var i = 0; i < scores.length - k; i++) {
      if (scores[i].score <= scores[i + 1].score) {
        var temp = scores[i];
        scores[i] = scores[i + 1];
        scores[i + 1] = temp;
      }
    }
  }

  if (scores != null) {
    for (let i = 0; i < MAX_LENGTH; i++) {
      var liEl = document.createElement("li");
      liEl.setAttribute("style", "background-color:plum");
      liEl.textContent =
        i + 1 + ". " + scores[i].initials + " - " + scores[i].score;
      ulEl.appendChild(liEl);
    }
  }
};

display();
