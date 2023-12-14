"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Project: "Bankist" Website

///////////////////////////////////////
// Modal window

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
// Implementing Smooth Scrolling

// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // position relative to viewport (section--1's coordinates)

  console.log(e.target.getBoundingClientRect()); // position relative to viewport (button's coordinates)

  console.log(
    "Current scroll position (X/Y)",
    window.pageXOffset,
    window.pageYOffset
  ); // (scrolling information) -> for example diference between top of the page and top of the viewport for Y scroll

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // viewport height and widgth (dimensions)

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Smooth Scrolling -> current element position + current page scroll
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Event Delegation: Implementing Page Navigation

// Implement event delegation using event bubbling
// Page navigation

// Attach an event listener for each element is not efficient and can cause performance issues
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault(); // prevent default fast navigation to the href by the anchor
//     const id = this.getAttribute("href"); // realtive url
//     console.log(id); // #section--1, #section--2, #section-- 3
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" }); // smooth scrolling
//   });
// });

// Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target); // where the event happened

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    // e.target -> element which originated the event
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/*
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


///////////////////////////////////////
// Types of Events and Event Handlers

const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");

  // h1.removeEventListener("mouseenter", alertH1); // removing event listener inside event handler function
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000); // removing event listener after certain time

// Using on event property = event handler function
// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You are reading the heading :D");
// };


///////////////////////////////////////
// Event Propagation in Practice

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget); // e.target -> event happens, e.currentTarget -> event handler is attached to
  console.log(e.currentTarget === this); // true -> this is the current target where the event handler is attached to
  // e.target === e.currentTarget -> event happens in the target phase

  // Stop propagation
  // e.stopPropagation(); // the parent elements DONT receive the event
});

document.querySelector(".nav__links").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("CONTAINER", e.target, e.currentTarget);
  }
  // false -> third parameter false (default) = event happens in the bubbling phase
);

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("NAV", e.target, e.currentTarget);
  }
  // true -> third parameter true = event happens in the capturing phase
);
*/
