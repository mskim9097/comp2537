let offset = 0;
const limit = 10;
let isLoading = false;

async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let jsonObj = await response.json();
    
    const pokemonList = document.getElementById("pokemonList");

    let html = "";

    for (let pokemon of jsonObj.results) {
        let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        let jsonObj2 = await response2.json();

        html += `
        <div class="card" style="width: 475px;">
            <img src="${jsonObj2.sprites.other['official-artwork'].front_default}" class="card-img-top">
            <div class="card-body" style="background-color:#f8f8f8;">
                <h3 class="card-title">${pokemon.name}</h3>
            </div>
        </div>
    `;
    }

    document.getElementById("pokemonList").innerHTML += html;
    
    offset += limit;
    isLoading = false;
}
loadPokemon();

/*
document.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
        console.log("End of page reached");
        loadPokemon();
    }
});
*/
document.getElementById("loadMoreBtn").addEventListener("click", async () => {
    const spinner = document.getElementById("spinner");
    const button = document.getElementById("loadMoreBtn");

    button.style.display = "none";
    spinner.style.display = "inline-block";

    await loadPokemon();

    spinner.style.display = "none";
    button.style.display = "inline-block";
});
