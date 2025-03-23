
    
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

    function displayMovie(movie, index) {
        const HTMLString = `${index}: ${movie}<br>`;
        const targetInputContainer = document.getElementById("movie_list");
        targetInputContainer.innerHTML = HTMLString;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function drawMovie(matrix, numberOfRows) {
        const randomIndex = generateRandomNumber(numberOfRows);
        const randomMovie = matrix[randomIndex][0];
        displayMovie(randomMovie, randomIndex);
    }

    fetchMovieList().then(({ matrix, numberOfRows }) => {
        const drawButton = document.getElementById("draw_button");
        drawButton.addEventListener("click", () => drawMovie(matrix, numberOfRows));
    });
    

    //====================================================================================================

    
    const words = [
        "Innovation", "Creativity", "Technology", 
        "Movies", "Art", "Science", , "Design",
        "Music", "Photography", "Travel", "Food",
        
    ];
    
    const carousel = document.querySelector(".carousel");
    
    // Populate the carousel
    function populateCarousel() {
        words.forEach(word => {
            const span = document.createElement("span");
            span.textContent = word;
            carousel.appendChild(span);
        });
    }
    
    // Rotate words dynamically
    function rotateWords() {
        const firstWord = carousel.firstElementChild;
    
        // Slide out the first word smoothly
        firstWord.style.transition = "transform ease-out";
        firstWord.style.transform = "translateX(-100%)";
    
       
            // Move first word to the end and reset position
            carousel.appendChild(firstWord);
            firstWord.style.transition = "none";
            firstWord.style.transform = "translateX(0)";
       
    }
    
    
    
    // Initialize
    populateCarousel();
    setInterval(rotateWords, 500); // Rotate every 2 seconds
    