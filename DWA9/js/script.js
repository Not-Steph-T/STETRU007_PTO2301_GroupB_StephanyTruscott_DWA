import {BOOKS_PER_PAGE,authors,books} from "./data.js"

let page = 1;
let matches = books;

function createBookElement(book) {
  const { author, id, image, title } = book;
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);
  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;
  return element;
}

// show more(the button at the bottom of the page to display more books)
function renderBooks() {
  const bookItemsContainer = document.querySelector("[data-list-items]");
  bookItemsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const startIndex = (page - 1) * BOOKS_PER_PAGE;
  const endIndex = page * BOOKS_PER_PAGE;
  const visibleBooks = matches.slice(startIndex, endIndex);
  for (const book of visibleBooks) {
    const element = createBookElement(book);
    fragment.appendChild(element);
  }
  bookItemsContainer.appendChild(fragment);
  const remainingBooks = matches.length - endIndex;
  const listButton = document.querySelector("[data-list-button]");
  listButton.innerText = `Show more (${
    remainingBooks > 0 ? remainingBooks : 0
  })`;
  listButton.disabled = remainingBooks <= 0;
}

// theme (to change between dark and light )
function applyTheme(theme) {
  const darkColor = "255, 255, 255";
  const lightColor = "10, 10, 20";
  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", darkColor);
    document.documentElement.style.setProperty("--color-light", lightColor);
  } else {
    document.documentElement.style.setProperty("--color-dark", lightColor);
    document.documentElement.style.setProperty("--color-light", darkColor);
  }
}
/
/ search(searching for books)
function handleSearchFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];
  for (const book of books) {
    let genreMatch = filters.genre === "any";
    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  if (result.length < 1) {
    document
      .querySelector("[data-list-message]")
      .classList.add("list__message_show");
  } else {
    document
      .querySelector("[data-list-message]")
      .classList.remove("list__message_show");
  }
  renderBooks();
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("[data-search-overlay]").open = false;
}

function handleListButtonClick() {
  page += 1;
  renderBooks();
}

// preview( the option that allows you to preview a selected book )
function handleBookItemClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;
  for (const node of pathArray) {
    if (active) break;
    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }
      active = result;
    }
  }

  if (active) {
    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").innerText = active.title;
    document.querySelector("[data-list-subtitle]").innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    document.querySelector("[data-list-description]").innerText =
      active.description;
  }
}

// Initialize the script
function initialize() {
  // Add event listeners
  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });
  document
    .querySelector("[data-settings-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = false;
    });
  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = true;
      document.querySelector("[data-search-title]").focus();
    });
  document
    .querySelector("[data-header-settings]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = true;
    });
  document
    .querySelector("[data-settings-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);
      applyTheme(theme);
      document.querySelector("[data-settings-overlay]").open = false;
    });
  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", handleSearchFormSubmit);
  document
    .querySelector("[data-list-button]")
    .addEventListener("click", handleListButtonClick);
  // document.querySelector('[data-list-items]').addEventListener('click', handleBookItemClick);

  // Initial rendering

  renderBooks();

  // Apply theme based on user preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.querySelector("[data-settings-theme]").value = "night";
    applyTheme("night");
  } else {
    document.querySelector("[data-settings-theme]").value = "day";
    applyTheme("day");
  }

  // Update remaining book count
  document.querySelector("[data-list-button]").innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${
          matches.length - page * BOOKS_PER_PAGE > 0
            ? matches.length - page * BOOKS_PER_PAGE
            : 0
        })</span>
    `;
}

initialize();