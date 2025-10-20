document.addEventListener('DOMContentLoaded', function () {
    //Home score buttons
    document.getElementById('home-1increment').addEventListener('click', () => incrementScore('home', 1));
    document.getElementById('home-2increment').addEventListener('click', () => incrementScore('home', 2));
    document.getElementById('home-3increment').addEventListener('click', () => incrementScore('home', 3));
    //Guest score buttons
    document.getElementById('guest-1increment').addEventListener('click', () => incrementScore('guest', 1));
    document.getElementById('guest-2increment').addEventListener('click', () => incrementScore('guest', 2));
    document.getElementById('guest-3increment').addEventListener('click', () => incrementScore('guest', 3));
    //Timer buttons
    document.getElementById('start-btn').addEventListener('click', () => startTimer());
    document.getElementById('stop-btn').addEventListener('click', () => stopTimer());
    document.getElementById('reset-btn').addEventListener('click', () => resetTimer());

    updateButtonStates();
});


function incrementScore(team, points) {
    const scoreElement = document.getElementById(`${team}-score`);
    let currentScore = parseInt(scoreElement.textContent);
    currentScore += points;
    scoreElement.textContent = currentScore;
}


// timer variables
let timerInterval;
let seconds = 0;
let isRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    const display = `${minutes}:${remainingSeconds}`;
    document.querySelector('.time-display').textContent = display;

}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
        updateButtonStates();
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        updateButtonStates();
    }
}

function resetTimer() {
    seconds = 0;
    stopTimer();
    resetScores();
    updateTimerDisplay();
    updateButtonStates();
}


function resetScores() {
    document.getElementById('home-score').textContent = 0;
    document.getElementById('guest-score').textContent = 0;
}

//Button state management
function updateButtonStates() {

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');

    const scoreButtons = [
        document.getElementById('home-1increment'),
        document.getElementById('home-2increment'),
        document.getElementById('home-3increment'),
        document.getElementById('guest-1increment'),
        document.getElementById('guest-2increment'),
        document.getElementById('guest-3increment')
    ];

    startBtn.disabled = isRunning;
    stopBtn.disabled = !isRunning;
    //reset disabled when game has not started -> isRunning is false and seconds set to 0
    resetBtn.disabled = !isRunning && (seconds === 0);
    console.log(`isrunning is ${isRunning} and seconds is ${seconds}`)
    scoreButtons.forEach(btn => btn.disabled = !isRunning)

}