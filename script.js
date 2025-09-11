function incrementScore(team, points) {
    const scoreElement = document.getElementById(`${team}-score`);
    let currentScore = parseInt(scoreElement.textContent);
    currentScore += points;
    scoreElement.textContent = currentScore;
}