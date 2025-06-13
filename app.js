// Konfigurasi - Ganti dengan endpoint AI Agent Anda
const AGENT_API_URL = "https://your-ai-agent.digitalocean.app/api/chat";
const API_KEY = "sk_anda_12345"; // Ganti dengan API key sebenarnya

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');

    // Handle pengiriman pesan
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        // Tampilkan pesan user
        addMessage(message, 'user');
        userInput.value = "";
        
        // Tampilkan indikator typing
        showTypingIndicator();
        
        // Kirim ke AI Agent
        fetchAIResponse(message);
    }

    // Klik tombol kirim
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Fungsi untuk menambahkan pesan ke chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Tampilkan indikator typing
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Sembunyikan indikator typing
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // Fetch response dari AI Agent
    async function fetchAIResponse(userMessage) {
        try {
            const response = await fetch(AGENT_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    message: userMessage,
                    context: "Aplikasi Web Chat"
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            hideTypingIndicator();
            addMessage(data.response, 'bot');
            
        } catch (error) {
            hideTypingIndicator();
            addMessage("Maaf, terjadi kesalahan saat menghubungi AI Agent.", 'bot');
            console.error("Error:", error);
        }
    }
});
