import { authors, books, genres, html } from "./data.js";

export class SearchBar {
  constructor() {
    this.title = html.search.title.value;
    this.genre = html.search.genres.value;
    this.author = html.search.authors.value;
  }

  open() {
    html.search.dialog.setAttribute("open", true);
  }

  close() {
    html.search.dialog.removeAttribute("open");
    html.search.genres
      .querySelectorAll("option:not(:first-child)")
      .forEach((option) => option.remove());
    html.search.authors
      .querySelectorAll("option:not(:first-child)")
      .forEach((option) => option.remove());
  }

  addGenres() {
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(genres)) {
      const option = document.createElement("option");
      option.value = key;
      option.innerText = value;
      fragment.appendChild(option);
    }

    html.search.genres.appendChild(fragment);
  }

  addAuthors() {
    const fragment = document.createDocumentFragment();

    for (const [key, value] of Object.entries(authors)) {
      const option = document.createElement("option");
      option.value = key;
      option.innerText = value;
      fragment.appendChild(option);
    }
    html.search.authors.appendChild(fragment);
  }

  sortBooks() {
    const search = {
      title: html.search.title.value,
      genre: html.search.genres.value,
      author: html.search.authors.value,
    };

    const found = [];
    for (let x in search) {
      if (
        search[x] === "" ||
        search[x] === "all authors" ||
        search[x] === "all genres"
      ) {
        continue;
      }
      let match = books.filter((book) => {
        if (x === "title") {
          return book.title.toLowerCase().includes(search[x].toLowerCase());
        } else if (x === "genre") {
          return book.genres.includes(search[x]);
        } else {
          return book[x] === search[x];
        }
      });
      if (match !== null && !found.includes(match)) {
        found.push(match);
      }
    }
    html.list.parent.innerHTML = "";

    return createPreviewsFragment(found, 0, found.length);
  }
}

export class SettingsBar {
  open = (event) => {
    html.settings.dialog.setAttribute("open", true);
  };
  close = (event) => {
    html.settings.dialog.removeAttribute("open");
  };

  /**
   * @param {Event} event - The event object.
   */

  save = (event) => {
    event.preventDefault();
    if (html.settings.theme.value == "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
      this.close();
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
      this.close();
    }
  };
}

/**
 *
 * @param {object} props
 * @returns {HTMLBodyElement}
 */

export const createPreview = (props) => {
  const { author, image, title, id } = props;

  const newElement = document.createElement("button");
  newElement.className = "preview";
  newElement.setAttribute("data-preview", id);

  newElement.innerHTML = /* HTML */ `
    <img class="preview__image" src="${image}" />

    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${author}</div>
    </div>
  `;
  return newElement;
};

/**
 *
 * @param {array} array
 * @param {number} start
 * @param {number} end
 * @returns {HTMLBodyElement}
 */

export const createPreviewsFragment = (array, start, end) => {
  const booksSlice = array.slice(start, end);

  let previewFragment = document.createDocumentFragment();

  for (let i = 0; i < booksSlice.length; i++) {
    let { author, image, title, id } = booksSlice[i];
    author = authors[author];

    const preview = {
      author,
      id,
      image,
      title,
    };
    previewFragment.appendChild(createPreview(preview));
  }
  return previewFragment;
};
