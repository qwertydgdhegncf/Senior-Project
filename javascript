// Function to initialize the chatbot
function initializeChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'flex'; // Show chatbot
    displayBotMessage("Hello! Please describe your symptoms, and I'll provide possible diagnoses and recommend a doctor.");
}

// Show the chatbot when the page loads
window.onload = initializeChatbot;

// Handle closing the chatbot
document.getElementById('close-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'none';
});

// Handle chat form submission
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userInput = document.getElementById('user-input').value.trim();
    
    if (userInput !== "") {
        displayUserMessage(userInput);
        
        const response = getResponse(userInput);
        
        displayBotMessage(response);
        
        document.getElementById('user-input').value = '';
        
        scrollToBottom();
    }
});

function displayUserMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'user';
    userMessage.textContent = `You: ${message}`;
    messagesContainer.appendChild(userMessage);
}

function displayBotMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const botMessage = document.createElement('div');
    botMessage.className = 'bot';
    botMessage.textContent = `Bot: ${message}`;
    messagesContainer.appendChild(botMessage);
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getResponse(symptom) {
    const symptomResponses = {
        'fever': {
            diagnosis: 'You may have an infection or flu.',
            advice: 'Rest, stay hydrated, and monitor your temperature.',
            doctor: 'Dr. Siddharth Rao Kartik'
        },
        'cough': {
            diagnosis: 'This could indicate a respiratory infection or allergies.',
            advice: 'Stay hydrated and avoid irritants. If persistent, seek medical advice.',
            doctor: 'Dr. Priya Nahal'
        },
        'headache': {
            diagnosis: 'Possible causes include tension, dehydration, or migraine.',
            advice: 'Rest in a quiet, dark room and stay hydrated. If severe, consult a doctor.',
            doctor: 'Dr. Bolormaa Munkhold'
        },
        'nausea': {
            diagnosis: 'This could be due to food poisoning, pregnancy, or other conditions.',
            advice: 'Stay hydrated and eat bland foods. If persistent, seek medical attention.',
            doctor: 'Dr. Priya Nahal'
        },
        'fatigue': {
            diagnosis: 'Fatigue can be caused by lack of sleep, stress, or underlying health issues.',
            advice: 'Ensure you are getting enough rest and managing stress. If prolonged, consult a doctor.',
            doctor: 'Dr. Siddharth Rao Kartik'
        },
        'chest pain': {
            diagnosis: 'Chest pain can be a sign of serious conditions like heart problems.',
            advice: 'Seek immediate medical attention. This symptom requires urgent evaluation.',
            doctor: 'Dr. Bolormaa Munkhold'
        }
    };

    const lowerSymptom = symptom.toLowerCase();
    
    if (symptomResponses[lowerSymptom]) {
        const response = symptomResponses[lowerSymptom];
        return `Possible diagnosis: ${response.diagnosis}\nAdvice: ${response.advice}\nRecommended doctor: ${response.doctor}`;
    } else {
        return "I'm not familiar with that symptom. Please consult a healthcare provider or one of our doctors for proper evaluation.";
    }
};
