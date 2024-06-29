const countryName = new URLSearchParams(location.search).get('name');
console.log(countryName);
const countryadd = document.querySelector('.container');
const neighbour = document.querySelector('.border');
const modes=document.querySelector('.Mode')
const modeValue=document.querySelector('.dark-mode')
const icon=document.querySelector('.fa-moon')

modes.addEventListener('click',(e)=>{
    if(modeValue.innerText==='Dark Mode'){
        modeValue.innerText='Bright Mode'
        document.body.classList.add('dark')
        icon.classList.remove('fa-moon')
        icon.classList.add('fa-sun')

    }
    else{
        modeValue.innerText='Dark Mode'
        document.body.classList.remove('dark')
        icon.classList.add('fa-moon')
        icon.classList.remove('fa-sun')
    }
})
// Fetch the country data
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(data => {
        const country = data[0];
        console.log(country);

        // Create the country information element
        const information = document.createElement('div');
        information.classList.add('information');
        information.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <div class="country-details">
            <div class="details1">
                <h2>${country.name.common}</h2>
                <p><b>Native Name:</b> ${Object.values(country.name.nativeName)[0].common}</p>
                <p><b>Population:</b> ${country.population.toLocaleString()}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Sub-Region:</b> ${country.subregion}</p>
                <p><b>Capital:</b> ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
            <div class="details2">
                <p><b>Top Level Domain:</b> ${country.tld.join(', ')}</p>
                <p><b>Currencies:</b> ${Object.values(country.currencies).map(c => c.name).join(', ')}</p>
                <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
            </div>
        </div>`;     
        countryadd.append(information);
        console.log(country.borders)

        if(country.borders){
        country.borders.forEach((key)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${key}`)
            .then(res=>res.json())
            .then(data1=>{
                const x=document.createElement('a')
                x.setAttribute('href',`http://127.0.0.1:5500/country.html?name=${data1[0].name.common}`)
                x.innerHTML=data1[0].name.common
                neighbour.append(x)

            })
        })}
        else{
            neighbour.classList.add('hide')
        }
    });
    
