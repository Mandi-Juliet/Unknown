/* =====================================
   THE UNKNOWN
   VERSION 1
===================================== */

let score = 0;
let xp = 0;
let level = 1;
let discoveries = 0;

const startButton = document.getElementById("startButton");
const caseArea = document.getElementById("caseArea");
const choices = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const nextButton = document.getElementById("nextButton");

const scoreDisplay = document.getElementById("score");
const xpDisplay = document.getElementById("xp");
const levelDisplay = document.getElementById("level");
const discoveriesDisplay = document.getElementById("discoveries");


/* =====================================
   START INVESTIGATION
===================================== */

startButton.addEventListener("click", function () {

    startButton.style.display = "none";

    caseArea.classList.remove("hidden");

    caseArea.scrollIntoView({
        behavior: "smooth"
    });

});


/* =====================================
   CHOOSE ANSWER
===================================== */

choices.forEach(function (choice) {

    choice.addEventListener("click", function () {

        // Prevent choosing again
        choices.forEach(function (button) {
            button.disabled = true;
        });

        const answer = choice.dataset.answer;

        if (answer === "correct") {

            choice.classList.add("correct");

            score += 100;
            xp += 50;
            discoveries++;

            result.className = "result success";

            result.textContent =
                "✓ Correct. You noticed something most people would miss.";

            nextButton.classList.remove("hidden");

            updateStats();

        } else {

            choice.classList.add("wrong");

            result.className = "result failure";

            result.textContent =
                "✕ Not quite. Look closer. Something is hidden in plain sight.";

            // Allow another attempt
            setTimeout(function () {

                choices.forEach(function (button) {

                    button.disabled = false;

                    button.classList.remove("wrong");

                });

            }, 900);

        }

    });

});


/* =====================================
   NEXT CLUE
===================================== */

nextButton.addEventListener("click", function () {

    /*
       We aren't ending the game.

       For now, we generate another
       investigation message.
    */

    discoveries++;

    score += 50;
    xp += 25;

    updateStats();

    result.className = "result success";

    result.textContent =
        "🔎 A new clue has appeared...";

    nextButton.classList.add("hidden");

    choices.forEach(function (button) {

        button.disabled = false;
        button.classList.remove("correct");
        button.classList.remove("wrong");

    });

    changeCase();

});


/* =====================================
   GENERATE NEXT CASE
===================================== */

function changeCase() {

    const messages = [

        {
            text: '"The door was never locked."',
            instruction: "Which detail feels suspicious?"
        },

        {
            text: '"Someone removed the clock at exactly 3:17."',
            instruction: "What should you investigate first?"
        },

        {
            text: '"There are four footprints. Only three people entered."',
            instruction: "What doesn't add up?"
        },

        {
            text: '"The photograph shows a room that no longer exists."',
            instruction: "What would you investigate?"
        }

    ];

    const random =
        messages[Math.floor(Math.random() * messages.length)];

    document.getElementById("mysteryMessage").textContent =
        random.text;

    document.querySelector(".instruction").innerHTML =
        random.instruction +
        "<br><strong>Choose carefully.</strong>";

}


/* =====================================
   UPDATE STATS
===================================== */

function updateStats() {

    // Level increases every 200 XP
    level = Math.floor(xp / 200) + 1;

    scoreDisplay.textContent = score;

    xpDisplay.textContent = xp;

    levelDisplay.textContent = level;

    discoveriesDisplay.textContent = discoveries;

    saveProgress();

}


/* =====================================
   SAVE PROGRESS
===================================== */

function saveProgress() {

    localStorage.setItem(
        "unknownScore",
        score
    );

    localStorage.setItem(
        "unknownXP",
        xp
    );

    localStorage.setItem(
        "unknownLevel",
        level
    );

    localStorage.setItem(
        "unknownDiscoveries",
        discoveries
    );

}


/* =====================================
   LOAD PROGRESS
===================================== */

function loadProgress() {

    score =
        Number(
            localStorage.getItem("unknownScore")
        ) || 0;

    xp =
        Number(
            localStorage.getItem("unknownXP")
        ) || 0;

    level =
        Number(
            localStorage.getItem("unknownLevel")
        ) || 1;

    discoveries =
        Number(
            localStorage.getItem("unknownDiscoveries")
        ) || 0;

    updateStats();

}


/* =====================================
   START
===================================== */

loadProgress();
