let isSpeaking = false;

// Function to make the bot speak
function speak(text) {
    if (!isSpeaking) {
        isSpeaking = true;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = function() {
            isSpeaking = false;
        };
        speechSynthesis.speak(utterance);
    }
}

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const videoElement = document.getElementById('videoElement');
        videoElement.srcObject = stream;
        videoElement.play();
    })
    .catch(error => {
        console.error('Error accessing webcam:', error);
    });

// Initialize speech recognition
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    document.getElementById('output').innerHTML += `<p>You said: ${transcript}</p>`;
    
    // Add code here to send the transcript to your AI model and get a response
    // For now, we'll just make the bot echo back what you said
    speak(transcript);
};

// Start speech recognition
document.querySelector('#start-btn').addEventListener('click', () => {
    recognition.start();
});
