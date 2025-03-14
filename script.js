fetch('MovieDuel_List.csv')
    .then(response => response.text())
    .then(text => {
        const rows = text.split("\n").map(row => row.split(",").map(item => item.trim()));

        if (rows.length > 51) {
            console.warn("CSV contains more than 50 rows, only the first 50 will be used.");
        }

        const matrix = rows.slice(1, 51); // Ignore header and limit to 50 rows
        console.log(matrix); // Check in console

        
        //displayTable(matrix);
    })
    .catch(error => console.error("Error loading CSV:", error));

    document.getElementById('draw-btn').addEventListener('click', () => {
        displayMovie(matrix[3][0]);
    });

function displayMovie(movie) {
    const HTMLString = `MOVIE: ${movie}`;
    const targetInputContainer = document.getElementById("movie_container");
    targetInputContainer.innerHTML += HTMLString;
}

function displayTable(matrix) {
    const table = document.createElement("table");
    table.id = "movie_table";
    table.border = "1";
    
    // Header row
    const headerRow = document.createElement("tr");
    ["Theme", "Movie V", "Movie M"].forEach(title => {
        const th = document.createElement("th");
        th.textContent = title;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Table rows
    matrix.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    document.body.appendChild(table);
}