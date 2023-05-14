

async function init() {
    loadPokemon();
}

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
    let response = await fetch(url);
    let responsePokemon = await response.json();
    let allPokemon = responsePokemon['results'];
    console.log(allPokemon);
}