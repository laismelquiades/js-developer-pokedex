const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMore-btn')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemon(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}



function loadMore(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemon).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMore(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit
    const nextPage = offset + limit

    if (nextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMoreBtn)
    } else {
        loadMore(offset, limit)
    }
})