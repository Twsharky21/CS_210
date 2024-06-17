document.addEventListener('DOMContentLoaded', function() {
    let isMoved = false;

    // Check if the page was refreshed
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        sessionStorage.removeItem('hasSeenAnimation');
    }

    function moveImages() {
        if (!isMoved) {
            document.querySelector('.left-forest-container').style.transform = 'translateX(-100vw)';
            document.querySelector('.right-forest-container').style.transform = 'translateX(100vw)';
            isMoved = true;

            // Hide the sliding forest containers after the transition
            setTimeout(() => {
                document.querySelector('.left-forest-container').style.display = 'none';
                document.querySelector('.right-forest-container').style.display = 'none';
                // Set a flag in sessionStorage to indicate the user has seen the animation
                sessionStorage.setItem('hasSeenAnimation', 'true');
            }, 1000); // Match this duration to your CSS transition duration
        }
    }

    // Check if the user has already seen the animation
    if (!sessionStorage.getItem('hasSeenAnimation')) {
        window.addEventListener('wheel', function(event) {
            if (event.deltaY > 0) { // Only respond to scroll down
                moveImages();
            }
        });

        window.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowDown') {
                moveImages();
            }
        });
    } else {
        // Hide the sliding forest containers if the user has already seen the animation
        document.querySelector('.left-forest-container').style.display = 'none';
        document.querySelector('.right-forest-container').style.display = 'none';
    }
});
