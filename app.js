document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // BOOKED APP.JS
    // Authentication + Profile + Vibe Chat +
    // Saved Items + Home/Search Navigation
    // ==========================================


    // ==========================================
    // 1. AUTHENTICATION & USER MANAGEMENT
    // ==========================================

    // --- SIGNUP LOGIC ---
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('signupName')?.value.trim();
            const email = document.getElementById('signupEmail')?.value.trim();
            const phone = document.getElementById('signupPhone')?.value.trim();

            const selectedType =
                document.querySelector('input[name="userType"]:checked');

            const type = selectedType
                ? selectedType.value
                : 'customer';

            if (!name || !email) {
                alert('Please enter your name and email.');
                return;
            }

            const newUser = {
                name: name,
                email: email,
                phone: phone || '',
                points: 0,
                avatar: 'profile.photo.png',
                type: type,
                bookings: [],
                saved: []
            };

            localStorage.setItem(
                'bookedUser',
                JSON.stringify(newUser)
            );

            alert('Account created successfully!');

            window.location.href = 'profile.html';
        });
    }


    // ==========================================
    // LOGIN LOGIC
    // ==========================================

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {

        loginForm.addEventListener('submit', (e) => {

            e.preventDefault();

            const email =
                document.getElementById('loginEmail')?.value.trim();

            const savedUser =
                localStorage.getItem('bookedUser');

            if (!email) {
                alert('Please enter your email.');
                return;
            }

            if (savedUser) {

                try {

                    const user = JSON.parse(savedUser);

                    if (user.email === email) {

                        window.location.href = 'profile.html';

                    } else {

                        alert(
                            'Email not found. Please sign up first.'
                        );

                    }

                } catch (error) {

                    console.error(
                        'Unable to read saved user:',
                        error
                    );

                    alert(
                        'Your saved account data is invalid. Please sign up again.'
                    );
                }

            } else {

                alert(
                    'No account found. Please sign up first.'
                );

            }

        });
    }


    // ==========================================
    // PROFILE PAGE LOGIC
    // ==========================================

    const profileName =
        document.getElementById('profileName');

    const profilePoints =
        document.getElementById('profilePoints');

    const profileAvatar =
        document.getElementById('profileAvatar');

    const avatarUpload =
        document.getElementById('avatarUpload');


    if (profileName) {

        const savedUser =
            localStorage.getItem('bookedUser');

        if (savedUser) {

            try {

                const user =
                    JSON.parse(savedUser);

                profileName.innerText =
                    user.name || 'Diamond Carter';

                profilePoints.innerText =
                    `${user.points || 0} pts`;

                if (profileAvatar && user.avatar) {
                    profileAvatar.src = user.avatar;
                }

            } catch (error) {

                console.error(
                    'Unable to load profile:',
                    error
                );

                window.location.href = 'login.html';
            }

        } else {

            window.location.href = 'login.html';

        }
    }


    // ==========================================
    // PROFILE PHOTO UPLOAD
    // ==========================================

    if (avatarUpload) {

        avatarUpload.addEventListener(
            'change',
            (e) => {

                const file =
                    e.target.files?.[0];

                if (!file) return;

                if (!file.type.startsWith('image/')) {

                    alert(
                        'Please choose an image file.'
                    );

                    return;
                }

                const reader =
                    new FileReader();

                reader.onload =
                    (event) => {

                        const base64Image =
                            event.target.result;

                        if (profileAvatar) {
                            profileAvatar.src =
                                base64Image;
                        }

                        const savedUser =
                            localStorage.getItem(
                                'bookedUser'
                            );

                        if (savedUser) {

                            try {

                                const user =
                                    JSON.parse(
                                        savedUser
                                    );

                                user.avatar =
                                    base64Image;

                                localStorage.setItem(
                                    'bookedUser',
                                    JSON.stringify(user)
                                );

                            } catch (error) {

                                console.error(
                                    'Unable to save avatar:',
                                    error
                                );

                            }
                        }
                    };

                reader.readAsDataURL(file);
            }
        );
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    const logoutBtn =
        document.getElementById('logoutBtn');

    if (logoutBtn) {

        logoutBtn.addEventListener(
            'click',
            () => {

                localStorage.removeItem(
                    'bookedUser'
                );

                window.location.href =
                    'login.html';

            }
        );
    }


    // ==========================================
    // 2. VIBE CHAT
    // ==========================================

    const vibeChatBtn =
        document.getElementById('vibeChatBtn');

    const chatModal =
        document.getElementById('chatModal');

    const closeChatBtn =
        document.getElementById('closeChatBtn');

    const sendChatBtn =
        document.getElementById('sendChatBtn');

    const chatInput =
        document.getElementById('chatInput');

    const chatMessages =
        document.getElementById('chatMessages');


    // OPEN CHAT
    if (vibeChatBtn && chatModal) {

        vibeChatBtn.addEventListener(
            'click',
            () => {

                chatModal.classList.add(
                    'active'
                );

                if (chatInput) {

                    setTimeout(
                        () => chatInput.focus(),
                        100
                    );

                }
            }
        );
    }


    // CLOSE CHAT
    if (closeChatBtn && chatModal) {

        closeChatBtn.addEventListener(
            'click',
            () => {

                chatModal.classList.remove(
                    'active'
                );

            }
        );
    }


    // CLOSE CHAT WHEN CLICKING OUTSIDE
    if (chatModal) {

        chatModal.addEventListener(
            'click',
            (e) => {

                if (e.target === chatModal) {

                    chatModal.classList.remove(
                        'active'
                    );

                }

            }
        );
    }


    // SEND CHAT MESSAGE
    function sendMessage() {

        if (!chatInput || !chatMessages) {
            return;
        }

        const text =
            chatInput.value.trim();

        if (!text) {
            return;
        }


        // USER MESSAGE
        const userMsgDiv =
            document.createElement('div');

        userMsgDiv.classList.add(
            'message',
            'user-message'
        );

        userMsgDiv.innerText =
            text;

        chatMessages.appendChild(
            userMsgDiv
        );

        chatInput.value = '';

        chatMessages.scrollTop =
            chatMessages.scrollHeight;


        // DEMO AI RESPONSE
        setTimeout(
            () => {

                const aiMsgDiv =
                    document.createElement('div');

                aiMsgDiv.classList.add(
                    'message',
                    'ai-message'
                );

                const lowerText =
                    text.toLowerCase();


                // BOOKING
                if (
                    lowerText.includes('book') ||
                    lowerText.includes('appointment')
                ) {

                    aiMsgDiv.innerText =
                        "I can help with that! Which service would you like to book? We have Haircuts, Nails, Fitness, and more.";

                }


                // BARBER
                else if (
                    lowerText.includes('haircut') ||
                    lowerText.includes('barber')
                ) {

                    aiMsgDiv.innerText =
                        "Great choice! I've found The Cut Barbershop (4.8 ⭐) available tomorrow at 10:00 AM. Would you like me to confirm this booking?";

                }


                // NAILS
                else if (
                    lowerText.includes('nail') ||
                    lowerText.includes('manicure')
                ) {

                    aiMsgDiv.innerText =
                        "Nails by Luxe has a Gel Manicure available this Saturday at 2:00 PM for $40. Should I book it?";

                }


                // CONFIRM
                else if (
                    lowerText.includes('yes') ||
                    lowerText.includes('confirm')
                ) {

                    aiMsgDiv.innerText =
                        "🎉 Booking Confirmed! You'll receive a QR code to present at your appointment. Is there anything else I can help you with?";

                }


                // APPOINTMENTS
                else if (
                    lowerText.includes('show') ||
                    lowerText.includes(
                        'my appointments'
                    )
                ) {

                    aiMsgDiv.innerText =
                        "You have 2 upcoming appointments:\n1. The Cut Barbershop - Sat, Apr 26 at 10:00 AM\n2. Nails by Luxe - Sun, Apr 27 at 2:00 PM";

                }


                // DEALS
                else if (
                    lowerText.includes('deals') ||
                    lowerText.includes('offer')
                ) {

                    aiMsgDiv.innerText =
                        "There are 3 Flash Deals active right now! Check the Home page for discounts up to 50% off at local businesses.";

                }


                // DEFAULT
                else {

                    aiMsgDiv.innerText =
                        "I'm not sure I understand. Try asking me to 'book a haircut', 'show my appointments', or 'find deals'.";

                }


                chatMessages.appendChild(
                    aiMsgDiv
                );

                chatMessages.scrollTop =
                    chatMessages.scrollHeight;

            },
            1000
        );
    }


    if (sendChatBtn) {

        sendChatBtn.addEventListener(
            'click',
            sendMessage
        );

    }


    if (chatInput) {

        chatInput.addEventListener(
            'keypress',
            (e) => {

                if (e.key === 'Enter') {

                    e.preventDefault();

                    sendMessage();

                }

            }
        );
    }


    // ==========================================
    // 3. HEART / SAVE BUTTONS
    // ==========================================

    const heartButtons =
        document.querySelectorAll(
            '.heart-btn'
        );


    heartButtons.forEach(
        (btn) => {

            btn.addEventListener(
                'click',
                (e) => {

                    e.preventDefault();
                    e.stopPropagation();

                    const isSaved =
                        btn.innerHTML.trim() === '♥';


                    if (!isSaved) {

                        btn.innerHTML = '♥';

                        btn.style.color =
                            '#d946ef';

                        btn.setAttribute(
                            'aria-label',
                            'Remove from saved'
                        );

                    } else {

                        btn.innerHTML = '♡';

                        btn.style.color =
                            'white';

                        btn.setAttribute(
                            'aria-label',
                            'Save'
                        );

                    }

                }
            );

        }
    );


    // ==========================================
    // 4. BOOKED SEARCH
    // ==========================================

    const searchInput =
        document.querySelector(
            '.search-toolbar input, #searchInput'
        );

    const searchButton =
        document.querySelector(
            '.search-toolbar button, #searchButton'
        );


    function performSearch() {

        if (!searchInput) {
            return;
        }

        const query =
            searchInput.value.trim();

        if (!query) {

            searchInput.focus();

            return;
        }


        // Save search
        localStorage.set
