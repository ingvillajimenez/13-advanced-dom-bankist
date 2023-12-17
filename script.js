"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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

// Event delegation -> this strategy is more efficient
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

///////////////////////////////////////
// Building a Tabbed Component

// tabs.forEach((t) => t.addEventListener("click", () => console.log("TAB"))); // No eficcient solution

// Event delegation
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab"); // finds the closest parent with the .operations__tab classname
  // console.log(clicked); // null when "tabsContainer" parent element (div) is clicked

  // Guard clause
  if (!clicked) return; // no click on any of the .operations__tab elements (buttons)

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active")); // remove the class on all of them
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active"); // add the class on the clicked one

  // Activate content area
  // console.log(clicked.dataset.tab); // attribute data-tab -> property dataset.tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// Passing Arguments to Event Handlers

// Menu fade animation
// mouseover has bubbling phase and mouseenter don't, mouseout is the opposite of mouseover, mouseleave is the opposite of mouseenter
const handleHover = function (e) {
  // console.log(this, e.currentTarget); // by default "this" keyword === e.currentTarget
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this; // "this" is the opacity value
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler function (handleHover) using the bind method
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/*
///////////////////////////////////////
// Implementing a Sticky Navigation: The Scroll Event

// Sticky navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // element coordinates relative to the viewport

// Scroll event is not so efficient and should be avoided because it is bad for performance. Event is listened on the window object
window.addEventListener("scroll", function () {
  // console.log(window.scrollY); // scroll Y on window (diference between top of the page and top of the viewport), the "event" object is useless

  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/

///////////////////////////////////////
// A Better Way: The Intersection Observer API

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// }; // callback is called every time target interset the root at every threshold

// const obsOptions = {
//   root: null, // root: null -> target (section1) is intersecting the viewport
//   threshold: [0, 0.2], // intersection ratio
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // the observer observes the target when interset the root according to the threshold

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Revealing Elements on Scroll

// Reveal sections
// Remove "section--hidden" class as we approach each of these sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

///////////////////////////////////////
// Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]"); // attribute selector
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////////////////////
// Building a Slider Component: Part 1

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length - 1;

// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-800px)";
// slider.style.overflow = "visible";

// Go to slide
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0); // 0%, 100%, 200%, 300%

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

// Previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

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
  console.log(e.currentTarget === this); // true -> "this" is the current target where the event handler is attached to
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

///////////////////////////////////////
// DOM Traversing

const h1 = document.querySelector("h1");

// Going downwards: child elements
console.log(h1.querySelectorAll(".highlight")); // NodeList(2) [span.highlight, span.highlight] -> all children
console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight] -> direct children
h1.firstElementChild.style.color = "white"; // <span class="highlight">banking</span> -> text color is set to white
h1.lastElementChild.style.color = "orangered"; // <span class="highlight">minimalist</span> -> text color is set to orangered

// Going upwards: parents elements
console.log(h1.parentNode); // div.header__title
console.log(h1.parentElement); // div.header__title

h1.closest(".header").style.background = "var(--gradient-secondary)"; // find the closest parent element with the class .header
h1.closest("h1").style.background = "var(--gradient-primary)"; // find the closest element h1 no matter how far up it is

// Going sideways: siblings elements
console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

console.log(h1.previousSibling); // #text
console.log(h1.nextSibling); // #text

console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)"; // it is posible to compare DOM elements
});
*/
