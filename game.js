
const choices = ["rock", "paper", "scissors"];

let playerScore = 0;
let computerScore = 0;

const results = document.querySelector("#results");
const score = document.querySelector("#score");

const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");

// Play one round
function playRound(playerSelection) {
    // Stop the game if someone has already won
    if (playerScore === 5 || computerScore === 5) {
        return;
    }

    const computerSelection =
        choices[Math.floor(Math.random() * choices.length)];

    let roundResult;

    if (playerSelection === computerSelection) {
        roundResult = "It's a draw!";
    } else if (
        (playerSelection === "rock" &&
            computerSelection === "scissors") ||
        (playerSelection === "paper" &&
            computerSelection === "rock") ||
        (playerSelection === "scissors" &&
            computerSelection === "paper")
    ) {
        roundResult = "You win this round!";
        playerScore++;
    } else {
        roundResult = "Computer wins this round!";
        computerScore++;
    }

    // Display the round result
    results.textContent =
        `You chose ${playerSelection}. ` +
        `Computer chose ${computerSelection}. ` +
        roundResult;

    // Display the running score
    score.textContent =
        `Player: ${playerScore} | Computer: ${computerScore}`;

    // Check whether the game has ended
    if (playerScore === 5) {
        results.textContent += " Congratulations! You won the game!";
        disableButtons();
    } else if (computerScore === 5) {
        results.textContent +=
            " The computer won the game. Better luck next time!";
        disableButtons();
    }
}

// Add event listeners to the buttons
rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));

// Disable buttons when the game ends
function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
}
