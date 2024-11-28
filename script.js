window.onload = initializeChatbot;

// Open the chatbot when the button is clicked
document.getElementById('open-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'flex';
});

// Close the chatbot when the close button is clicked
document.getElementById('close-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'none';
});

// Initialize the chatbot
function initializeChatbot() {
    displayBotMessage("Hi there! Enter your symptoms to get a personalized recommendation.");
}

// Symptom and solution database
const symptomDatabase = {
   // General and minor issues
   "fever,cough": "You may have the flu. Rest and drink plenty of fluids. Consult a doctor if symptoms persist.",
   "headache,nausea": "This could be a sign of a migraine. Rest in a dark room and take pain relief if needed.",
   "fatigue,fever": "It could be a sign of an infection. Ensure you get rest, stay hydrated, and consult a doctor.",
   "sore throat,cough": "You might have a common cold. Gargle with warm salt water and drink warm liquids.",
   "chest pain,shortness of breath": "Please seek emergency care immediately, as this may indicate a serious condition.",
   "itching,skin rash": "This might be an allergic reaction. Avoid scratching and consider taking antihistamines. Consult a doctor if it persists.",
   "fever,headache": "This could be a sign of a viral infection or flu. Rest, stay hydrated, and consult a doctor if symptoms worsen.",
   
   // Critical conditions and diseases
   "chest pain,left arm pain": "This may indicate a heart attack. Seek emergency medical attention immediately.",
   "severe headache,blurred vision": "Could be a sign of an aneurysm. Seek immediate medical help.",
   "uncontrolled thirst,frequent urination": "These are common symptoms of diabetes. Schedule a check-up with your doctor.",
   "sudden numbness,slurred speech": "These may be signs of a stroke. Seek immediate medical assistance.",
   "weight loss,fatigue": "This could be indicative of cancer. Consult an oncologist for further screening.",
   "persistent cough,blood in sputum": "Could be a sign of Tuberculosis. Consult a healthcare provider for testing.",
   "fever,dry cough": "This could indicate Covid-19. Get tested and self-isolate.",
   "cough,shortness of breath": "This could be pneumonia. Consult a healthcare provider for proper treatment.",
   "weight gain,joint pain": "These could be signs of obesity-related arthritis. Consider consulting a dietician and rheumatologist.",
   "swollen lymph nodes,night sweats": "Could indicate lymphoma (cancer of the lymph nodes). Seek oncological care.",
   "memory loss,confusion": "These are symptoms of Alzheimer's disease. Consider consulting a neurologist.",
   "muscle weakness,shortness of breath": "Could indicate respiratory disease. Consult a pulmonary specialist.",
   
   // Infectious diseases
   "fever,rash": "This might be chickenpox. Consult a healthcare provider for confirmation.",
   "rash,lymph node swelling": "These are symptoms of monkeypox. Consult a healthcare provider for testing.",
   "weight loss,night sweats": "These could indicate AIDS. Consult an infectious disease specialist.",
   "sore throat,fever": "This might be an infectious disease like strep throat. Consider seeing a doctor.",
   "fever,sore joints": "These could indicate Dengue Fever. Consult a doctor if symptoms persist.",
   "fever,body aches": "This might indicate a viral infection. Rest and stay hydrated.",
   "chest pain,difficulty breathing": "These symptoms could indicate tuberculosis or a respiratory infection. Seek medical care.",
   
   // Neurological conditions
   "memory loss,disorientation": "Could be early signs of Alzheimer's. Consider consulting a neurologist.",
   "confusion,poor coordination": "Could be a stroke or neurological disorder. Seek medical help immediately.",
   "muscle weakness,numbness": "These could indicate multiple sclerosis. Consult a neurologist.",
   "shaking hands,stiff muscles": "These are symptoms of Parkinson's disease. Consult a neurologist.",
   "headache,vision changes": "Could be a brain tumor. Seek medical imaging for further diagnosis.",
   
   // Metabolic and chronic diseases
   "thirst,fatigue": "These symptoms are common in diabetes. Consult an endocrinologist for testing.",
   "joint pain,stiffness": "This could be arthritis. Consult a rheumatologist.",
   "swollen joints,weight loss": "These symptoms could indicate rheumatoid arthritis. Consult a rheumatologist.",
   "muscle cramps,fatigue": "Could be due to electrolyte imbalance. Consider consulting a healthcare provider.",
   "high blood pressure,frequent urination": "These could be symptoms of kidney disease. Consult a nephrologist.",
   
   // Cancer symptoms
   "weight loss,fatigue,night sweats": "These could be signs of lymphoma or leukemia. Seek oncological consultation.",
   "breast lump,discharge": "These are possible symptoms of breast cancer. Consult an oncologist for screening.",
   "blood in stool,weight loss": "These symptoms could indicate colon cancer. Seek medical advice immediately.",
   "persistent cough,chest pain": "Could indicate lung cancer. Seek immediate medical attention.",
   "fatigue,abdominal pain": "These could be symptoms of liver cancer. Consult an oncologist.",
   "abdominal bloating,weight loss": "These symptoms may indicate ovarian cancer. Consult a gynecologist or oncologist.",
   "skin mole changes,bleeding": "Could be skin cancer (melanoma). Consult a dermatologist for examination.",
   
   // Heart conditions
   "chest pain,shortness of breath": "These could be signs of heart disease or heart attack. Seek emergency medical care.",
   "swollen ankles,shortness of breath": "This could be heart failure. Consult a cardiologist immediately.",
   "palpitations,dizziness": "Could indicate an arrhythmia. Consult a cardiologist.",
   "chest tightness,fatigue": "These could be signs of angina or coronary artery disease. Seek cardiological care.",
   
   // Respiratory diseases
   "persistent cough,weight loss": "This could be a sign of tuberculosis or chronic respiratory disease. Seek medical care.",
   "shortness of breath,wheezing": "These could be symptoms of asthma or COPD. Consult a pulmonologist.",
   "cough with mucus,shortness of breath": "Could indicate chronic bronchitis. Consult a pulmonologist.",
   
   // Gastrointestinal and digestive diseases
   "abdominal pain,diarrhea": "These could be symptoms of a digestive infection or food poisoning. Consult a gastroenterologist.",
   "blood in stool,abdominal pain": "These symptoms could indicate inflammatory bowel disease (IBD) or colorectal cancer.",
   "bloating,abdominal pain": "Could indicate irritable bowel syndrome (IBS) or gastritis. Consult a gastroenterologist.",
   "weight loss,nausea": "These could be symptoms of stomach cancer or ulcers. Consult a healthcare provider.",
   "jaundice,abdominal pain": "These could indicate liver disease or hepatitis. Seek medical care.",
   
   // Infections and viral diseases
   "high fever,muscle aches": "Could indicate a viral infection like Dengue. Seek medical care if symptoms worsen.",
   "fever,sore throat,body aches": "These could be symptoms of a viral infection or flu. Consider testing for Covid-19.",
   "rash,fever": "These could be symptoms of chickenpox or measles. Consult a healthcare provider.",
   
   // Other conditions
   "fatigue,dizziness": "Could be due to anemia. Consult a healthcare provider for a blood test.",
   "joint pain,swelling": "These could be symptoms of arthritis. Consult a rheumatologist.",
   "painful urination,lower abdominal pain": "These could be symptoms of a urinary tract infection (UTI). Consult a healthcare provider.",
   "nausea,upper abdominal pain": "Could indicate gallbladder disease or pancreatitis. Seek medical care.",
   "muscle pain,fatigue": "These could be symptoms of fibromyalgia. Consult a rheumatologist.",
   "fever,stiff neck": "Could indicate meningitis. Seek immediate medical care.",
   "swelling,leg pain": "These could be signs of deep vein thrombosis. Seek medical attention.",
   "dizziness,blurred vision": "Could be a sign of high blood pressure or stroke. Seek medical care.",
   "persistent cough,fever": "Could indicate bronchitis or another respiratory infection. Consult a healthcare provider."
}

// Handle chat form submission
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    const symptoms = userInput.split(',').map(symptom => symptom.trim());

    if (symptoms.length < 2) {
        displayBotMessage("Please enter at least two symptoms separated by a comma.");
        return;
    }

    displayUserMessage(userInput);
    provideSolution(symptoms);
    document.getElementById('user-input').value = '';
    scrollToBottom();
});

// Function to find and display a solution based on symptoms
function provideSolution(symptoms) {
    const key = symptoms.sort().join(',');
    if (symptomDatabase[key]) {
        displayBotMessage(`Possible diagnosis: ${symptomDatabase[key]}`);
    } else {
        const partialMatches = Object.keys(symptomDatabase).filter(dbKey =>
            symptoms.some(symptom => dbKey.includes(symptom))
        );

        if (partialMatches.length > 0) {
            displayBotMessage(`Possible related suggestions: ${partialMatches.map(match => symptomDatabase[match]).join(" OR ")}`);
        } else {
            displayBotMessage("No match found. Please consult a doctor for further advice.");
        }
    }
}

// Display user message
function displayUserMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'user';
    userMessage.textContent = `You: ${message}`;
    messagesContainer.appendChild(userMessage);
}

// Display bot message
function displayBotMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const botMessage = document.createElement('div');
    botMessage.className = 'bot';
    botMessage.textContent = `Bot: ${message}`;
    messagesContainer.appendChild(botMessage);
}

// Scroll chat to the bottom
function scrollToBottom() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
document.getElementById('medical-history-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect input values
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const medicalHistory = document.getElementById('medical-history').value;

    // Display suggestions
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = `
        <h6>Your Suggestions:</h6>
        <p>Based on your age (${age}), height (${height} inches), weight (${weight} pounds), and medical history, we recommend the following:</p>
        <ul>
            <li>Increase your daily water intake.</li>
            <li>Consider a balanced diet rich in fruits and vegetables.</li>
            <li>Consult with a nutritionist for personalized meal plans.</li>
        </ul>
        <h6>Meal Suggestions:</h6>
        <ul>
            ${getMealSuggestions(age, height, weight, medicalHistory)}
        </ul>
    `;
});

function getMealSuggestions(age, height, weight, medicalHistory) {
    // Simple logic to generate meal suggestions based on age, height, and weight
    let meals = [];

    // Calculate BMI
    const heightInMeters = height * 0.0254; // Convert height to meters
    const weightInKg = weight * 0.453592; // Convert weight to kg
    const bmi = weightInKg / (heightInMeters * heightInMeters);

    // Generate meal suggestions based on BMI
    if (bmi < 18.5) {
        meals.push("<li>High-calorie smoothies (e.g., banana, peanut butter, and yogurt).</li>");
        meals.push("<li>Whole grain pasta with olive oil and vegetables.</li>");
        meals.push("<li>Nut butter on whole grain toast with honey.</li>");
    } else if (bmi >= 18.5 && bmi < 24.9) {
        meals.push("<li>Grilled chicken salad with a variety of vegetables.</li>");
        meals.push("<li>Quinoa bowl with black beans, corn, and avocado.</li>");
        meals.push("<li>Oatmeal topped with fresh fruits and nuts.</li>");
    } else {
        meals.push("<li>Grilled fish with steamed vegetables.</li>");
        meals.push("<li>Vegetable stir-fry with tofu and brown rice.</li>");
        meals.push("<li>Salad with lean protein (e.g., chicken or turkey) and whole grain croutons.</li>");
    }

    // Add meal suggestions based on medical history
    if (medicalHistory.includes("diabetes")) {
        meals.push("<li>Low-carb meals with lean protein and vegetables.</li>");
    } else if (medicalHistory.includes("heart disease")) {
        meals.push("<li>Low-sodium meals with lean protein and whole grains.</li>");
    }

    return meals.join("");
}

$(document).ready(function(){
    $('.feedback-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        navText: ["<i class = 'fas fa-arrow-left'></i>", "<i class = 'fas fa-arrow-right'></i>"]
    });

    // stop animation on resize
    let resizeTimer;
    $(window).resize(function(){
        $(document.body).addClass('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            $(document.body).removeClass('resize-animation-stopper');
        }, 400);
    });

    $('.navbar-show-btn').click(function(){
        $('.navbar-box').addClass('navbar-box-show');
    });

    $('.navbar-hide-btn').click(function(){
        $('.navbar-box').removeClass("navbar-box-show");
    })
});
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const doctor = document.getElementById('doctor').value;

    // Here you can process the data as needed (e.g., send it to a server)

    // Display confirmation message
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block'; // Show the confirmation message

    // Optionally, you can clear the form fields
    document.getElementById('booking-form').reset();
});

document.getElementById('add-entry').addEventListener('click', function() {
    // Get the input values
    const sleepHours = document.getElementById('sleep-hours').value;
    const stepsWalked = document.getElementById('steps-walked').value;
    const waterIntake = document.getElementById('water-intake').value;

    // Here you can process the data as needed (e.g., send it to a server)

    // Display confirmation message
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'confirmation-message';
    confirmationMessage.innerHTML = `<p>Your health metrics have been recorded successfully!</p>
                                      <p>Sleep Hours: ${sleepHours}</p>
                                      <p>Steps Walked: ${stepsWalked}</p>
                                      <p>Water Intake: ${waterIntake} liters</p>`;
    
    // Append the confirmation message to the form
    document.getElementById('health-tracker-form').appendChild(confirmationMessage);

    // Optionally, you can clear the form fields
    document.getElementById('health-tracker-form').reset();
});