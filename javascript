window.onload = initializeChatbot;

// Handle closing the chatbot
document.getElementById('close-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'none';
});

// Initialize the chatbot
function initializeChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'flex'; // Show chatbot
    displayBotMessage("Hello! Please describe at least two symptoms, and I'll provide a possible diagnosis.");
    loadSymptomDatabase(); // Load symptom database on initialization
}

// Load symptom database
let symptomDatabase = {}; // Initialize the database variable

function loadSymptomDatabase() {
    fetch('dataset.csv')  // Adjust the path if necessary
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            processSymptomData(data);
        })
        .catch(error => {
            displayBotMessage("There was an error loading the symptom database. Please try again later.");
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Process the symptom data from CSV
function processSymptomData(data) {
    const rows = data.split('\n');
    rows.forEach(row => {
        const columns = row.split(',');
        const symptoms = columns[0].trim().split('|'); // Adjust the delimiter based on your CSV format
        const disease = columns[1].trim();
        symptoms.forEach(symptom => {
            if (!symptomDatabase[symptom]) {
                symptomDatabase[symptom] = [];
            }
            symptomDatabase[symptom].push(disease);
        });
    });
}

// Handle chat form submission
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const userInput = document.getElementById('user-input').value.trim();

    if (userInput.split(',').length < 2) {
        displayBotMessage("Please enter at least two symptoms, separated by commas.");
        return;
    }

    displayUserMessage(userInput);
    getDiagnosis(userInput);
    document.getElementById('user-input').value = '';
    scrollToBottom();
});

// Fetch the diagnosis based on symptoms
function getDiagnosis(userInput) {
    const symptomsEntered = userInput.split(',').map(symptom => symptom.trim());
    const possibleDiseases = new Set();

    symptomsEntered.forEach(symptom => {
        if (symptomDatabase[symptom]) {
            symptomDatabase[symptom].forEach(disease => possibleDiseases.add(disease));
        }
    });

    if (possibleDiseases.size > 0) {
        displayBotMessage(`Possible diseases for the entered symptoms: ${Array.from(possibleDiseases).join(', ')}`);
    } else {
        displayBotMessage("Sorry, I couldn't find any diseases associated with the entered symptoms.");
    }
}

// Display user's message
function displayUserMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'user';
    userMessage.textContent = `You: ${message}`; // Fixed template literal
    messagesContainer.appendChild(userMessage);
}

// Display bot's message
function displayBotMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const botMessage = document.createElement('div');
    botMessage.className = 'bot';
    botMessage.textContent = `Bot: ${message}`; // Fixed template literal
    messagesContainer.appendChild(botMessage);
}

// Scroll to the bottom of the messages
function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
