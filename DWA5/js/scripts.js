const form = document.querySelector("[data-form]");

const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);

  const { dividend, divider } = Object.fromEntries(entries);

  try {
    if (divider == "" || dividend == "") {
      throw "Division not performed. Both values are required in inputs. Try again ";
    }

    if (divider < 0) {
      throw "Division not performed. Invalid number provided. Try again";

      //   console.error("Invalid number provided");
      //   console.trace();
    }

    if (isNaN(dividend) || isNaN(divider)) {
      throw (document.body.innerHTML = `Something critical went wrong. Please reload the page.`);

      //   console.error("Critical error: Non-numeric value provided");
      //   console.trace();
    }

    result.innerText = `${Math.floor(dividend / divider)}`;
  } catch (e) {
    console.error(e);
    result.innerHTML = e;
  }
});
