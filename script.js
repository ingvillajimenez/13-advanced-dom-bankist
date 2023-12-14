"use strict";

///////////////////////////////////////
// Project: "Bankist" Website

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault(); // prevent default anchor behavior to jump the page because of hfer="#"
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal)); // Use forEach to attach an event listener to each button

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Selecting, Creating and Deleting Elements

// - Selecting elements
console.log(document.documentElement); // html element
console.log(document.head); // head element
console.log(document.body); // body element

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section"); // NodeList
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button"); // HTMLCollection
console.log(allButtons);

console.log(document.getElementsByClassName("btn")); // HTMLCollection

// - Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement("div"); // Create a DOM element
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// header.prepend(message); // first child of header
header.append(message); // last child of header
// header.append(message.cloneNode(true)); // append a copy of message element

// header.before(message); // insert element before the header as sibling
// header.after(message); // insert element after the header as sibling

// - Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove(); // remove element
    message.parentElement.removeChild(message); // DOM traversing
  });

///////////////////////////////////////
// Styles, Attributes and Classes

// - Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.color); // no answer because it shows only inline styles
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 43px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered"); // setting a custom css property

// - Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); // Bankist logo
console.log(logo.className); // nav__logo

logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer); // undefined -> Only shows standard attributes
console.log(logo.getAttribute("designer")); // Jonas -> This way can show non-standard attributes
logo.setAttribute("company", "Bankist");

console.log(logo.src); // http://127.0.0.1:8081/img/logo.png -> absolute url
console.log(logo.getAttribute("src")); // img/logo.png -> relative url

const link = document.querySelector(".nav__link--btn");
console.log(link.href); // http://127.0.0.1:8081/# -> absolute url
console.log(link.getAttribute("href")); // # -> relative url

// Data attributes
console.log(logo.dataset.versionNumber); // 3.0

// - Clases
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use
logo.className = "jonas";
