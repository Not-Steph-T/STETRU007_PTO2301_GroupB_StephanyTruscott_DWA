// import { books, authors } from "./data.js"; - Import your data and constants

class Book {
  constructor(id, author, image, title, description, published) {
    this.id = id;
    this.author = author;
    this.image = image;
    this.title = title;
    this.description = description;
    this.published = published;
  }
}

class BookPreviewComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.innerHTML = `
        <style>
          /* Your component's CSS styles go here */
        </style>
        <div class="preview">
          <img class="preview__image" src="" />
          <div class="preview__info">
            <h3 class="preview__title"></h3>
            <div class="preview__author"></div>
          </div>
        </div>
      `;
  }

  connectedCallback() {
    // Fetch data from attributes and set them to the component
    const id = this.getAttribute("data-preview-id");
    const image = this.getAttribute("data-preview-img");
    const title = this.getAttribute("data-preview-title");
    const author = this.getAttribute("data-preview-author");

    // Set data to the component's shadow DOM
    this.shadowRoot.querySelector(".preview__image").src = image;
    this.shadowRoot.querySelector(".preview__title").textContent = title;
    this.shadowRoot.querySelector(".preview__author").textContent = author;

    // Add click event listener to the component
    this.shadowRoot
      .querySelector(".preview")
      .addEventListener("click", this.handlePreviewClick.bind(this));
  }

  handlePreviewClick() {
    // Handle click event for the preview
  }
}

const createBookPreviews = (event) => {
  event.preventDefault();

  // Replace this with your actual data retrieval logic
  const extractedBooks = [
    new Book(/* book data */),
    // ... (more books)
  ];

  const extractedBookPreviews = extractedBooks.map(
    (book) => new BookPreviewComponent(book)
  );

  updateBookPreviews(extractedBookPreviews);
};

const updateBookPreviews = (extractedBookPreviews) => {
  const dataList = document.querySelector("[data-list-items]");
  dataList.innerHTML = "";

  const fragment = document.createDocumentFragment();

  extractedBookPreviews
    .slice(0, BOOKS_PER_PAGE * PAGES)
    .forEach((bookPreview) => {
      const element = bookPreview.createPreviewElement();
      fragment.appendChild(element);
    });

  // ... (rest of your updateBookPreviews function)
};

// ... (rest of your code)
