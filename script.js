//ASK MR. HARE TO EXPLAIN HOW LEADERBOARD FUNCTIONS WORK AND HOW IT REPLACES VALUE WHEN IT IS LARGER...

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
const scores = [];
const easyScores = [];
const mediumScores = [];
const hardScores = [];


//Play Button
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);

function play(){
    let levels = document.getElementsByName("level");
    
    for(let i = 0; i < levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    //Determines mode
    if (range == 3) {
        currentMode = "easy";
    } else if (range == 10) {
        currentMode = "medium";
    } else {
        currentMode = "hard";
    }

    document.getElementById("msg").textContent = playerName + ", guess a number 1-" + range;
    answer = Math.floor(Math.random()*range)+1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

//Guess Button
function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess < 1 || guess > range){
        msg.textContent = "Please enter a valid number.";
        return;
    }
    guessCount++;

    if(guess == answer){
        msg.textContent = "Correct " + playerName + "!" + " You took " + guessCount + " tries.";
        updateScore(guessCount);
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
    }
    else{
        msg.textContent = "Too high, try again. You are " + proximity +"!";
    }
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

    updateModeLeaderboards()
}

//EXTRA: Game Mode Leaderboards
function updateModeLeaderboards(){
    let easyIds = ["easy1", "easy2", "easy3"];
    let mediumIds = ["medium1", "medium2", "medium3"];
    let hardIds = ["hard1", "hard2", "hard3"];

    //condition ? valueIfTrue : valueIfFalse
    for(let i = 0; i < 3; i++){
        document.getElementById(easyIds[i]).textContent =
            i < easyScores.length ? easyScores[i] : "-";

        document.getElementById(mediumIds[i]).textContent =
            i < mediumScores.length ? mediumScores[i] : "-";

        document.getElementById(hardIds[i]).textContent =
            i < hardScores.length ? hardScores[i] : "-";
    }
}

//Reset
function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}