document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const clickSound = new Audio("frontend/sounds/click.mp3"); // Update the path if needed

    // Function to start the game
    const startGame = async () => {
        try {
            clickSound.play(); // Play sound when clicking the button

            const response = await fetch("http://localhost:5001/api/game/start");
            const data = await response.json();

            // Display the game data
            if (data && data.data) {
                const gameData = data.data;

                // Display the question image
                const questionImg = document.createElement("img");
                questionImg.src = gameData.question;
                questionImg.alt = "Question Image";
                document.getElementById("question-container").appendChild(questionImg);

                // Input for the user to submit their answer
                const answerInput = document.createElement("input");
                answerInput.type = "number";
                answerInput.placeholder = "Enter your answer";
                document.getElementById("answer-container").appendChild(answerInput);

                // Button to submit the answer
                const submitBtn = document.createElement("button");
                submitBtn.textContent = "Submit Answer";
                document.getElementById("answer-container").appendChild(submitBtn);

                submitBtn.addEventListener("click", () => {
                    const userAnswer = parseInt(answerInput.value);
                    if (userAnswer === gameData.solution) {
                        alert("Correct Answer!");
                    } else {
                        alert("Wrong Answer! Try Again.");
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching game data:", error);
        }
    };

    // Attach event listener to the start button
    if (startButton) {
        startButton.addEventListener("click", startGame);
    }
});
