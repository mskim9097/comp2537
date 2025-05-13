let offset = 0;
const limit = 10;
let isLoading = false;

async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let jsonObj = await response.json();
    
    const pokemonList = document.getElementById("pokemonList");

    for (let pokemon of jsonObj.results) {
        let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        let jsonObj2 = await response2.json();

        pokemonList.innerHTML += `
        <div class="card" style="width: 475px;">
            <img src="${jsonObj2.sprites.other['official-artwork'].front_default}" class="card-img-top">
            <div class="card-body" style="background-color:#f8f8f8;">
                <h3 class="card-title">${pokemon.name}</h3>
            </div>
        </div>
    `;
    }
    
    offset += limit;
    isLoading = false;
}
loadPokemon();

document.addEventListener("scroll", function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
        console.log("End of page reached");
        loadPokemon();
    }
});

