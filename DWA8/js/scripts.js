import { BOOKS_PER_PAGE, authors, books, genres } from "./data.js";

//page range counter
let page = 1;
let matches = books;

//create a button element for main screen book preview
const createButton = (id, image, title, author) => {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  const imageElement = document.createElement("img");
  imageElement.classList = "preview__image";
  imageElement.src = image;

  const infoElement = document.createElement("div");
  infoElement.classList = "preview__info";

  const titleElement = document.createElement("h3");
  titleElement.classList = "preview__title";
  titleElement.innerText = title;

  const authorElement = document.createElement("div");
  authorElement.classList = "preview__author";
  authorElement.innerText = authors[author];

  infoElement.appendChild(titleElement);
  infoElement.appendChild(authorElement);

  element.appendChild(imageElement);
  element.appendChild(infoElement);

  return element;
};

//create an option element for genre & author
const createOption = (value, name) => {
  const element = document.createElement("option");
  element.value = value;
  element.innerText = name;
  return element;
};

//initialize the page with initial data and event listeners
const startingPage = () => {
  const starting = document.createDocumentFragment();
  const genreHtml = document.createDocumentFragment();
  const authorsHtml = document.createDocumentFragment();

  //first set of books to display
  for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = createButton(id, image, title, author);
    starting.appendChild(element);
  }
  document.querySelector("[data-list-items]").appendChild(starting);

  //genere dropdown
  const genreElement = createOption("any", "All Genres");
  genreHtml.appendChild(genreElement);
  for (const [id, name] of Object.entries(genres)) {
    const element = createOption(id, name);
    genreHtml.appendChild(element);
  }
  document.querySelector("[data-search-genres]").appendChild(genreHtml);

  //author dropdown
  const authorElement = createOption("any", "All Authors");
  authorsHtml.appendChild(authorElement);
  for (const [id, name] of Object.entries(authors)) {
    const element = createOption(id, name);
    authorsHtml.appendChild(element);
  }
  document.querySelector("[data-search-authors]").appendChild(authorsHtml);

  //adjusts theme on open according to users preference
  const setTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "night"
      : "day";
  document.querySelector("[data-settings-theme]").value = setTheme;

  //sets the color scheme
  const nightMode = setTheme === "night" ? "255, 255, 255" : "10, 10, 20";
  const dayMode = setTheme === "night" ? "10, 10, 20" : "255, 255, 255";
  document.documentElement.style.setProperty("--color-dark", nightMode);
  document.documentElement.style.setProperty("--color-light", dayMode);

  //search & settings event listeners
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
    });

  //form submissions & close preview event listeners
  document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").open = false;
  });

  document
    .querySelector("[data-settings-form]")
    .addEventListener("submit", handleSettings);

  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", handleSearch);

  document
    .querySelector("[data-list-button]")
    .addEventListener("click", showMore);

  document
    .querySelector("[data-list-items]")
    .addEventListener("click", handleBook);

  //sets up the "show more" button
  const remainder = books.length - page * BOOKS_PER_PAGE;
  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainder})</span>
  `;

  //scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });

  //close search function
  document.querySelector("[data-search-overlay]").open = false;
};

//settings form submission
const handleSettings = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  const nightMode = theme === "night" ? "255, 255, 255" : "10, 10, 20";
  const dayMode = theme === "night" ? "10, 10, 20" : "255, 255, 255";
  document.documentElement.style.setProperty("--color-dark", nightMode);
  document.documentElement.style.setProperty("--color-light", dayMode);
  document.querySelector("[data-settings-overlay]").open = false;
};

//search form submission
const handleSearch = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  // Filter books based on the search criteria
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

  //reset page count
  page = 1;
  matches = result;

  // Update the UI with the filtered results
  const listMessage = document.querySelector("[data-list-message]");
  listMessage.classList.toggle("list__message_show", result.length < 1);

  const listItems = document.querySelector("[data-list-items]");
  listItems.innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    const element = createButton(id, image, title, author);
    newItems.appendChild(element);
  }

  listItems.appendChild(newItems);
  document.querySelector("[data-list-button]").disabled =
    matches.length - page * BOOKS_PER_PAGE < 1;
  const remainder = Math.max(0, matches.length - page * BOOKS_PER_PAGE);
  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainder})</span>
  `;

  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Close the search overlay
  document.querySelector("[data-search-overlay]").open = false;
};

//function to handle "Show More" button click
const showMore = () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = createButton(id, image, title, author);
    fragment.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;
};

//function to handle book item click
const handleBook = (event) => {
  const target = event.target.closest("[data-preview]");
  if (target) {
    const active = books.find((book) => book.id === target.dataset.preview);
    if (active) {
      showBookPreview(active);
    }
  }
};

//function to create a button element
const createPreviewButton = (id, image, title, author) => {
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
};

//function to show book details
const showBookPreview = (book) => {
  const listActive = document.querySelector("[data-list-active]");
  listActive.open = true;
  document.querySelector("[data-list-blur]").src = book.image;
  document.querySelector("[data-list-image]").src = book.image;
  document.querySelector("[data-list-title]").innerText = book.title;
  document.querySelector("[data-list-subtitle]").innerText = `${
    authors[book.author]
  } (${new Date(book.published).getFullYear()})`;
  document.querySelector("[data-list-description]").innerText =
    book.description;
};

//sets up the initial state of the page
startingPage();
