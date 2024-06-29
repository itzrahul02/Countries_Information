const countriesCont = document.querySelector('.countries');
const search = document.querySelector('.input');
const filterByRegion = document.querySelector('.dropdown-menu'); // Assuming dropdown-menu contains a select element
const modes=document.querySelector('.Mode')
const modeValue=document.querySelector('.dark-mode')
const icon=document.querySelector('.fa-moon')


modes.addEventListener('click',(e)=>{
    if(modeValue.innerText==='Dark Mode'){
        e.preventDefault();
        modeValue.innerText='Bright Mode'
        document.body.classList.add('dark')
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun')

    }
    else{
        e.preventDefault();
        modeValue.innerText='Dark Mode'
        document.body.classList.remove('dark')
        icon.classList.add('fa-moon')
        icon.classList.remove('fa-sun')
    }
})
let allCountriesData=[]

// Function to create and append country cards
const renderCountries = (x) => {
    countriesCont.innerHTML = '';
    x.forEach((country) => {
        // console.log(country)
        const countryCard = document.createElement('a');
        countryCard.setAttribute('href', `country.html?name=${country.name.common}`);
        countryCard.classList.add('country1');

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <div class="details">
                <h3>${country.name.common}</h3>
                <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                <p><b>Continent:</b> ${country.region}</p>
                <p><b>Capital:</b> ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        countriesCont.append(countryCard);
    });
};

// // Fetch and display all countries initially
async function dekho(){
const res= await fetch('https://restcountries.com/v3.1/all')
const data=await res.json()
renderCountries(data)
allCountriesData=data
return data
}

dekho()
console.log(allCountriesData)
// Filter countries based on region
const regions=(region)=>{
    
    console.log(region.target.value)
    if(region.target.value!=='all'){
    fetch(`https://restcountries.com/v3.1/region/${region.target.value}`)
    .then((res) => res.json())
    .then(renderCountries)
    }
    else{
        fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then(renderCountries)
    }
}
filterByRegion.addEventListener('change',regions);

//Search

search.addEventListener('input',(e)=>{
    const x=search.value.toLowerCase()
    const card=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(x));
    renderCountries(card)
})


