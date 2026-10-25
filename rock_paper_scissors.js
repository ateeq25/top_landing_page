
const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

console.log("Rock Paper Scissors: Best of Five!");
console.log("First to 3 wins takes the game.");

function playGame() {
    while (playerScore < 3 && computerScore < 3) {
        let playerSelection = prompt(
            "Choose rock, paper, or scissors:"
        );

        if (playerSelection === null) {
            console.log("Game cancelled.");
            return;
        }

        playerSelection = playerSelection.toLowerCase().trim();

        if (!choices.includes(playerSelection)) {
            console.log("Invalid choice. Try again.");
            continue;
        }

        const computerSelection =
            choices[Math.floor(Math.random() * choices.length)];

        console.log("You chose:", playerSelection);
        console.log("Computer chose:", computerSelection);

        if (playerSelection === computerSelection) {
            console.log("It's a draw!");
        } else if (
            (playerSelection === "rock" &&
                computerSelection === "scissors") ||
            (playerSelection === "paper" &&
                computerSelection === "rock") ||
            (playerSelection === "scissors" &&
                computerSelection === "paper")
        ) {
            console.log("You win this round!");
            playerScore++;
        } else {
            console.log("Computer wins this round!");
            computerScore++;
        }

        console.log(
            `Score: You ${playerScore} - ${computerScore} Computer`
        );
        console.log("----------------------");
    }

    if (playerScore === 3) {
        console.log("Congratulations! You won the game!");
    } else {
        console.log("Computer won the game. Better luck next time!");
    }

    console.log(
        `Final score: You ${playerScore} - ${computerScore} Computer`
    );
}

playGame();
