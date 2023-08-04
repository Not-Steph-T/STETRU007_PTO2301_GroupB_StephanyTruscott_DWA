import { BOOKS_PER_PAGE, authors, books, genres } from "./data.js";

// //SEARCH FUNCTION - Fetch HTML DOM Elements
// const search = document.querySelector("[data-header-search]");
// const searchCancel = document.querySelector("[data-search-cancel]");
// const searchOverlay = document.querySelector("[data-search-overlay]");
// const searchForm = document.querySelector("[data-search-form]");
// const searchTitle = document.querySelector("[data-search-title]");
// const searchGenres = document.querySelector("[data-search-genres]");
// const searchAuthors = document.querySelector("[data-search-authors]");

// //DATA LIST - Fetch HTML DOM Elements
// const listItems = document.querySelector("[data-list-items]");
// const listMessage = document.querySelector("[data-list-message]");
// const listButton = document.querySelector("[data-list-button]");
// const listClose = document.querySelector("[data-list-close]");
// const listActive = document.querySelector("[data-list-active]");
// const listBlur = document.querySelector("[data-list-blur]");
// const listImage = document.querySelector("[data-list-image]");
// const listTitle = document.querySelector("[data-list-title]");
// const listSubtitle = document.querySelector("[data-list-subtitle]");
// const listDescription = document.querySelector("[data-list-description]");

// //SETTINGS Function - Fetch HTML DOM Elements
// const settings = document.querySelector("[data-header-settings]");
// const settingsTheme = document.querySelector("[data-settings-theme]");
// const settingsOverlay = document.querySelector("[data-settings-overlay]");
// const settingsForm = document.querySelector("[data-settings-form]");
// const settingsCancel = document.querySelector("[data-settings-cancel]");

/**
 * @typedef  {object} data      - Data Attributes
 * @property {object} header    - Header Data Attributes
 * @property {object} list      - Data List Data Attributes
 * @property {object} search    - Search Function Data Attributes
 * @property {object} settings  - Settings Function Data Attributes
 */

/**
 * Data Object containing various data attributes
 * @type {data}
 */

const data = {
  header: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
  },

  list: {
    items: document.querySelector("[data-list-items]"),
    message: document.querySelector("[data-list-message]"),
    button: document.querySelector("[data-list-button]"),
    active: document.querySelector("[data-list-active]"),
    blur: document.querySelector("[data-list-blur]"),
    image: document.querySelector("[data-list-image]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
    close: document.querySelector("[data-list-close]"),
  },

  search: {
    overlay: document.querySelector("[data-search-overlay]"),
    form: document.querySelector("[data-search-form]"),
    title: document.querySelector("[data-search-title]"),
    genres: document.querySelector("[data-search-genres]"),
    authors: document.querySelector("[data-search-authors]"),
    cancel: document.querySelector("[data-search-cancel]"),
  },

  settings: {
    overlay: document.querySelector("[data-settings-overlay]"),
    form: document.querySelector("[data-settings-form]"),
    theme: document.querySelector("[data-settings-theme]"),
    cancel: document.querySelector("[data-settings-cancel]"),
  },
};

//page range counter
const range = [0, BOOKS_PER_PAGE];
let matches = books;
let page = 1;

//settings function - CSS Object with 2 properties
const css = {
  day: ["255, 255, 255", "10, 10, 20"],
  night: ["10, 10, 20", "255, 255, 255"],
};

//adjusts theme on open according to users preference
data.settings.theme.value =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "night"
    : "day";

data.settings.form.addEventListener("submit", (event) => {
  // user selects dark/light
  event.preventDefault();

  const formSubmit = new FormData(event.target);
  const option = Object.fromEntries(formSubmit);
  // if (submit.theme === "night") {
  //     document.documentElement.style.setProperty(
  //       "--color-light",
  //       themes[submit.theme][0]
  //     );
  //     document.documentElement.style.setProperty(
  //       "--color-dark",
  //       themes[submit.theme][1]
  //     );
  //   } else {
  //     document.documentElement.style.setProperty(
  //       "--color-light",
  //       themes[submit.theme][0]
  //     );
  //     document.documentElement.style.setProperty(
  //       "--color-dark",
  //       themes[submit.theme][1]
  //     );
  //   }
  //   settingsOverlay.close();
  // });
  option.theme = {
    night: document.documentElement.style.setProperty(
      "--color-light",
      css[option.theme][0]
    ),
    night: document.documentElement.style.setProperty(
      "--color-dark",
      css[option.theme][1]
    ),

    day: document.documentElement.style.setProperty(
      "--color-light",
      css[option.theme][0]
    ),
    day: document.documentElement.style.setProperty(
      "--color-dark",
      css[option.theme][1]
    ),
  };

  data.settings.overlay.close();
});

data.settings.cancel.addEventListener("click", () => {
  //"cancel" clicked closes settingbar
  data.settings.overlay.close();
  data.settings.form.reset();
});

data.header.settings.addEventListener("click", () => {
  //opens settings and focuses on themes
  data.settings.overlay.focus();
  data.settings.overlay.showModal();
});

//creates a range of 36 books to disply
const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

for (let i = 0; i < extracted.length; i++) {
  const { author: authorId, id, image, title } = extracted[i];

  const extractedList = document.createElement("button"); //button effect for preview
  extractedList.classList = "preview";
  extractedList.setAttribute("data-preview", id);

  extractedList.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `;

  fragment.appendChild(extractedList);
}
data.list.items.appendChild(fragment);

//creates a list of genres
const genresFragment = document.createDocumentFragment();
const genreElement = document.createElement("option");
genreElement.value = "any";
genreElement.innerText = "All Genres";
genresFragment.appendChild(genreElement);

const genreList = Object.entries(genres);
for (let i = 0; i < genreList.length; i++) {
  const [id, name] = genreList[i];
  const genreOption = document.createElement("option");
  genreOption.value = id;
  genreOption.textContent = name;
  genresFragment.appendChild(genreOption);
}
data.search.genres.appendChild(genresFragment);

//creates a list of authors
const authorsFragment = document.createDocumentFragment();
const authorsElement = document.createElement("option");
authorsElement.value = "any";
authorsElement.innerText = "All Authors";
authorsFragment.appendChild(authorsElement);

const authorArray = Object.entries(authors);
for (let i = 0; i < authorArray.length; i++) {
  const [id, name] = authorArray[i];
  const authorOption = document.createElement("option");
  authorOption.value = id;
  authorOption.textContent = name;
  authorsFragment.appendChild(authorOption);
}
data.search.authors.appendChild(authorsFragment);

//close list items preview
data.list.close.addEventListener("click", () => {
  data.list.active.close();
});

//summary preview setting setup
data.list.items.addEventListener("click", (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (let i = 0; i < pathArray.length; i++) {
    const node = pathArray[i];
    if (active) {
      break;
    }
    const previewId = node?.dataset?.preview;

    for (let i = 0; i < books.length; i++) {
      const singleBook = books[i];
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  }

  if (!active) {
    return;
  }

  data.list.active.open = true;
  data.list.blur.src = active.image;
  data.list.image.src = active.image;
  data.list.title.textContent = active.title;

  data.list.subtitle.textContent = `${authors[active.author]} (${new Date(
    active.published
  ).getFullYear()})`;
  data.list.description.textContent = active.description;
});

// errors thrown for search requirements
if (!books && !Array.isArray(books)) {
  throw new Error("Source required");
}
if (!range && range.length < 2) {
  throw new Error("Range must be an array with two numbers");
}

// set up the "show more" button
data.list.button.innerHTML = /* HTML */ `
  <span>Show more</span>
  <span class="list__remaining">
    (${books.length - page * BOOKS_PER_PAGE > 0
      ? books.length - page * BOOKS_PER_PAGE
      : 0})</span
  >
`;

data.list.button.addEventListener("click", () => {
  // define "show more" page range
  const start = (page - 1) * BOOKS_PER_PAGE;
  const end = start + BOOKS_PER_PAGE;

  const extractedNew = books.slice(start, end);

  const newFragment = document.createDocumentFragment();
  for (let i = 0; i < extractedNew.length; i++) {
    const showMore = extractedNew[i];
    const showPreview = createPreview(showMore);
    newFragment.appendChild(showPreview);
  }
  data.list.items.appendChild(newFragment);

  const remaining = books.length - page * BOOKS_PER_PAGE;
  listButton.innerHTML = /* HTML */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
  `;

  listButton.disabled = remaining <= 0;
  page = page + 1;
});

// create preview function
function createPreview(preview) {
  const { author: authorId, id, image, title } = preview;

  const showMore = document.createElement("button");
  showMore.classList = "preview";
  showMore.setAttribute("data-preview", id);

  showMore.innerHTML = /* html */ `
              <img
                  class="preview__image"
                  src="${image}"
              />
              <div class="preview__info">
                  <h3 class="preview__title">${title}</h3>
                  <div class="preview__author">${authors[authorId]}</div>
              </div>
          `;
  return showMore;
}

//search function
data.header.search.addEventListener("click", () => {
  //user clicks on search icon & search bar opens
  data.search.title.focus();
  data.search.overlay.showModal();
});

data.search.cancel.addEventListener("click", () => {
  //user clicks "cancel" button & searchbar closes
  data.search.overlay.close();
  data.search.form.reset();
});

data.search.form.addEventListener("submit", (event) => {
  //user selects requested data in searchbar form, results returned on "search" click
  event.preventDefault();

  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  const result = [];
  const booksList = books;

  for (let i = 0; i < booksList.length; i++) {
    const book = booksList[i];
    let titleMatch =
      filters.title.trim() !== "" &&
      book.title.toLowerCase().includes(filters.title.toLowerCase());
    let authorMatch =
      filters.author !== "any" && book.author.includes(filters.author);
    let genreMatch =
      filters.genre !== "any" && book.genres.includes(filters.genre);

    if (titleMatch || authorMatch || genreMatch) {
      result.push(book);
    }
  }

  if (result.length > 0) {
    data.list.message.classList.remove("list__message_show");
    data.list.button.disabled = true;
    data.list.items.innerHTML = "";

    const search = document.createDocumentFragment();
    //returns search results
    for (let i = 0; i < result.length; i++) {
      const book = result[i];
      const bookPreview = createPreview(book);
      searchBook.appendChild(bookPreview);
    }
    data.list.items.appendChild(search);
  } else {
    data.list.message.classList.add("list__message_show"); //if no results available return "no results found.." message
    data.list.button.disabled = true;
    data.list.items.innerHTML = "";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  data.search.overlay.close();
  data.search.form.reset();
});
