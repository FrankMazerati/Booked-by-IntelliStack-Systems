document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. AUTHENTICATION & USER MANAGEMENT
    // ==========================================

    // --- SIGNUP LOGIC ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const type = document.querySelector('input[name="userType"]:checked').value;

            // Create a fresh user object with 0 points and a default avatar
            const newUser = {
                name: name,
                email: email,
                phone: phone,
                points: 0,
                avatar: 'profile.photo.png', // Default avatar
                type: type,
                bookings: []
            };

            // Save to localStorage
            localStorage.setItem('bookedUser', JSON.stringify(newUser));
            
            alert("Account created successfully!");
            window.location.href = "profile.html"; // Redirect to their fresh profile
        });
    }

    // --- LOGIN LOGIC ---
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

    // --- PROFILE PAGE LOGIC (Load Data & Upload Photo) ---
    const profileName = document.getElementById('profileName');
    const profilePoints = document.getElementById('profilePoints');
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarUpload = document.getElementById('avatarUpload');

    if (profileName) {
        const savedUser = localStorage.getItem('bookedUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            
            // Populate the page with the user's data
            profileName.innerText = user.name;
            profilePoints.innerText = user.points + " pts";
            
            if (user.avatar) {
                profileAvatar.src = user.avatar;
            }
        } else {
            // If no user is logged in, kick them back to login
            window.location.href = "login.html";
        }
    }

    // Handle Photo Upload
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const base64Image = event.target.result;
                    
                    // Update the image on the screen instantly
                    profileAvatar.src = base64Image;
                    
                    // Save the new image to localStorage
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

    // --- LOGOUT LOGIC ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('bookedUser'); 
            window.location.href = "login.html"; 
        });
    }

    // ==========================================
    // 2. INTERACTIVE UI (Vibe Chat & Heart Buttons)
    // ==========================================

    // --- Vibe Chat Logic ---
    const vibeChatBtn = document.getElementById('vibeChatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (vibeChatBtn) {
        vibeChatBtn.addEventListener('click', () => {
            chatModal.classList.add('active');
            chatInput.focus();
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }

    if (chatModal) {
        chatModal.addEventListener('click', (e) => {
            if (e.target === chatModal) chatModal.classList.remove('active');
        });
    }

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
        }, 1000); 
    }

    if (sendChatBtn) sendChatBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // --- Heart / Save Buttons Logic ---
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
