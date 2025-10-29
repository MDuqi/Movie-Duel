
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
        return [randomIndex, randomTheme];
    }

    function showAcceptbtn(acceptButton) {
        acceptButton.style.display = "block";
    }

    // Show title and poster of the selected movies
    function showMovieDetails(movieData, divMovie) {
        const movieTitle = movieData;
        divMovie.querySelector("H3").textContent = movieTitle;
    }

    //====================================================================================================
    
    
    fetchMovieList().then(({ matrix, numberOfRows }) => {
        const themes = matrix.map(row => row[0]);
        const movies1 = matrix.map(row => row[1]);
        const movies2 = matrix.map(row => row[2]);

        const containerDraw = document.getElementById("container_draw");
        const containerMovie = document.getElementById("container_movie");
    
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
                [randomIndex, randomTheme]=drawMovie(carousel,themes, numberOfRows); 
                showAcceptbtn(acceptButton); 
            }, 2000);
            
        });
       
        // Event listener for the accept button
        acceptButton.addEventListener("click", () => {
            containerDraw.style.display = "none"; // Hide the draw container
            containerMovie.style.display = "flex";
            const divMovie1 = document.getElementById("movie1");
            const divMovie2 = document.getElementById("movie2");

            showMovieDetails(movies1[randomIndex], divMovie1);
            showMovieDetails(movies2[randomIndex], divMovie2);

        });
    
    });