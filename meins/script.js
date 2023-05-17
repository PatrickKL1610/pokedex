let load = 30;
let currentLoad = 0;

async function init() {
    loadPokemon();
}

// Load all Pokemons
async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
    let response = await fetch(url);
    let responsePokemon = await response.json();
    let allPokemon = responsePokemon['results'];
    globalThis.allPokemons = allPokemon;
    //console.log(allPokemon);
    loadCartContent();
}

// Load Pokemon Card Content
async function loadCartContent() {
    for (let i = currentLoad; i < load; i++) { // versuchen zu vereinfachen
        currentLoad++;
        let thisPokemonUrl = allPokemons[i]['url'];
        let thisPokemon = await fetch(thisPokemonUrl);
        let currentPokemon = await thisPokemon.json();
        renderMiniCarts(currentPokemon);
        //console.log(currentPokemon);

    }
}

// create Pokemon Cards
function renderMiniCarts(currentPokemon) {
    document.getElementById('pokemonNames').innerHTML += /*html*/`
    <div class="pokemonCard" id="pokemonCard${currentPokemon['id']}" onclick="callSelection(${currentPokemon['id']})">
        <h3>${currentPokemon['name']}</h3>
        <div class="pokeId" id="pokeId${currentPokemon['id']}"></div>
        <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        <div class="pokeType" id="pokeType${currentPokemon['id']}">
    </div>
    `;

}

// load 20 more Pokemons
function loadMore() {
    load = load + 20;
    loadCartContent();
}

// open Pokemon
function callSelection(i) { }