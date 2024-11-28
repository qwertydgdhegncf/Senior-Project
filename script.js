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


function searchEducation() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const educationItems = document.querySelectorAll('.education-item');
    let resultsFound = false;
    const displayedDiseases = new Set(); // Set to track displayed diseases

    // Hide all items first
    educationItems.forEach(item => {
        item.style.display = 'none'; // Start by hiding all items
    });

    educationItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords');

        // Check if the keywords match the search term
        if (keywords.toLowerCase().includes(searchTerm)) {
            const diseaseName = item.querySelector('h3').textContent;

            // Only display the item if it hasn't been displayed yet
            if (!displayedDiseases.has(diseaseName)) {
                item.style.display = 'block'; // Show the item
                displayedDiseases.add(diseaseName); // Add to the set of displayed diseases
                resultsFound = true;
            }
        }
    });

    // Show or hide the education info section based on whether results were found
    document.getElementById('education-info').style.display = resultsFound ? 'block' : 'none';
}

function generateSuggestions() {
    // Get selected gender
    const gender = document.getElementById('gender').value;

    // Ensure gender is selected
    if (!gender) {
        document.getElementById('suggestions').innerText = "Please select a gender.";
        return;
    }

    // Get input values
    const age = parseInt(document.getElementById('age').value) || 0;
    const height = document.getElementById('height').value.trim();
    const weight = parseInt(document.getElementById('weight').value) || 0;

    // Parse height
    const heightMatch = height.match(/^(\d+)'(\d+)"$/);
    if (!heightMatch) {
        document.getElementById('suggestion-text').innerText = "Please provide a valid height in the format 5'8\".";
        return;
    }
    const heightFeet = parseInt(heightMatch[1]);
    const heightInches = parseInt(heightMatch[2]);

    // Ensure age, height, and weight are entered
    if (!age || !heightFeet || !heightInches || !weight) {
        document.getElementById('suggestions').innerText = "Please provide valid age, height, and weight.";
        return;
    }

    const BMIHeightInInches = (heightFeet * 12) + heightInches;
    const finalBMI = (weight / (BMIHeightInInches * BMIHeightInInches)) * 703;

    // Get medical history checkboxes
    const medicalHistory = {
        alcoholDrugAbuse: document.getElementById('alcoholDrugAbuse').checked,
        asthma: document.getElementById('asthma').checked,
        cancer: document.getElementById('cancer').checked,
        diabetes: document.getElementById('diabetes').checked,
        heartDisease: document.getElementById('heartDisease').checked,
        highBloodPressure: document.getElementById('highBloodPressure').checked,
        highCholesterol: document.getElementById('highCholesterol').checked,
        thyroidDisease: document.getElementById('thyroidDisease').checked,
        migraineHeadaches: document.getElementById('migraineHeadaches').checked,
        stroke: document.getElementById('stroke').checked
    };

    let suggestions = "";

    // Generate suggestions based on gender and age
    if (gender === 'female') {
        //suggestions += "Female Suggestions:\n";

        if (age >= 50) {
            suggestions += "- Consider calcium and vitamin D supplements to support bone health.\n";
        }
        if (weight > 150) {
            suggestions += "- Maintain a balanced diet with lean proteins and complex carbs.\n";
        }

        // BMI-related
        if (finalBMI < 18.5) {
            suggestions += "- You are underweight. Increase calorie intake with nutrient-dense foods.\n";
        } else if (finalBMI >= 18.5 && finalBMI <= 24.9) {
            suggestions += "- Maintain a balanced diet with healthy proteins and complex carbs.\n";
        } else if (finalBMI >= 25) {
            suggestions += "- You are overweight. Focus on portion control and include more fruits and vegetables in your diet.\n";
        }

        if (medicalHistory.alcoholDrugAbuse) {
            suggestions += "- Seek support groups and counseling for substance use.\n";
        }
        if (medicalHistory.asthma) {
            suggestions += "- Avoid allergens and consider breathing exercises.\n";
        }
        if (medicalHistory.cancer) {
            suggestions += "- Prioritize nutrient-dense foods; consult with an oncologist for personalized dietary advice.\n";
        }
        if (medicalHistory.diabetes) {
            suggestions += "- Monitor blood sugar levels and avoid sugary foods.\n";
        }
        if (medicalHistory.heartDisease) {
            suggestions += "- Follow a heart-healthy diet, including omega-3 fatty acids and fiber-rich foods.\n";
        }
        if (medicalHistory.highBloodPressure) {
            suggestions += "- Reduce sodium intake and avoid processed foods.\n";
        }
        if (medicalHistory.highCholesterol) {
            suggestions += "- Increase fiber intake and avoid saturated fats.\n";
        }
        if (medicalHistory.thyroidDisease) {
            suggestions += "- Ensure adequate iodine intake and avoid highly processed foods.\n";
        }
        if (medicalHistory.migraineHeadaches) {
            suggestions += "- Avoid known migraine triggers like caffeine, and maintain a regular sleep schedule.\n";
        }
        if (medicalHistory.stroke) {
            suggestions += "- Focus on low-fat, high-fiber foods and maintain a healthy weight.\n";
        }

    } else if (gender === 'male') {
        //suggestions += "Male Suggestions:\n";

        if (age >= 50) {
            suggestions += "- Increase calcium intake for bone health and consider regular screenings for prostate health.\n";
        }
        if (weight > 180) {
            suggestions += "- Consider a balanced, portion-controlled diet rich in lean proteins and low in simple sugars.\n";
        }

        // BMI-related
        if (finalBMI < 18.5) {
            suggestions += "- You are underweight. Increase calorie intake with nutrient-dense foods.\n";
        } else if (finalBMI >= 18.5 && finalBMI <= 24.9) {
            suggestions += "- Maintain a balanced diet with healthy proteins and complex carbs.\n";
        } else if (finalBMI >= 25) {
            suggestions += "- You are overweight. Focus on portion control and include more fruits and vegetables in your diet.\n";
        }

        if (medicalHistory.alcoholDrugAbuse) {
            suggestions += "- Seek support groups and counseling to manage substance use.\n";
        }
        if (medicalHistory.asthma) {
            suggestions += "- Avoid allergens, maintain a healthy weight, and consider breathing exercises.\n";
        }
        if (medicalHistory.cancer) {
            suggestions += "- Consult with healthcare professionals for dietary adjustments to maintain strength and immunity.\n";
        }
        if (medicalHistory.diabetes) {
            suggestions += "- Regularly monitor blood glucose and avoid high-glycemic-index foods.\n";
        }
        if (medicalHistory.heartDisease) {
            suggestions += "- Focus on a heart-healthy diet with low saturated fat and high omega-3 intake.\n";
        }
        if (medicalHistory.highBloodPressure) {
            suggestions += "- Reduce salt intake, avoid alcohol, and focus on potassium-rich foods.\n";
        }
        if (medicalHistory.highCholesterol) {
            suggestions += "- Increase dietary fiber and incorporate more plant-based proteins.\n";
        }
        if (medicalHistory.thyroidDisease) {
            suggestions += "- Avoid excessive soy products and consume iodine-rich foods.\n";
        }
        if (medicalHistory.migraineHeadaches) {
            suggestions += "- Maintain hydration, avoid known triggers, and get adequate sleep.\n";
        }
        if (medicalHistory.stroke) {
            suggestions += "- Prioritize low-fat, high-fiber foods, and stay active with moderate exercise.\n";
        }
    }

    // Show the suggestions or a message if nothing is selected
    if (!suggestions) {
        document.getElementById('suggestions').innerText = "Please provide more information to generate suggestions.";
    } else {
        document.getElementById('suggestions').innerText = suggestions;
    }
}


// Function to open a new tab for a specific section
function openTab(section) {
    // Define the mapping of sections to their corresponding pages
    const sectionPages = {
        home: "home.html",
        about: "about.html",
        services: "services.html",
        education: "education.html",
        contact: "contact.html"
    };

    // Check if the section exists in the mapping
    if (sectionPages[section]) {
        // Open the corresponding page in a new browser tab
        window.open(sectionPages[section], "_blank");
    } else {
        console.error("Section not found: " + section);
    }
}
