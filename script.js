// Firebase configuration (ඔබේ Config එක)
const firebaseConfig = {
  apiKey: "AIzaSyAPvqWA2NH5sfO-_jK6rHa74tL69yBdYC0",
  authDomain: "ashanai-143d0.firebaseapp.com",
  projectId: "ashanai-143d0",
  storageBucket: "ashanai-143d0.firebasestorage.app",
  messagingSenderId: "90717323152",
  appId: "1:90717323152:web:3c46635dd1898c374bbd15",
  measurementId: "G-9NVSZCQ2RM"
};

// ඔබ ලබාදුන් Google AI Studio API Key එක
const GEMINI_API_KEY = "AIzaSyAS_OC5iZUQCcSyCZvElCW0ejLpTtvXF2g"; 

async function askAI() {
    const inputField = document.getElementById("userInput");
    const display = document.getElementById("response");
    const text = inputField.value;

    if (!text) {
        alert("කරුණාකර යමක් ලියන්න!");
        return;
    }

    display.innerText = "සිතමින් පවතී... 🤖";

    try {
        // Gemini API එකට දත්ත යැවීම
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        
        // API එකෙන් ලැබෙන පිළිතුර ප්‍රදර්ශනය කිරීම
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            display.innerText = aiResponse;
        } else {
            display.innerText = "පිළිතුරක් ලබා ගැනීමට නොහැකි විය.";
        }
        
    } catch (error) {
        display.innerText = "දෝෂයක් සිදු විය. ඔබේ අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කර නැවත උත්සාහ කරන්න.";
        console.error("Error:", error);
    }
}

// Button එක Click කරන එක හඳුනා ගැනීමට Event Listener එකක් එක් කිරීම
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("sendBtn");
    if (btn) {
        btn.addEventListener("click", askAI);
    }
});

