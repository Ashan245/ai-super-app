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
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        
        // මෙතනදී වැරැද්දක් තිබේ නම් එය Alert එකක් ලෙස පෙන්වයි
        if (data.error) {
            alert("Google API Error: " + data.error.message);
            display.innerText = "API එකේ ගැටලුවක්: " + data.error.message;
            return;
        }

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            display.innerText = data.candidates[0].content.parts[0].text;
        } else {
            display.innerText = "පිළිතුරක් ලැබුණේ නැත.";
        }
        
    } catch (error) {
        alert("Network Error: " + error.message);
        display.innerText = "සම්බන්ධතාවයේ දෝෂයක්: " + error.message;
    }
}

// HTML එකේ Button එකේ id="sendBtn" තිබේදැයි සහතික කරගන්න
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("sendBtn");
    if (btn) {
        btn.onclick = askAI; 
    }
});
