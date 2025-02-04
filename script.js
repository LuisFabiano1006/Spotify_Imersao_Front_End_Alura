const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistContainer = document.querySelector(".grid-container");

function requestApi(searchTerm) {
    const url = `http://localhost:2000/artists`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Filtra os artistas no próprio JavaScript para garantir busca mais flexível
            const filteredArtists = data.filter(artist => 
                artist.name.toLowerCase().includes(searchTerm)
            );
            displayResults(filteredArtists);
        })
        .catch(error => console.error("Erro ao buscar artistas:", error));
}

function displayResults(result) {
    if (result.length === 0) {
        // Se não encontrar nenhum artista, exibe as playlists novamente
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");

    artistContainer.innerHTML = ""; // Limpa os resultados anteriores

    result.forEach(element => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${element.urlImg}" alt="${element.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">${element.genre}</span>
            </div>
        `;

        artistContainer.appendChild(artistCard);
    });
}

// Evento para capturar a digitação no input
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        resultPlaylist.classList.remove("hidden");
        resultArtist.classList.add("hidden");
        return;
    }

    requestApi(searchTerm);
});

// Rodar o comando abaixo no terminal para o servidor funcionar
// json-server --watch api-artists/artists.json --port 2000
