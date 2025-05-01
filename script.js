
    //fecthing the movie list from the csv file
    function fetchMovieList() {
        return fetch('MovieDuel_List.csv')
            .then(response => response.text())
            .then(text => {
                const rows = text.split("\n").map(row => row.split(",").map(item => item.trim()));
                const matrix = rows.slice(1); // Remove header row
                const numberOfRows = matrix.length;
                return { matrix, numberOfRows };
            })
            .catch(error => console.error("Error loading CSV:", error));
    }

    //====================================================================================================

    // Populate the carousel
    function populateCarousel(carousel, themes) {
        // Wipes all content (faster than innerHTML)
        carousel.textContent = "";
        
        // Add new spans
        themes.forEach(theme => {
            const span = document.createElement("span");
            span.textContent = theme;
            carousel.appendChild(span);
        });
    }

    // Rotate words dynamically
    function rotateThemes(carousel) {
        const firstTheme = carousel.firstElementChild;
    
        // Slide out the first word smoothly
        firstTheme.style.transition = "transform ease-out";
        firstTheme.style.transform = "translateX(-100%)";
    
       
            // Move first word to the end and reset position
            carousel.appendChild(firstTheme);
            firstTheme.style.transition = "none";
            firstTheme.style.transform = "translateX(0)";
       
    }

    //====================================================================================================

    // Draw Animation
    function drawAnimation(carousel, themes) {
        
        // Reset carousel to ALL themes (required for animation)
        populateCarousel(carousel, themes); 
        rotationInterval = setInterval(()=>rotateThemes(carousel), 50); // Fast spin
    }

    function displayTheme(carousel, theme, index) {
        const HTMLString = `${index}: ${theme}<br>`;
        carousel.innerHTML = HTMLString;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function drawMovie(carousel, themes, numberOfRows) {
        const randomIndex = generateRandomNumber(numberOfRows);
        const randomTheme = themes[randomIndex];
        displayTheme(carousel, randomTheme, randomIndex);
        return randomIndex, randomTheme;
    }

    function showAcceptbtn(acceptButton) {
        acceptButton.style.display = "block";
    }

    //====================================================================================================
    
    
    fetchMovieList().then(({ matrix, numberOfRows }) => {
        const themes = matrix.map(row => row[0]);
        
        const containerDraw = document.querySelector(".container_draw");
        
        const carousel = document.querySelector(".carousel");
        const acceptButton = document.getElementById("accept_button");
        const drawButton = document.getElementById("draw_button");

        
        // Populate carousel
        populateCarousel(carousel,themes);
        setInterval(() => rotateThemes(carousel), 500);
        let randomIndex, randomTheme;

        
        
        // Event listener for the draw button
        drawButton.addEventListener("click", () => {
            drawAnimation(carousel,themes); // Start animation immediately
        
            setTimeout(() => {
                randomIndex, randomTheme=drawMovie(carousel,themes, numberOfRows); 
                showAcceptbtn(acceptButton); 
            }, 2000);
        });
       
        // Event listener for the accept button
        document.addEventListener("click", () => {
            if (acceptButton) {
                acceptButton.addEventListener("click", () => {
                    carousel.innerHTML = `You have selected: ${randomTheme}`;


                });
            }
        });
    });
    

    
    
    
    
    