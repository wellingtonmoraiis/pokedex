//descrição
const pokeName = document.querySelector('.poke-name');
const pokeNumber = document.querySelector('.poke-number');
const pokeImage = document.querySelector('.pokemon-img');
// Formulário
const form = document.querySelector('.form');
const input = document.querySelector('.search');
// Botões
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let serchPokemon = 1;


const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
  
}

const renderPokemon = async (pokemon) => {
  pokeName.innerHTML = 'carregando..';
  const data = await fetchPokemon(pokemon);

  if(data){
    pokeImage.style.display = 'block'; // se tudo der certo, mostrar a imagem do pokemon.
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = data.id;
    pokeImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = ''; //limpar o campo de busca
    serchPokemon = data.id; // volta a busca no pokemon que estava.
  }else {
    pokeImage.style.display = 'none'; // caso ñ encontre o pokemon a imagem fica indisponível.
    pokeName.innerHTML = 'Pokemon não existe!';
    pokeNumber.innerHTML = '';
  }
  
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  renderPokemon(input.value.toLowerCase());
  //transformar em letras minúsculas oq foi digitado no campo de busca.
  //api só funciona com letras minúsculas.
  
});

btnPrev.addEventListener('click', () => {
  if(serchPokemon > 1) {
    serchPokemon -= 1;
    renderPokemon(serchPokemon);
  }
  
});

btnNext.addEventListener('click', () => {
  serchPokemon += 1;
  renderPokemon(serchPokemon);
  
});
renderPokemon(serchPokemon);