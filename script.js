document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('crt-input');
    const crtText = document.querySelector('.crt-text');

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const userInput = inputField.value.trim();
            if (userInput) {
                const newLine = document.createElement('span');
                newLine.className = 'line';
                newLine.textContent = `> ${userInput}`;
                crtText.appendChild(newLine);
                crtText.appendChild(document.createElement('br'));
                inputField.value = ''; // Clear the input field

                // Parse the command
                const commandParts = userInput.split(' ');
                const command = commandParts[0].toLowerCase();
                const args = commandParts.slice(1).join(' ');

                // Handle commands
                if (command === 'echo') {
                    handleEchoCommand(args);
                } else if (command === 'advice') {
                    handleAdviceCommand();
                } else if (command === 'help') {
                    displayResponse('Available commands: help, clear, echo, advice');
                } else if (command === 'clear') {
                    crtText.innerHTML = ''; // Clear the screen
                } else {
                    displayResponse(`Unknown command: ${command}`);
                }
            }
        }
    });

    function handleEchoCommand(text) {
        displayResponse(text);
    }

    async function handleAdviceCommand() {
        try {
            // Adding a random number to prevent caching
            const randomParam = Math.floor(Math.random() * 1000000);
            const response = await fetch(`https://api.adviceslip.com/advice?random=${randomParam}`);
            const data = await response.json();
            if (data && data.slip && data.slip.advice) {
                displayResponse(data.slip.advice);
            } else {
                displayResponse('Could not fetch advice. Please try again.');
            }
        } catch (error) {
            displayResponse('Error fetching advice.');
        }
    }

    function displayResponse(text) {
        const responseLine = document.createElement('span');
        responseLine.className = 'line';
        responseLine.textContent = text;
        crtText.appendChild(responseLine);
        crtText.appendChild(document.createElement('br'));
    }
});
