const PESOS = "1";
const DOLLAR = "2";
const PESO_DOLLAR = 0.00028;
const DOLLAR_PESO = 3623;

let $form;
let $input;
let $containerResult;
let $fromChange;
let $toChange;

/**
 * Dispatch after render
 */
function loadDocument() {
  $form = document.getElementById("js-form");
  $input = document.querySelector("#valueInput"); // Element
  $containerResult = document.querySelectorAll(".container-result")[0];
  $fromChange = document.querySelector("#fromChange"); // Element
  $toChange = document.querySelector("#toChange"); // Element

  $form.addEventListener("submit", handleSubmit);
  $input.addEventListener("input", convert);
  $fromChange.addEventListener("change", convert)
  $toChange.addEventListener("change", convert)
  validateConnection();
}

/**
 * Validate if exist connection to internet
 */
function validateConnection() {
  window.addEventListener("offline", () => {
    $containerResult.style.color = "red";
    setText($containerResult, "Sin conexión");
  });

  window.addEventListener("online", () => {
    setText($containerResult, "");
  });
}

/**
 * Convert pesos to dollars and bis
 */
const convert = (event) => {
  const valueInt = +$input.value;
  const result = convertMoney($fromChange.value, $toChange.value, valueInt);

  setText($containerResult, result);
};

/**
 * Hnadle submit event for form
 * @param {*} event
 */
function handleSubmit(event) {
  event.preventDefault();
  convert();
}

/**
 * Set value in label P
 * @param {*} $element htmlelement
 * @param {*} text value to set
 */
function setText($element, text) {
  $element.innerText = text;
}

/**
 * Convierte un valor de pesos a dolares y bis
 * @param {*} from Base money
 * @param {*} to to money
 * @param {*} value value to convert
 * @returns
 */
function convertMoney(from, to, value) {
  switch (from) {
    case PESOS:
      if (to === PESOS) return value;
      return value * 0.00028;
    case DOLLAR:
      if (to === DOLLAR) return value;
      return value * 3623;
    default:
      return 5;
  }
}
