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

// Event listener for medical history form submission
document.getElementById('get-suggestions').addEventListener('click', function() {
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const medicalHistory = document.getElementById('medical-history').value.toLowerCase();

    let suggestions = [];

    // Example BMI calculation
    const bmi = (weight / (height * height)) * 703; // BMI calculation in pounds/feet

    // Adding general suggestions based on BMI
    if (bmi < 18.5) {
        suggestions.push(`Your BMI is ${bmi.toFixed(1)}. You are underweight. Consider a nutritious, calorie-dense diet.`);
    } else if (bmi >= 18.5 && bmi < 24.9) {
        suggestions.push(`Your BMI is ${bmi.toFixed(1)}. You have a healthy weight. Maintain a balanced diet and regular exercise.`);
    } else if (bmi >= 25 && bmi < 29.9) {
        suggestions.push(`Your BMI is ${bmi.toFixed(1)}. You are overweight. Consider a calorie-controlled diet and regular physical activity.`);
    } else if (bmi >= 30) {
        suggestions.push(`Your BMI is ${bmi.toFixed(1)}. You are in the obese range. Consult a healthcare provider for guidance on weight management.`);
    }

    // Suggestions based on age
    if (age > 65) {
        suggestions.push("For seniors: Focus on nutrient-dense foods, maintain hydration, and consider calcium and vitamin D supplements.");
    } else if (age >= 18 && age <= 65) {
        suggestions.push("For adults: Maintain a balanced diet, manage stress, and engage in regular exercise.");
    } else if (age < 18) {
        suggestions.push("For children and teens: Ensure balanced nutrition with sufficient protein, calcium, and vitamins for growth.");
    }

    // Suggestions based on medical history
    if (medicalHistory.includes("diabetes")) {
        suggestions.push("For diabetes: Follow a low-carb, high-fiber diet, avoid sugary foods, and monitor blood sugar regularly.");
    }
    if (medicalHistory.includes("hypertension") || medicalHistory.includes("high blood pressure")) {
        suggestions.push("For hypertension: Limit salt intake, increase potassium-rich foods, and engage in regular aerobic exercise.");
    }
    if (medicalHistory.includes("cholesterol")) {
        suggestions.push("For high cholesterol: Avoid trans fats, consume omega-3-rich foods, and engage in physical activity.");
    }
    if (medicalHistory.includes("heart disease")) {
        suggestions.push("For heart health: Focus on a diet rich in fruits, vegetables, lean proteins, and whole grains.");
    }
    if (medicalHistory.includes("asthma")) {
        suggestions.push("For asthma: Avoid triggers, maintain a healthy weight, and consider respiratory exercises.");
    }

    // Display the suggestions
    const suggestionsDiv = document.getElementById('suggestions');
    if (suggestions.length > 0) {
        suggestionsDiv.innerHTML = suggestions.map(suggestion => `<p>${suggestion}</p>`).join("");
    } else {
        suggestionsDiv.innerHTML = "<p>No specific suggestions. Please enter valid details.</p>";
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // Toggle display for each disease item
    const diseaseToggles = document.querySelectorAll('.disease-toggle');
    
    diseaseToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the associated .disease-info div
            const info = this.nextElementSibling;
            
            // Toggle the display of the info section
            if (info.style.display === "none" || info.style.display === "") {
                info.style.display = "block";
            } else {
                info.style.display = "none";
            }
        });
    });

    
    
    // Toggle display for the contact details section when the button is clicked
    const showContactsButton = document.getElementById("show-contacts");
    const contactDetails = document.getElementById("contact-details");

    showContactsButton.addEventListener("click", function() {
        if (contactDetails.style.display === "none" || contactDetails.style.display === "") {
            contactDetails.style.display = "block";
            showContactsButton.textContent = "Hide Contact Details";
        } else {
            contactDetails.style.display = "none";
            showContactsButton.textContent = "Show Contact Details";
        }
    });
});

function toggleHotlineInfo(id) {
    const info = document.getElementById(id);
    info.style.display = (info.style.display === "none" || info.style.display === "") ? "block" : "none";
}


document.addEventListener("DOMContentLoaded", function () {
    const healthForm = document.getElementById("health-tracker-form");
    const healthLog = document.getElementById("health-log").getElementsByTagName("tbody")[0];
    const addEntryButton = document.getElementById("add-entry");

    // Load stored data if available
    const storedData = JSON.parse(localStorage.getItem("healthData")) || [];
    storedData.forEach(entry => addTableRow(entry));

    // Add event listener to the "Add Entry" button
    addEntryButton.addEventListener("click", function () {
        const sleepHours = document.getElementById("sleep-hours").value;
        const stepsWalked = document.getElementById("steps-walked").value;
        const waterIntake = document.getElementById("water-intake").value;

        if (sleepHours && stepsWalked && waterIntake) {
            const entry = {
                date: new Date().toLocaleDateString(),
                sleepHours: sleepHours,
                stepsWalked: stepsWalked,
                waterIntake: waterIntake
            };

            addTableRow(entry);
            saveData(entry);

            // Reset form inputs
            healthForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Function to add a row to the table
    function addTableRow(entry) {
        const row = healthLog.insertRow();
        row.insertCell(0).textContent = entry.date;
        row.insertCell(1).textContent = entry.sleepHours;
        row.insertCell(2).textContent = entry.stepsWalked;
        row.insertCell(3).textContent = entry.waterIntake;
    }

    // Function to save data to local storage
    function saveData(entry) {
        storedData.push(entry);
        localStorage.setItem("healthData", JSON.stringify(storedData));
    }
});

document.getElementById('get-advice').addEventListener('click', function() {
    const age = parseInt(document.getElementById('age-input').value);
    const recommendationsDiv = document.getElementById('recommendations');
    let recommendations = "";

    if (age >= 1 && age <= 12) {
        recommendations = `
            <p><strong>Recommended Steps:</strong> 8,000 - 10,000 steps per day</p>
            <p><strong>Water Intake:</strong> 1 - 1.5 liters per day</p>
            <p><strong>Sleep:</strong> 9 - 12 hours per night</p>
        `;
    } else if (age >= 13 && age <= 18) {
        recommendations = `
            <p><strong>Recommended Steps:</strong> 10,000 - 12,000 steps per day</p>
            <p><strong>Water Intake:</strong> 1.5 - 2 liters per day</p>
            <p><strong>Sleep:</strong> 8 - 10 hours per night</p>
        `;
    } else if (age >= 19 && age <= 64) {
        recommendations = `
            <p><strong>Recommended Steps:</strong> 7,000 - 10,000 steps per day</p>
            <p><strong>Water Intake:</strong> 2 - 3 liters per day</p>
            <p><strong>Sleep:</strong> 7 - 9 hours per night</p>
        `;
    } else if (age >= 65) {
        recommendations = `
            <p><strong>Recommended Steps:</strong> 6,000 - 8,000 steps per day</p>
            <p><strong>Water Intake:</strong> 1.5 - 2 liters per day</p>
            <p><strong>Sleep:</strong> 7 - 8 hours per night</p>
        `;
    } else {
        recommendations = "<p>Please enter a valid age.</p>";
    }

    recommendationsDiv.innerHTML = recommendations;
});


