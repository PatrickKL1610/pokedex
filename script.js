let load = 30;
let searchedPokemon = [];
let loadedPokemons = 0;


function init() {
    loadPokemons();
}

async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let allPokemon = responseAsJson['results'];
    globalThis.allPokemons = allPokemon;
    loadCarts();
}

async function loadCarts() {
    for (let i = loadedPokemons; i < load; i++) {
        loadedPokemons++;
        let thisPokemonUrl = allPokemons[i]['url'];
        let thisPokemon = await fetch(thisPokemonUrl);
        let thisCurrentPokemon = await thisPokemon.json();
        renderCarts(thisCurrentPokemon);
    }
}

function renderCarts(thisCurrentPokemon) {
    document.getElementById('contentContainer').innerHTML += createMiniCarts(thisCurrentPokemon);
    addTypeBg(thisCurrentPokemon);
}

function loadMore() {
    load = load + 20;
    loadCarts();
}

function toggleBackBtn() {
    document.getElementById('btnMore').classList.add('d-none');
    document.getElementById('btnBack').classList.remove('d-none');
}

async function selection(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    globalThis.currentPokemons = currentPokemon;
    fullscreenView(currentPokemon, i);
}

async function fullscreenView(currentPokemon, i) {
    document.getElementById('fullscreenView').classList.remove('d-none');
    document.getElementById('fullscreenView').innerHTML = renderFullscreen(currentPokemon);
    fullscreenBg(currentPokemon);
    renderCardMenu(i);
    renderArrows(i);
    document.getElementById('body').style = 'overflow: hidden;';
}

function closeFullScreen() {
    document.getElementById('fullscreenView').classList.add('d-none');
    document.getElementById('body').style = '';
}

function previous(i) {
    selection(i - 1);
}
function next(i) {
    selection(i + 1);
}


function renderCardMenu(i) {
    document.getElementById('fullscreenContainer').innerHTML += fillTable();
    contentBaseStats();
}

function renderArrows(i) {
    document.getElementById('fullscreenContainer').innerHTML += createArrows(i);
}

function contentAbout() {
    setIsActiv(1);
    document.getElementById('cardMenuContend').innerHTML = '';
    let height = currentPokemons['height'] / 10;
    let weight = currentPokemons['weight'] / 10;

    document.getElementById('cardMenuContend').innerHTML = createTable(height, weight);
    fillTableAbility();
    fillTableItems();
}

function contentBaseStats() {
    setIsActiv(2);
    let pokemonStat = currentPokemons['stats'];
    document.getElementById('cardMenuContend').innerHTML = '';
    for (let x = 0; x < pokemonStat.length; x++) {
        document.getElementById('cardMenuContend').innerHTML += createStatBar(currentPokemons, x);
    }
}

function contentMoves() {
    setIsActiv(3);
    document.getElementById('cardMenuContend').innerHTML = '';
    for (let i = 0; i < currentPokemons['moves'].length; i++) {
        const move = currentPokemons['moves'][i]['move']['name'];
        document.getElementById('cardMenuContend').innerHTML +=/*html*/`
            <div class="boxForType">${move}</div>
        `;
    }
}

function fillTableAbility() {
    for (let i = 0; i < currentPokemons['abilities'].length; i++) {
        const ability = currentPokemons['abilities'][i]['ability']['name'];
        document.getElementById('aboutTable').innerHTML += /*html*/`
        <tr>
            <td>Ability ${i + 1} : </td><td>${ability}</td>
        </tr>
    `;
    }
}

function fillTableItems() {
    for (let i = 0; i < currentPokemons['held_items'].length; i++) {
        const item = currentPokemons['held_items'][i]['item']['name'];
        document.getElementById('aboutTable').innerHTML += /*html*/`
        <tr>
            <td>Held Item ${i + 1} : </td><td>${item}</td>
        </tr>
    `;
    }
}

function setIsActiv(isActiv) {
    if (isActiv == 1) {
        document.getElementById('menu1').classList.add('isActiv');
        document.getElementById('menu2').classList.remove('isActiv');
        document.getElementById('menu3').classList.remove('isActiv');
    } else if (isActiv == 2) {
        document.getElementById('menu2').classList.add('isActiv');
        document.getElementById('menu1').classList.remove('isActiv');
        document.getElementById('menu3').classList.remove('isActiv');
    } else {
        document.getElementById('menu3').classList.add('isActiv');
        document.getElementById('menu1').classList.remove('isActiv');
        document.getElementById('menu2').classList.remove('isActiv');
    }
}

function getSearchInput() {
    let search = document.getElementById('searchInput').value;
    if (search.length == 0) {
        alert('Please enter a value');
    } else {
        let searchValue = search.toLocaleLowerCase();
        document.getElementById('searchInput').value = '';
        filterPokemon(searchValue);
    }
}

async function filterPokemon(searchValue) {
    for (let i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        let pokemonName = pokemon['name'];
        if (pokemonName.includes(searchValue)) {
            let pokemonResponse = await fetch(pokemon['url']);
            let pokemonAsJson = await pokemonResponse.json();
            searchedPokemon.push(pokemonAsJson);
        }
    }
    pokemonSearch();
}

function pokemonSearch() {
    let pokemonContainer = document.getElementById('contentContainer');
    pokemonContainer.innerHTML = '';
    if (searchedPokemon.length == 0) {
        pokemonContainer.innerHTML = noPokemonFoundTemplate();
        toggleBackBtn();
    } else {
        document.getElementById('contentContainer').innerHTML = '';
        for (let i = 0; i < searchedPokemon.length; i++) {
            let currentPokemons = searchedPokemon[i];
            renderCarts(currentPokemons, i);
        }
        searchedPokemon = [];
        toggleBackBtn();
    }
}

function noPokemonFoundTemplate() {
    return /*html*/ `
        <h1>Sorry I could chatch anything</h1>
    `;
}

function checkEnter(event) {
    if (event.keyCode === 13) {
        getSearchInput();
    }
}