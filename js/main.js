document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // Scroll Animation Logic for logos (one by one fade-in)
    const logos = document.querySelectorAll('.skill-list img.hidden');
    const logoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stops observing once it's visible
                }, index * 200); // 200ms delay between each logo fade-in
            }
        });
    }, { threshold: 0.1 });

    logos.forEach(logo => logoObserver.observe(logo));

    // Existing Scroll Animation Logic for other hidden elements
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stops observing once it's visible
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(el => observer.observe(el));

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');

    console.log("Current path:", currentPath);

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        console.log("Link href:", href);

        // Check if the current page is the root and match with the index.html link
        if ((currentPath === '/' || currentPath === '/index.html') && href.includes('index.html')) {
            link.classList.add('active');
        }
        // Check for other pages like resume, projects, and contact
        else if (currentPath.includes(href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Define notification globally so it can be reused
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    document.body.appendChild(notification); // Add the notification to the body

    // Reusable function to show notifications
    function showNotification(message) {
        console.log('Notification triggered: ', message);  // Debug log
        notification.textContent = message;
        notification.classList.add('show');  // Add the 'show' class to make it visible

        setTimeout(() => {
            notification.classList.remove('show');  // Remove the 'show' class to hide it
        }, 3000); // Display for 3 seconds
    }

    // Copy Email to Clipboard in Contact Section (if it exists)
    const emailItem = document.querySelector('.contact-item.email');
    if (emailItem) {
        console.log("Contact email item found");

        emailItem.addEventListener('click', () => {
            console.log("Contact email clicked");
            const email = 'usamah.abdulazeez@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                console.log("Email copied to clipboard");
                showNotification('Email copied to clipboard!');
            }).catch(err => {
                console.error('Error copying email: ', err);
            });
        });
    }

    // Make LinkedIn box clickable in Contact Section
    const linkedInBox = document.querySelector('.contact-item.linkedin');
    if (linkedInBox) {
        console.log("LinkedIn box found");

        linkedInBox.addEventListener('click', () => {
            window.open('https://www.linkedin.com/in/uabdulazeez', '_blank');
        });
    }

    // Copy Email to Clipboard from Sidebar
    const emailLink = document.querySelector('#email-link');
    if (emailLink) {
        console.log("Sidebar email link found");

        emailLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent any default action
            console.log("Sidebar email clicked");

            navigator.clipboard.writeText('usamah.abdulazeez@gmail.com').then(() => {
                console.log("Email copied to clipboard from sidebar");
                showNotification('Email copied to clipboard!');
            }).catch(err => {
                console.error('Error copying email: ', err);
            });
        });
    }

    // Contact form submission with custom notification
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission behavior

            const formData = new FormData(form);
            const action = form.getAttribute('action');

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    form.reset(); // Reset the form after successful submission
                    showNotification('Thank you for your message. I will get back to you shortly!');
                } else {
                    showNotification('Oops! There was a problem submitting your form.');
                }
            }).catch(error => {
                console.error('Error:', error);
                showNotification('Oops! There was a problem submitting your form.');
            });
        });
    }

});
