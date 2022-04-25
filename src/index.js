import { operators } from "./data/operators.js";

const buildCard = (operator) => {
    const cardsContainer = document.getElementById("cards_container")
    cardsContainer.innerHTML+=`
        <div class="math-cards">
            <div class="card card__operator">
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

const createRandomDigit = (minimo,maximo) => {
    return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
  }

const createNumbers = (digits) => {
    var digitsArray = [];
    for(let i=1; i<=digits; i++){
        const randomDigit = createRandomDigit(1,9);
        digitsArray.push(randomDigit);
        console.log(`Digito ${i} creado`)
    }
    console.log(digitsArray)
    const joinedNumber = digitsArray.join("");
    console.log(joinedNumber);
    //digitsArray = [];
    return joinedNumber
}

const createData = (digits, numberQuantity) => {
    var numbersArray = [];
    for(let i=1; i<=numberQuantity; i++){
        const randomNumber = createNumbers(digits)
        numbersArray.push(randomNumber);
        console.log(`Número ${i} creado es ${randomNumber}`)
    }
    console.log(numbersArray);
    //numbersArray = [];
    return numbersArray
}


const getData = (numberDigits, numberQuantity, numberItems) => {
    var itemsArray = [];
    for(let i=1; i<=numberItems; i++){
        const cardNumbers = createData(numberDigits, numberQuantity);
        itemsArray.push(cardNumbers);
        console.log(`Datos del Ejercicio ${i} obtenidos`);
    }
    console.log(itemsArray)
    //itemsArray = [];
    return itemsArray;
}

const addCardTemplate = (appContainer, exItem) => {
    appContainer.innerHTML += `
            <div class="math-cards">
                <div class="card card__exercise">
                    <p class="card__title" id="exercise_item">Ejercicio ${exItem}</p>
                    <div class="exercises__container">
                        <div class="exercises__grid" id="exercise_grid${exItem}">
                            
                        </div>
                    </div>
                    <div class="footer__exercise">
                        <input type="number" placeholder="Resultado" class="input input-result">
                        <button class="btn btn__primary" id="evaluate_btn" name="X">
                            Calificar
                        </button>
                        <div class="evaluation__container">
                            <div class="chip__evaluate">
                                <img src="./src/assets/correct_answer.png" alt="" class="chip__img">
                                <span>¡Correcto!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
}

const addSymbolToCard = (exerciseGrid, exItem, symbol) => {
    exerciseGrid.innerHTML += `
            <div class="digit__cell symbol" id="symbol_ex_${exItem}">${symbol}</div>
        `;
}

const addDigitsToCard = (exercise, exerciseGrid) => {
    var digitsLength;
    exercise.forEach(number => {
        const numberDigits = number.split("");
        digitsLength = numberDigits.length;
        numberDigits.forEach(digit => {
            exerciseGrid.innerHTML += `
                <div class="digit__cell">${digit}</div>
            `;
        })
    })
    return digitsLength
}

const modifyGridSystem = (exerciseGrid,symbolElement,gridCol,numbersLength) => {
    exerciseGrid.style.gridTemplateColumns = `repeat(${gridCol+1}, 1fr)`;
    symbolElement.style.gridRowEnd = numbersLength+1;
}

const buildChallengeCard = (symbol, cardData) => {
    const appContainer = document.getElementById("cards_container")
    var exItem = 1;
    cardData.forEach(exercise => {
        addCardTemplate(appContainer, exItem);
        const exerciseGrid = document.getElementById(`exercise_grid${exItem}`);
        addSymbolToCard(exerciseGrid, exItem, symbol);
        var numbersLength = exercise.length
        const gridCol = addDigitsToCard(exercise, exerciseGrid);
        const symbolElement = document.getElementById(`symbol_ex_${exItem}`);
        modifyGridSystem(exerciseGrid,symbolElement,gridCol,numbersLength);
        exItem++
    })
    console.log("tarjeta creada con estos datos");
    console.log(cardData);
}

const setChallengeCards = (typeOperator, numberDigits, numberQuantity, numberItems) => {
    if(typeOperator === 'addition'){
        const cardData = getData(numberDigits, numberQuantity, numberItems)
        const operatorSymbol = '+';
        buildChallengeCard(operatorSymbol,cardData);//probablemente la creación del DOM se quede aquí
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
    console.log(`${numberDigits} | ${numberQuantity} | ${numberItems}`);
    setChallengeCards(typeOperator, numberDigits, numberQuantity, numberItems);
    console.log(`Reto creado ${typeOperator}`)
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
        <section class="cards__container" id="cards_container">
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

