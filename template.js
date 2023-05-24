function createMiniCarts(thisCurrentPokemon) {
    return /*html*/`
        <div class="pokemonMiniCard" id="pokemonMiniCard${thisCurrentPokemon['id']}" onclick="selection(${thisCurrentPokemon['id']})">
            <h3> ${thisCurrentPokemon['name']}</h3>
            <img src="${thisCurrentPokemon['sprites']['other']['official-artwork']['front_default']}">
            <div class="types" id="type${thisCurrentPokemon['id']}">
        </div>
`
}

function renderFullscreen(currentPokemon) {
    return /*html*/`
        <div class="fullscreenContainer" id="fullscreenContainer" onclick="event.stopPropagation()">
            <img src="img/close.png" class="closeTag" onclick="closeFullScreen()">
            <div class="fullscreenBg" id="fullscreenBg">            
                <h3> ${currentPokemon['name']}</h3>
                <div class="contentHeader">
                    <div class="typeBox" id="typeBox"></div>
                    <div>
                        <img class="pokePic" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
                    </div>
                </div>
            </div>
            <div class="fullscreenBgbottom"></div>
       </div> 
   `
}

function createTable(height, weight) {
    return /*html*/`
        <table id="aboutTable">
            <tr>
                <td>Height:</td><td>${height}m</td>
            </tr>
            <tr>
                <td>Weight:</td><td>${weight}kg</td>
            </tr>
        </table>
    `
}

function fillTable() {
    return /*html*/`
        <div class="cardMenu">
            <div class="cardMenuText" id="menu1" onclick="contentAbout()">About</div>
            <div class="cardMenuText" id="menu2" onclick="contentBaseStats()">Base Stats</div>
            <div class="cardMenuText" id="menu3" onclick="contentMoves()">Moves</div>
        </div>
        <div class="cardMenuContend" id="cardMenuContend"></div>
    `
}

function createArrows(i) {
    return /*html*/`
        <div class="arrowsContainer" id="arrowsContainer">    
            <div><img class="arrows" src="img/arrow_left.png" onclick="previous(${i})"></div>
            <div><img class="arrows" src="img/arrow_right.png" onclick="next(${i})"></div>
        </div>
    `
}

function createStatBar(currentPokemons, x) {
    return /*html*/`
        <div class="statBar">
            <div id="statName">${currentPokemons['stats'][x]['stat']['name']}</div>
            <div class="progress" style="height: 15px;">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemons['stats'][x]['base_stat'] - 15}%;" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">${currentPokemons['stats'][x]['base_stat']}</div>
            </div>
        </div> 
    `
}