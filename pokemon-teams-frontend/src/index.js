const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainers => {
      trainers.forEach(trainer => {
        generateTrainerCard(trainer)
      }
    )
  })
// Run one first then chain the other

function addPokemon(trainerObj){
  let body = {
    "trainer_id": `${trainerObj.id}`
  }
  fetch(POKEMONS_URL,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }
  )
    .then(response => response.json())
    .then(
      // generate new li
    )
}

function releasePokemon(pokemonId){
  fetch(POKEMONS_URL + `/${pokemonId}`,
    {
      method: "DELETE",
    }
  ).then(response => response.json())
  .then(
    document.querySelector(`[data-pokemon-id="${pokemonId}"]`).parentElement.remove()
  )
}
// TODO: Add pokemon creates list item properly
function generateTrainerCard(trainerObj){
  // grab the main element
  let mainElement = document.getElementsByTagName('main')[0]
  // create div
  let trainerCard = document.createElement('div')
  let trainerNameP = document.createElement('p')
  trainerNameP.textContent = trainerObj.name
  trainerCard.appendChild(trainerNameP)
    // add class card to div
  trainerCard.className = "card"
    // to div add data-id attribute assigned to trainer ID
  trainerCard.setAttribute('data-id', trainerObj.id )
  // create button
  let addPokemonButton = document.createElement('button')
    // to button add data-id attribute assigned to trainer ID
  addPokemonButton.setAttribute('data-trainer-id', trainerObj.id)
  addPokemonButton.textContent = "Add pokemon"
  addPokemonButton.addEventListener('click', () => {
    addPokemon(trainerObj)
  })
  // add button to trainerCard
  trainerCard.appendChild(addPokemonButton)
  // create a ul element
  let ulItem = document.createElement('ul')
    // for loop to create li items for each pokemon
  generatePokemonsList(trainerObj, ulItem)
  trainerCard.appendChild(ulItem)
  // insert all into main element
  mainElement.appendChild(trainerCard)
  // debugger
}

function checkNumberOfPokemon(trainerObj) {
  console.log('Clicked!')
  let pokemonArray = trainerObj.pokemons
  if (pokemonArray.length < 6) {
    return true
  } else {
    alert("Your pokemon game is too weak! Fool.")
    return false
  }
}

function generatePokemonsList(trainerObj, ulItem) {
  if (trainerObj instanceof Object) {
    for (key in trainerObj.pokemons) {
      let listItem = document.createElement('li')
      // create button with data-pokemon-id class release
      let releaseButton = document.createElement('button')
      releaseButton.setAttribute('data-pokemon-id', trainerObj.pokemons[key].id)
      releaseButton.className = "release"
      releaseButton.textContent = "Release"
      releaseButton.addEventListener('click', () => {
        console.log("Key: ", key)
        console.log("Trainer obj: ", trainerObj)
        console.log("The pokemon: ", trainerObj.pokemons[key].id)
        releasePokemon(trainerObj.pokemons[key].id)
      })
      listItem.textContent = `${trainerObj.pokemons[key].nickname} (${trainerObj.pokemons[key].species})`
      // add button to li item
      listItem.appendChild(releaseButton)
      // add list item to list
      // console.log(ulItem)
      // console.log(listItem)
      ulItem.appendChild(listItem)
    }
  }
}


// let testTrainer =
// {"id":1,
// "name":"Prince",
// "pokemons":[
//   {"id":2,"nickname":"German","species":"Butterfree","trainer_id":1},
//   {"id":3,"nickname":"Jamir","species":"Mankey","trainer_id":1},
//   {"id":4,"nickname":"Ari","species":"Eevee","trainer_id":1},
//   {"id":5,"nickname":"Hortense","species":"Pinsir","trainer_id":1},
//   {"id":6,"nickname":"Ivory","species":"Rapidash","trainer_id":1}
//   ]
// }

// let information = [{"id":1,"name":"Prince","pokemons":[{"id":1,"nickname":"Cedrick","species":"Bellsprout","trainer_id":1},{"id":2,"nickname":"German","species":"Butterfree","trainer_id":1},{"id":3,"nickname":"Jamir","species":"Mankey","trainer_id":1},{"id":4,"nickname":"Ari","species":"Eevee","trainer_id":1},{"id":5,"nickname":"Hortense","species":"Pinsir","trainer_id":1},{"id":6,"nickname":"Ivory","species":"Rapidash","trainer_id":1}]},{"id":2,"name":"Dick","pokemons":[{"id":7,"nickname":"Merlin","species":"Omanyte","trainer_id":2},{"id":8,"nickname":"Janet","species":"Lapras","trainer_id":2}]},{"id":3,"name":"Garry","pokemons":[{"id":9,"nickname":"Fredy","species":"Sandshrew","trainer_id":3},{"id":10,"nickname":"Kayli","species":"Pinsir","trainer_id":3}]},{"id":4,"name":"Jason","pokemons":[{"id":11,"nickname":"Maxine","species":"Kadabra","trainer_id":4},{"id":12,"nickname":"Haskell","species":"Grimer","trainer_id":4},{"id":13,"nickname":"Montana","species":"Mewtwo","trainer_id":4},{"id":14,"nickname":"Adam","species":"Articuno","trainer_id":4}]},{"id":5,"name":"Matt","pokemons":[{"id":15,"nickname":"Carey","species":"Alakazam","trainer_id":5},{"id":16,"nickname":"Margarette","species":"Metapod","trainer_id":5}]},{"id":6,"name":"Noah","pokemons":[{"id":17,"nickname":"Loyce","species":"Venusaur","trainer_id":6},{"id":18,"nickname":"Devin","species":"Sandshrew","trainer_id":6},{"id":19,"nickname":"Nelson","species":"Clefable","trainer_id":6},{"id":20,"nickname":"Lorine","species":"Gloom","trainer_id":6},{"id":21,"nickname":"Reece","species":"Tauros","trainer_id":6},{"id":22,"nickname":"Carissa","species":"Geodude","trainer_id":6}]},{"id":7,"name":"Adam","pokemons":[{"id":23,"nickname":"Hillard","species":"Onix","trainer_id":7},{"id":24,"nickname":"Henry","species":"Charizard","trainer_id":7},{"id":25,"nickname":"Remington","species":"Arcanine","trainer_id":7},{"id":26,"nickname":"Kaden","species":"Abra","trainer_id":7}]},{"id":8,"name":"Arthur","pokemons":[{"id":27,"nickname":"Jackson","species":"Sandslash","trainer_id":8}]}]

// information.forEach(trainer =>{
//   generateTrainerCard(trainer)
// })