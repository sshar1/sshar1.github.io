document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('.project');
    const popups = document.querySelectorAll('.modal');
    const backdrop = document.getElementById('backdrop');
    const closeButtons = document.querySelectorAll('.close-button');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const popupId = trigger.getAttribute("popup");
            const popup = document.getElementById(popupId);

            popup.style.display = 'block';
            backdrop.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
    
            setTimeout(() => {
                popup.classList.add('active');
                backdrop.classList.add('active');
            }, 10);    
        });
    })

    // Close modal functions
    const closeModal = () => {
        popups.forEach(p => p.classList.remove("active"))
        backdrop.classList.remove('active');
        // Wait for animation to finish before hiding
        setTimeout(() => {
            popups.forEach(p => p.style.display = "none")
            backdrop.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };

    // Close when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });    

    // Close when clicking backdrop
    backdrop.addEventListener('click', closeModal);

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Prevent closing when clicking inside modal
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    })
});
