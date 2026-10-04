document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // VIBE CHAT LOGIC
    // ==========================================
    const vibeChatBtn = document.getElementById('vibeChatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Colorful theme rotation for user messages
    const userBubbleThemes = [
        'bubble-blue',
        'bubble-pink',
        'bubble-purple',
        'bubble-green'
    ];
    let userBubbleIndex = 0;

    // --- Open Chat ---
    if (vibeChatBtn) {
        vibeChatBtn.addEventListener('click', () => {
            chatModal.classList.add('active');
            if (chatInput) chatInput.focus();
        });
    }

    // --- Close Chat ---
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }

    // --- Close Chat when clicking outside ---
    if (chatModal) {
        chatModal.addEventListener('click', (e) => {
            if (e.target === chatModal) chatModal.classList.remove('active');
        });
    }

    // --- Show Typing Indicator ---
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- Remove Typing Indicator ---
    function removeTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) typingDiv.remove();
    }

    // --- Send Message ---
    function sendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        // 1. Add User Message with rotating colorful theme
        const userMsgDiv = document.createElement('div');
        const themeClass = userBubbleThemes[userBubbleIndex % userBubbleThemes.length];
        userMsgDiv.classList.add('message', 'user-message', themeClass);
        userMsgDiv.innerText = text;
        chatMessages.appendChild(userMsgDiv);
        userBubbleIndex++;

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 2. Show typing indicator
        showTypingIndicator();

        // 3. Simulate AI thinking, then respond
        setTimeout(() => {
            removeTypingIndicator();

            const aiMsgDiv = document.createElement('div');
            aiMsgDiv.classList.add('message', 'ai-message');
            const lowerText = text.toLowerCase();

            if (lowerText.includes('book') || lowerText.includes('appointment')) {
                aiMsgDiv.innerHTML = '<strong>I can help with that!</strong><br>Which service would you like to book? We have Haircuts, Nails, Fitness, and more.';
            } else if (lowerText.includes('haircut') || lowerText.includes('barber')) {
                aiMsgDiv.innerHTML = 'Great choice! I found <strong>The Cut Barbershop</strong> (4.8 ⭐) available tomorrow at <strong>10:00 AM</strong>. Would you like me to confirm this booking?';
            } else if (lowerText.includes('nail') || lowerText.includes('manicure')) {
                aiMsgDiv.innerHTML = '<strong>Nails by Luxe</strong> has a Gel Manicure available this <strong>Saturday at 2:00 PM</strong> for <strong>$40</strong>. Should I book it?';
            } else if (lowerText.includes('yes') || lowerText.includes('confirm')) {
                aiMsgDiv.innerHTML = '🎉 <strong>Booking Confirmed!</strong><br>You will receive a QR code to present at your appointment. Is there anything else I can help you with?';
            } else if (lowerText.includes('show') || lowerText.includes('my appointments')) {
                aiMsgDiv.innerHTML = 'You have <strong>2 upcoming appointments:</strong><br>1. The Cut Barbershop — Sat, Apr 26 at 10:00 AM<br>2. Nails by Luxe — Sun, Apr 27 at 2:00 PM';
            } else if (lowerText.includes('deals') || lowerText.includes('offer') || lowerText.includes('flash')) {
                aiMsgDiv.innerHTML = 'There are <strong>3 Flash Deals</strong> active right now! Check the Home page for discounts up to <strong>50% off</strong> at local Chicago businesses.';
            } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
                aiMsgDiv.innerHTML = 'Hey Diamond! 👋 What can I help you with today? You can ask me to <strong>book a haircut</strong>, <strong>show your appointments</strong>, or <strong>find deals</strong>.';
            } else if (lowerText.includes('thanks') || lowerText.includes('thank you')) {
                aiMsgDiv.innerHTML = "You're welcome! ✨ Enjoy your day and let me know if you need anything else.";
            } else {
                aiMsgDiv.innerHTML = "I'm not sure I understand. Try asking me to <strong>'book a haircut'</strong>, <strong>'show my appointments'</strong>, or <strong>'find deals'</strong>.";
            }

            chatMessages.appendChild(aiMsgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1400);
    }

    if (sendChatBtn) sendChatBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // ==========================================
    // AUTHENTICATION & USER MANAGEMENT
    // ==========================================

    // --- SIGNUP ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const type = document.querySelector('input[name="userType"]:checked').value;

            const newUser = {
                name: name, email: email, phone: phone, points: 0,
                avatar: 'profile.photo.png', type: type, bookings: []
            };

            localStorage.setItem('bookedUser', JSON.stringify(newUser));
            alert("Account created successfully!");
            window.location.href = "profile.html";
        });
    }

    // --- LOGIN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const savedUser = localStorage.getItem('bookedUser');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                if (user.email === email) {
                    window.location.href = "profile.html";
                } else {
                    alert("Email not found. Please sign up first.");
                }
            } else {
                alert("No account found. Please sign up first.");
            }
        });
    }

    // --- PROFILE PAGE ---
    const profileName = document.getElementById('profileName');
    const profilePoints = document.getElementById('profilePoints');
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarUpload = document.getElementById('avatarUpload');

    if (profileName) {
        const savedUser = localStorage.getItem('bookedUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            profileName.innerText = user.name;
            profilePoints.innerText = user.points + " pts";
            if (user.avatar) profileAvatar.src = user.avatar;
        } else {
            window.location.href = "login.html";
        }
    }

    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64Image = event.target.result;
                    profileAvatar.src = base64Image;
                    const savedUser = localStorage.getItem('bookedUser');
                    if (savedUser) {
                        const user = JSON.parse(savedUser);
                        user.avatar = base64Image;
                        localStorage.setItem('bookedUser', JSON.stringify(user));
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- LOGOUT ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('bookedUser');
            window.location.href = "login.html";
        });
    }

    // ==========================================
    // HEART / SAVE BUTTONS
    // ==========================================
    const heartButtons = document.querySelectorAll('.heart-btn');
    heartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (btn.innerHTML === '♡') {
                btn.innerHTML = '♥';
                btn.style.color = '#d946ef';
            } else {
                btn.innerHTML = '♡';
                btn.style.color = 'white';
            }
        });
    });
});
