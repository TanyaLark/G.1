
(async function () {

    let URLcountry = 'https://restcountries.eu/rest/v2/all';
    let URLexchange = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

    let response = await fetch(URLexchange);
    let commitsNBU = await response.json();
    console.log("commitsNBU", commitsNBU);

    let responseCountry = await fetch(URLcountry);
    let commitsCountry = await responseCountry.json();
    console.log("commitsCountry", commitsCountry)

    let resultArray = [];
    let result = ``;
    let imgFlag;
    for (let element of commitsCountry) {
        let ccCountry = element.currencies[0].code;

        for (const elementNBU of commitsNBU) {
            let ccNBU = elementNBU.cc;

            if (ccCountry === ccNBU) {
                imgFlag = element.flag; //ссылка на картинку флага
                result = `
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row no-gutters">
    
                    <div class="col-md-4">
                        <img src="${imgFlag}" class="card-img" alt="...">
                    </div>
    
                    <div class="col-md-8">
    
                        <div class="card-body">
                            <h5 class="card-title">
                                ${element.name} (${elementNBU.cc} - ${elementNBU.txt})
                            </h5>
                            <p class="card-text">
                                Курс ${elementNBU.rate} на ${elementNBU.exchangedate}
                            </p>
                        </div>
    
                    </div>
    
                </div>
            </div> `;

                resultArray.push(result);
            }
        }
    }

    let cardsContainer = document.getElementById('myContainer');
    cardsContainer.innerHTML = resultArray.join(' ');

})();
