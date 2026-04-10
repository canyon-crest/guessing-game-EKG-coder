/*
Notes:
1. ASK MR. HARE TO EXPLAIN HOW LEADERBOARD FUNCTIONS WORK AND HOW IT REPLACES VALUE WHEN IT IS LARGER...
2. Understand "Date with Month Names and Suffixes and Live Time" and "Round Timer, Fastest Game, and Average Time" javascript code
3. Work on CSS styling sheets for design

Extra:
1. First and Last Names
2. Replace Empty Leaderboard Spots with "-"
3. Game Mode Leaderboards
4. Extreme Game Mode with range = 1000
5. Input Validation
6. Streaks
7. Hints
8. Guess History
9. Confetti Celebration for Correct Guess
10. CSS Styling
*/

//Player Name
let playerName = prompt("Enter your name: ", "");

//EXTRA: First and Last Names
if(playerName && playerName.trim() !== ""){
    playerName = playerName.trim().toLowerCase();
    let words = playerName.split(" ") // Separate each individual word into array
    let result = "";

    for (let i = 0; i < words.length; i++){
        let word = words[i]
        if (word.length > 0){
            result += word.charAt(0).toUpperCase() + word.slice(1) + " "; // Capitalize first letter of word and add
        }
        playerName = result.trim(); // remove extra space at end 
    }
}

//Global Variables
let range = 0;
let answer = 0;
let guessCount = 0;
let currentMode = "";
let roundStartTime = 0;
let currentStreak = 0;
let bestStreak = 0;
let hintUsed = false;
let guessHistory = [];
const scores = [];
const easyScores = [];
const mediumScores = [];
const hardScores = [];
const extremeScores = [];
const roundTimes = [];


//Play Button
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("hintBtn").addEventListener("click", giveHint);

function play(){
    let levels = document.getElementsByName("level");
    
    for(let i = 0; i < levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    //Determines mode; Mode Leaderboard
    if (range == 3) {
        currentMode = "easy";
    } 
    else if (range == 10) {
        currentMode = "medium";
    } 
    else if (range == 100){
        currentMode = "hard";
    }
    else{
        currentMode = "extreme";
    }

    document.getElementById("msg").textContent = playerName + ", guess a number 1-" + range;
    answer = Math.floor(Math.random()*range)+1;
    guessCount = 0;
    hintUsed = false;
    guessHistory = [];
    updateGuessHistoryDisplay();

    roundStartTime = new Date().getTime(); //Round Timer, Fastest Game, and Average Time

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    hintBtn.disabled = false;
    playBtn.disabled = true;
}

//Guess Button
function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    //Input Validation
    if(isNaN(guess) || guess < 1 || guess > range){
        msg.textContent = "Please enter a valid number.";
        return;
    }
    guessCount++;

    if(guess == answer){
        msg.textContent = "Correct " + playerName + "!" + " You took " + guessCount + " tries. Streak: " + (currentStreak + 1);
        launchConfetti();

        currentStreak++;
        if(currentStreak > bestStreak){
            bestStreak = currentStreak;
        }
        updateStreakDisplay();

        let finalScore = guessCount;
        if(hintUsed){
            finalScore++;
        }

        guessHistory.push(guess + " (correct)");
        updateGuessHistoryDisplay();

        updateScore(finalScore);
        updateTimeStats();
        resetGame();
        return;
    }
    
    //Proximity: Hot or cold
    else{
        let difference = Math.abs(guess-answer);
        let proximity = "";
    
    if(difference <= 2){
        proximity = "hot";
    }
    else if(difference <= 5){
        proximity = "warm";
    }
    else{
        proximity = "cold";
    }
    
    if(guess < answer){
        msg.textContent = "Too low, try again. You are " + proximity + "!";
        guessHistory.push(guess + " (too low, " + proximity + ")");
    }
    else{
        msg.textContent = "Too high, try again. You are " + proximity +"!";
        guessHistory.push(guess + " (too high, " + proximity + ")");
    }
    updateGuessHistoryDisplay();
    }   
}

//Leaderboard
function updateScore(score){
    //Overall Scores
    scores.push(score);
    scores.sort(function(a,b){return a-b}); // sort score increasing

    //Update Overall Scores
    wins.textContent = "Total wins: " + scores.length;
    let sum = 0;
    
    for(let i = 0; i < scores.length; i++){
        sum += scores[i]; // sum = sum + scores[i]
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    //Update Main Leaderboard
    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
        else{
            lb[i].textContent = "-" //EXTRA: Replace Empty Leaderboard Spots
        }
    }

    //Store In Correct Leaderboard
    if(currentMode == "easy"){
        easyScores.push(score);
        easyScores.sort(function(a, b){ return a - b; });
    }
    else if(currentMode == "medium"){
        mediumScores.push(score);
        mediumScores.sort(function(a, b){ return a - b; });
    }
    else if(currentMode == "hard"){
        hardScores.push(score);
        hardScores.sort(function(a, b){ return a - b; });
    }
    else if(currentMode == "extreme"){
        extremeScores.push(score);
        extremeScores.sort(function(a, b){ return a - b; });
    }

    updateModeLeaderboards()
}

//EXTRA: Game Mode Leaderboards
function updateModeLeaderboards(){
    let easyIds = ["easy1", "easy2", "easy3"];
    let mediumIds = ["medium1", "medium2", "medium3"];
    let hardIds = ["hard1", "hard2", "hard3"];
    let extremeIds = ["extreme1", "extreme2", "extreme3"];

    //condition ? valueIfTrue : valueIfFalse
    for(let i = 0; i < 3; i++){
        document.getElementById(easyIds[i]).textContent =
            i < easyScores.length ? easyScores[i] : "-";

        document.getElementById(mediumIds[i]).textContent =
            i < mediumScores.length ? mediumScores[i] : "-";

        document.getElementById(hardIds[i]).textContent =
            i < hardScores.length ? hardScores[i] : "-";
        
        document.getElementById(extremeIds[i]).textContent =
            i < extremeScores.length ? extremeScores[i] : "-";
    }
}

//EXTRA: Streaks
updateStreakDisplay();
function updateStreakDisplay() {
    document.getElementById("streak").textContent = "Current Streak: " + currentStreak;
    document.getElementById("bestStreak").textContent = "Best Streak: " + bestStreak;
}

//EXTRA: Hints
function giveHint(){
    if(hintUsed){
        msg.textContent = "You already used your hint this round.";
        return;
    }

    let hintMessage = "";

    if(currentMode == "easy"){
        if(answer % 2 == 0){
            hintMessage = "Hint: The number is even.";
        }
        else{
            hintMessage = "Hint: The number is odd.";
        }
    }
    else if(currentMode == "medium"){
        if(answer <= range / 2){
            hintMessage = "Hint: The number is in the lower half.";
        }
        else{
            hintMessage = "Hint: The number is in the upper half.";
        }
    }
    else if(currentMode == "hard"){
        if(answer % 5 == 0){
            hintMessage = "Hint: The number is a multiple of 5.";
        }
        else{
            hintMessage = "Hint: The number is not a multiple of 5.";
        }
    }
    else{
        let lower = Math.floor(answer / 100) * 100;
        let upper = lower + 99;

        if(lower < 1){
            lower = 1;
        }
        if(upper > range){
            upper = range;
        }

        hintMessage = "Hint: The number is between " + lower + " and " + upper + ".";
    }

    msg.textContent = hintMessage;
    hintUsed = true;
    hintBtn.disabled = true;
}

//EXTRA: Guess History
updateGuessHistoryDisplay();
function updateGuessHistoryDisplay() {
    if(guessHistory.length === 0){
        document.getElementById("history").textContent = "Previous guesses: -";
    }
    else{
        document.getElementById("history").textContent =
            "Previous guesses: " + guessHistory.join(", ");
    }
}

//EXTRA: CONFETTI!!!
function launchConfetti() {
    const container = document.getElementById("confettiContainer");
    const pieces = 30;

    for(let i = 0; i < pieces; i++){
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        if(Math.random() < 0.5){
            confetti.classList.add("square");
        }
        else{
            confetti.classList.add("circle");
        }

        const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#8338ec"];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = (Math.random() * 0.3) + "s";
        confetti.style.transform = "rotate(" + (Math.random() * 360) + "deg)";

        container.appendChild(confetti);

        setTimeout(function() {
            confetti.remove();
        }, 2000);
    }
}

//Give Up Button
document.getElementById("giveUpBtn").addEventListener("click", giveUp)

function giveUp(){
    msg.textContent = playerName + ", you gave up. The answer was " + answer + ".";
    
    currentStreak = 0;
    updateStreakDisplay();
    
    guessHistory.push("Gave up");
    updateGuessHistoryDisplay();
    
    updateScore(range); //Score becomes range value
    updateTimeStats();
    resetGame();
}

//Date with Month Names and Suffixes and Live Time
let now = new Date()

function getSuffix(day){
    if (day >= 11 && day <= 13){
        return "th";
    }

    switch (day % 10){
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function updateDateTime() {
    let now = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let monthName = months[now.getMonth()];
    let day = now.getDate();
    let year = now.getFullYear();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById("date").textContent =
        monthName + " " + day + getSuffix(day) + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}

updateDateTime();
setInterval(updateDateTime, 1000);

//Round Timer, Fastest Game, and Average Time
function updateTimeStats() {
    let endTime = new Date().getTime();
    let elapsedTime = (endTime - roundStartTime) / 1000; // seconds

    roundTimes.push(elapsedTime);

    let fastestTime = roundTimes[0];
    let sum = 0;

    for (let i = 0; i < roundTimes.length; i++) {
        if (roundTimes[i] < fastestTime) {
            fastestTime = roundTimes[i];
        }
        sum += roundTimes[i];
    }

    let averageTime = sum / roundTimes.length;

    document.getElementById("fastest").textContent =
        "Fastest Game: " + fastestTime.toFixed(2) + " seconds";

    document.getElementById("avgTime").textContent =
        "Average Time: " + averageTime.toFixed(2) + " seconds";
}

//Reset
function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    hintBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
    ex.disabled = false;
}