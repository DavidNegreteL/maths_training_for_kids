import { operators } from "./data/operators.js";

const buildCard = (operator) => {
    const cardsContainer = document.getElementById("cards_container")
    cardsContainer.innerHTML+=`
        <div class="math-cards">
            <div class="card card__math">
                <div class="card__title">
                    <p class="title">${operator.name}</p>
                </div>
                <figure class="card__figure">
                    <img src="./src/assets/${operator.image}.png" alt="" class="card__img">
                </figure>
                <div class="card__footer">
                    <button class="btn btn__primary" id="init_btn" name="${operator.name}">
                        Iniciar
                    </button>
                </div>
            </div>
        </div>
    `;
}

Object.entries(operators).forEach(([key,value]) => {
    buildCard(value)
})

const setChallengeCards = (typeOperator, numberDigits, numberQuantity, numberItems) => {
    if(typeOperator === 'addition'){
        console.log('Tarjetas de suma creadas');
    }
    else{
        console.log('No es de suma');
    }
}

const buildChallenge = (e) => {
    const typeOperator = e.target.getAttribute("name");
    const numberDigits = document.getElementById("number_digits").value;
    const numberQuantity = document.getElementById("number_quantity").value;
    const numberItems = document.getElementById("number_items").value;
    console.log(`Reto creado ${typeOperator}`)
    console.log(`${numberDigits} | ${numberQuantity} | ${numberItems}`);
    setChallengeCards(typeOperator, numberDigits, numberQuantity, numberItems);
}

const deleteChallenge = (e) => {
    const typeOperator = e.target.getAttribute("name");
    console.log(`Reto eliminado ${typeOperator}`)
}

const addListener = (selector, event, functionName) => {
    const element = document.getElementById(selector)
    element.addEventListener(event, functionName);
}

const loadAdditionDom = (operatorType) => {
    const cardsContainerElem = document.getElementById("cards_container")
    cardsContainerElem.remove();
    const appContainer = document.querySelector(".app")
    appContainer.innerHTML += `
        <section class="addition-config-container">
            <div class="config__section">
                <div class="input-field">
                    <label for="number_digits" class="input__label">Cifras de los números</label>
                    <input type="number" class="input input__digits" id="number_digits">
                </div>
                <div class="input-field">
                    <label for="number_quantity" class="input__label">¿Cuántos números quires sumar?</label>
                    <input type="number" class="input input__quantity" id="number_quantity">
                </div>
                <div class="input-field">
                    <label for="number_items" class="input__label">¿Cuántas sumas?</label>
                    <input type="number" class="input input__items" id="number_items">
                </div>
            </div>
            <div class="config__section">
                <div class="input-field">
                    <button class="btn btn__primary" id="build_challenge_btn" name="${operatorType}">Iniciar</button>
                </div>
                <div class="input-field">
                    <button class="btn btn__danger" id="delete_challenge_btn" name="${operatorType}">Limpiar</button>
                </div>
            </div>
        </section>
    `;
    addListener('build_challenge_btn', 'click', buildChallenge)
    addListener('delete_challenge_btn', 'click', deleteChallenge)
}
const defineOperator = (e) => {
    var operatorType;
    const buttonName = e.target.getAttribute("name");
    if(buttonName === 'Sumas'){
        operatorType = 'addition'
        loadAdditionDom(operatorType)
    }
    else{
        console.log("No se trata de sumas");
    }
}

const addListeners = (buttons) => {
    buttons.forEach(btn => {
        btn.addEventListener("click", defineOperator)
    })
}

const initButtons = document.querySelectorAll("#init_btn");
addListeners(initButtons);

