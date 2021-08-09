const icons = {
    male: './assets/img/mail.svg',
    female: './assets/img/femail.svg',
    agender: './assets/img/bi.svg',
  };

const filmBlock = document.querySelector('.filmBlock');
const wookiElem = document.querySelector('.wooki');
const englishElem = document.querySelector('.english');
let wooki = '';
  
wookiElem.addEventListener('click',() => { 
  englishElem.classList.remove('active');
  console.log(englishElem)
  wooki = "?format=wookiee";
  wookiElem.classList.add('active');
});
englishElem.addEventListener('click', ()=>{ 
  wookiElem.classList.remove('active');
  wooki = '';
  englishElem.classList.add('active');
});

function createTemplate(values) {
    const cardOfCharacter = document.createElement('div');
    filmBlock.insertAdjacentElement('beforeend', cardOfCharacter);
  
    if(wooki === ''){
      const nameElem = document.createElement('span');
      nameElem.classList.add('name');
      nameElem.innerText = values.name;
      cardOfCharacter.insertAdjacentElement('beforeend', nameElem);
    
      const birthElem = document.createElement('span');
      birthElem.classList.add('birth');
      birthElem.innerText = values.birth_year;
      cardOfCharacter.insertAdjacentElement('beforeend', birthElem);
      
      const genderIcon =
      values.gender === 'male'
        ? (gender = `<img src="${icons.male}" alt="mail">`)
        : values.gender === 'female'
        ? (gender = `<img src="${icons.female}" alt="femail">`)
        : (gender = `<img src="${icons.agender}" alt="bi">`);
      
      const genderElem = document.createElement('span');
      genderElem.classList.add('gender');
      genderElem.innerHTML = genderIcon;
      cardOfCharacter.insertAdjacentElement('beforeend', genderElem);
    }

    else if( wooki === '?format=wookiee'){
      const nameElem = document.createElement('span');
      nameElem.classList.add('name');
      nameElem.innerText = values.whrascwo;
      cardOfCharacter.insertAdjacentElement('beforeend', nameElem);
    
      const birthElem = document.createElement('span');
      birthElem.classList.add('birth');
      birthElem.innerText = values.rhahrcaoac_roworarc;
      cardOfCharacter.insertAdjacentElement('beforeend', birthElem);

      const genderElem = document.createElement('span');
      genderElem.classList.add('gender');
      genderElem.innerText = values.rrwowhwaworc;
      cardOfCharacter.insertAdjacentElement('beforeend', genderElem);
    }

  }
  
  const getData = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  };
  
  async function getCharacters(part) {
    removeAllChildNodes(filmBlock)
    const url = `https://swapi.dev/api/films/${part}`;  
    const data = await getData(url);
  
    data.characters.forEach(async (person) => {
      const character = await getData(person + wooki);
      console.log(character)
      createTemplate(character);
    });
}

/* ----------------- 4 ----------------------*/
const buttonGetCharacters1 = document.querySelector('#part1')
buttonGetCharacters1.addEventListener('click', getCharacters.bind(null,1))

const buttonGetCharacters2 = document.querySelector('#part2')
buttonGetCharacters2.addEventListener('click', getCharacters.bind(null,2))

const buttonGetCharacters3 = document.querySelector('#part3')
buttonGetCharacters3.addEventListener('click', getCharacters.bind(null,3))

const buttonGetCharacters4 = document.querySelector('#part4')
buttonGetCharacters4.addEventListener('click', getCharacters.bind(null,4))

const buttonGetCharacters5 = document.querySelector('#part5')
buttonGetCharacters5.addEventListener('click', getCharacters.bind(null,5))

const buttonGetCharacters6 = document.querySelector('#part6')
buttonGetCharacters6.addEventListener('click', getCharacters.bind(null,6))

/*-------------------- 2 ----------------*/
let currentPage = 1;
let next = 1;
let previous = null;
const planetBlock = document.querySelector('.plannetsBlock');


async function getPlanet(current){
    removeAllChildNodes(planetBlock);

    const url = `https://swapi.dev/api/planets/?page=${current}`;
    const data = await getData(url);
    data.results.forEach(async (planet) => {
        createPlanetTemplate(planet);
    })
    
    if (data.next){   
      let nextlink = data.next.split('').reverse();
      next = +nextlink[0];
    }else{next = data.next}

    if (data.previous){   
      let previousLink = data.previous.split('').reverse();
      previous = +previousLink[0];
    }else{previous = data.previous}
}

function createPlanetTemplate(value){
    const planetElem = document.createElement('div');
    planetElem.classList.add('planetName');
    planetElem.innerText = value.name;
    planetBlock.insertAdjacentElement('beforeend', planetElem);
}

const getPlanetsButton = document.querySelector('.getPlanets');
getPlanetsButton.addEventListener('click', getPlanet.bind(null, currentPage));

/* ------------------- 3 ------------------*/

const getNextPlanetsButton = document.querySelector('.getNext');
getNextPlanetsButton.addEventListener('click', getNextPlanet);

const getPreviousButtons = document.querySelector('.getPrevious');
getPreviousButtons.addEventListener('click',getPreviousPlanet);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
function getNextPlanet(){
    removeAllChildNodes(planetBlock);
    if(next){ getPlanet(next)}
    else { 
      previous = 6;
      createPlanetTemplate({name: "There is no next page"})}
}
function getPreviousPlanet(){
  removeAllChildNodes(planetBlock);
  if(previous){ getPlanet(previous)}
  else { 
    next = 1;
    createPlanetTemplate({name: "There is no previous page"})}  
}