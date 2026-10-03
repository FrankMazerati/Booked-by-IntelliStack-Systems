document.addEventListener('DOMContentLoaded', () => {
    // --- Vibe Chat Logic ---
    const vibeChatBtn = document.getElementById('vibeChatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Open Chat
    if (vibeChatBtn) {
        vibeChatBtn.addEventListener('click', () => {
            chatModal.classList.add('active');
            chatInput.focus();
        });
    }

    // Close Chat
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }

    // Close when clicking outside
    chatModal.addEventListener('click', (e) => {
        if (e.target === chatModal) chatModal.classList.remove('active');
    });

    // Send Message
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        // 1. Add User Message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.classList.add('message', 'user-message');
        userMsgDiv.innerText = text;
        chatMessages.appendChild(userMsgDiv);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 2. Simulate AI Thinking & Response
        setTimeout(() => {
            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.classList.add('message', 'ai-message');
            
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('book') || lowerText.includes('appointment')) {
                aiMsgDiv.innerText = "I can help with that! Which service would you like to book? We have Haircuts, Nails, Fitness, and more.";
            } else if (lowerText.includes('haircut') || lowerText.includes('barber')) {
                aiMsgDiv.innerText = "Great choice! I've found The Cut Barbershop (4.8 ⭐) available tomorrow at 10:00 AM. Would you like me to confirm this booking?";
            } else if (lowerText.includes('nail') || lowerText.includes('manicure')) {
                aiMsgDiv.innerText = "Nails by Luxe has a Gel Manicure available this Saturday at 2:00 PM for $40. Should I book it?";
            } else if (lowerText.includes('yes') || lowerText.includes('confirm')) {
                aiMsgDiv.innerText = "🎉 Booking Confirmed! You'll receive a QR code to present at your appointment. Is there anything else I can help you with?";
            } else if (lowerText.includes('show') || lowerText.includes('my appointments')) {
                aiMsgDiv.innerText = "You have 2 upcoming appointments:\n1. The Cut Barbershop - Sat, Apr 26 at 10:00 AM\n2. Nails by Luxe - Sun, Apr 27 at 2:00 PM";
            } else if (lowerText.includes('deals') || lowerText.includes('offer')) {
                aiMsgDiv.innerText = "There are 3 Flash Deals active right now! Check the Home page for discounts up to 50% off at local Chicago businesses.";
            } else {
                aiMsgDiv.innerText = "I'm not sure I understand. Try asking me to 'book a haircut', 'show my appointments', or 'find deals'.";
            }

            chatMessages.appendChild(aiMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000); // 1 second delay to simulate thinking
    }

    if (sendChatBtn) sendChatBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
