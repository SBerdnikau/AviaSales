const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');

//cities API
const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json';
//pre-server
const proxi = 'https://cors-anywhere.herokuapp.com/';
//my API key www.travelpayouts.com
const API_KEY ='0b73c584221f1961739f8b381a201591';
//calendar API
const calendarApi = 'http://min-prices.aviasales.ru/calendar_preload';

//data cities    
let city = [];

//get data from API
const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4){ return; }
        if(request.status === 200){
            callback(request.response);
        }else{
            console.error(request.status);
        }
    });
    request.send();
};

//render cities
const showCity = (input, list) => {
    list.textContent = '';

    if(input.value !== ''){
        const filterCity = city.filter((item) => {
            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });
    
        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item.name;
            list.append(li);
        });
    }
};

//select cities
const selectCity =  (event, input, list) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent = '';
    }
};

//input city from
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom)
} );

//input city to
inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo)
} );

//click city from
dropdownCitiesFrom.addEventListener('click', () => {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

//click city to
dropdownCitiesTo.addEventListener('click', () => {
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

//get data
getData( proxi +  citiesApi, (data) => {
    city = JSON.parse(data).filter((item) => {
        return item.name;
    }) ;
});