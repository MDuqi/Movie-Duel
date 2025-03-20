
    
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
        const HTMLString = `${index}:${movie}<br>`;
        const targetInputContainer = document.getElementById("movie_list");
        targetInputContainer.innerHTML = HTMLString;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function drawMovie(matrix, numberOfRows) {
        const randomIndex = generateRandomNumber(numberOfRows);
        const randomMovie = matrix[randomIndex];
        displayMovie(randomMovie, randomIndex);
    }

    fetchMovieList().then(({ matrix, numberOfRows }) => {
        const drawButton = document.getElementById("draw_button");
        drawButton.addEventListener("click", () => drawMovie(matrix, numberOfRows));
    });
    

    
