const form = document.querySelector("[data-form]");
//User Stories - Starting program state
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);

  const { dividend, divider } = Object.fromEntries(entries);

  try {
    //User Stories - Validation when values are missing
    if (divider == "" || dividend == "") {
      throw "Division not performed. Both values are required in inputs. Try again ";
    }

    //User Stories - An invalid division should log an error in the console
    if (divider < 0) {
      throw "Division not performed. Invalid number provided. Try again";
    }

    //User Stories - Providing anything that is not a number should crash the program
    if (isNaN(dividend) || isNaN(divider)) {
      throw (document.body.innerHTML = `Something critical went wrong. Please reload the page.`);
    }

    //User Stories - Dividing numbers result in a whole number & Dividing numbers result in a decimal number
    result.innerText = `${Math.floor(dividend / divider)}`;
  } catch (e) {
    //Console log errors
    console.error(e);
    result.innerHTML = e;
  }
});
