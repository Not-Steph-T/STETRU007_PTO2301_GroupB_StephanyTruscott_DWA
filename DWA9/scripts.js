import { BOOKS_PER_PAGE, books, html } from "./data.js";
import { SearchBar, SettingsBar, createPreviewsFragment } from "./functions.js";

import { CreatePreviewClass } from "./modules/previewElement.js";
//___________________LOADING PAGE_______________________
//populating the webpage with the first amount of books:
//
const pageInformation = {
  index: 0,
  startIndex: 0,
  endIndex: BOOKS_PER_PAGE,
};

let fragment = createPreviewsFragment(books, 0, BOOKS_PER_PAGE);
html.list.parent.appendChild(fragment);

//___________________CREATING SEARCHBAR_________________________________
// creating the searchbar
const searchBar = new SearchBar();
// adding functionality to the searchbar:
//event listener for the search and cancel buttons to open/close overlay
html.search.button.addEventListener("click", searchBar.open);
html.search.cancel.addEventListener("click", searchBar.close);
// these fuctions  are called when the list is clicked, they populate the list options
html.search.genres.addEventListener("click", searchBar.addGenres);
html.search.authors.addEventListener("click", searchBar.addAuthors);
//html.search.sumbit.addEventListener("click", searchBar.sortBooks);

//___________________CREATING SETTINGS____________________
// creating the settings object
const settingsBar = new SettingsBar();
// linking the function to its respective buttons using event lisners
html.settings.button.addEventListener("click", settingsBar.open);
html.settings.cancel.addEventListener("click", settingsBar.close);
html.settings.save.addEventListener("click", settingsBar.save);

//____________________SUMMARY OVERLAY ___________________

// const summaryPreview = new Summary();
//const preview = new CreatePreviewClass()
const preview = new CreatePreviewClass();
document.body.appendChild(preview); // Add the element to the document
// Call the open() method after the element is added

document.addEventListener("click", (event) => {
  const bookElement = event.target.closest(".preview");

  if (bookElement && bookElement.hasAttribute("data-preview")) {
    const previewId = bookElement.getAttribute("data-preview");

    const preview = new CreatePreviewClass();
    document.body.appendChild(preview);

    preview.open(previewId);
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.hasAttribute("data-list-close")) {
    preview.close();
  }
});

//______________SORTING>>>>>

//html.search.sumbit.addEventListener("click", searchBar.sortBooks);
