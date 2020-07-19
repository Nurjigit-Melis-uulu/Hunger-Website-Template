let mobileNav = document.querySelector(".header__mobile-nav");
let backdrop = document.querySelector(".backdrop");
let hamburger = document.querySelector(".hamburger");
let drawer = document.querySelector(".drawer");
let anchors = document.querySelectorAll(".anchor");
let popup = document.querySelector(".galerie__popup");
let galerieList = document.querySelectorAll(".galerie__list img");
let drawerStatus = false;
let sections = document.querySelectorAll("section");
let bookingInputs = document.querySelectorAll(".booking__form input");
let bookingSubmit = document.querySelector(".booking__form button");
let bookingFormData = {
  name: null,
  email: null,
  phone: null,
  people: null,
  date: null,
  time: null,
};
let contactInputs = document.querySelectorAll(".contact__form input");
let contactSubmit = document.querySelector(".contact__form button");
let contactMess = document.querySelector(".contact__form textarea");
let contactFormData = {
  name: null,
  email: null,
  phone: null,
  message: null,
};

contactSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  formInputsCheking(contactInputs);

  contactInputs.forEach((input) => {
    input.id === "contact__name" ? (contactFormData.name = input.value) : null;
    input.id === "contact__email"
      ? (contactFormData.email = input.value)
      : null;
    input.id === "contact__tel" ? (contactFormData.phone = input.value) : null;
  });

  contactFormData.message = contactMess.value;

  console.log(contactFormData);
  writeNewPost(contactFormData, "/contacts/");
});

bookingSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  formInputsCheking(bookingInputs);

  bookingInputs.forEach((input) => {
    input.id === "booking__name" ? (bookingFormData.name = input.value) : null;
    input.id === "booking__email"
      ? (bookingFormData.email = input.value)
      : null;
    input.id === "booking__tel" ? (bookingFormData.phone = input.value) : null;
    input.id === "booking__date" ? (bookingFormData.date = input.value) : null;
    input.id === "booking__time" ? (bookingFormData.time = input.value) : null;
    input.id === "booking__people"
      ? (bookingFormData.people = input.value)
      : null;
  });

  console.log(bookingFormData);
  writeNewPost(bookingFormData, "/booking/");
});

function formInputsCheking(inputArr) {
  inputArr.forEach((input) => {
    if (input.value) {
      if (input.type === "email") {
        if (input.value.split("@").length > 1) {
          input.classList.remove("invalid");
          input.classList.add("valid");
        } else {
          input.classList.remove("valid");
          input.classList.add("invalid");
        }
      }

      if (input.type === "date") {
        let dateNow = new Date();
        let inputDate = new Date(input.value);

        if (
          inputDate > dateNow ||
          (inputDate.getDay() === dateNow.getDay() &&
            inputDate.getMonth() === dateNow.getMonth() &&
            inputDate.getFullYear() === dateNow.getFullYear())
        ) {
          input.classList.remove("invalid");
          input.classList.add("valid");
        } else {
          input.classList.remove("valid");
          input.classList.add("invalid");
        }
      }
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
    }
  });
}

$(document).ready(function () {
  $(window).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (
    event
  ) {
    delta = parseInt(
      event.originalEvent.wheelDelta || -event.originalEvent.detail
    );
    if (delta >= 0) {
      parallax("up");
    } else {
      parallax("down");
    }
  });
});

function parallax(direction) {
  sections.forEach((section) => {
    let sectionPos = section.getBoundingClientRect();
    let thisParallaxObj = document.querySelector(
      `#${section.id} .parallax-obj`
    );
    let docElem = document.documentElement;
    let parallaxSpeed = 5;

    if (
      sectionPos.y < docElem.clientHeight &&
      sectionPos.y > docElem.clientTop &&
      thisParallaxObj
    ) {
      let parallaxIndex = thisParallaxObj.getAttribute("parallaxIndex");

      if (direction === "down") {
        parallaxIndex -= parallaxSpeed;
        thisParallaxObj.style.transform = `translateY(${parallaxIndex}px)`;
      } else {
        parallaxIndex = ++parallaxIndex + parallaxSpeed;
        thisParallaxObj.style.transform = `translateY(${parallaxIndex}px)`;
      }

      thisParallaxObj.setAttribute("parallaxIndex", parallaxIndex);
    }
  });
}

popup.addEventListener("mousedown", () => {
  popup.style.display = "none";
});

for (let image of galerieList) {
  image.addEventListener("mousedown", () => {
    popup.style.display = "flex";
    document.querySelector(".galerie__popup img").src = image.src;
  });
}

hamburger.addEventListener("mousedown", () => {
  drawerStatus = !drawerStatus;
  drawerToggle();
});

backdrop.addEventListener("mousedown", () => {
  drawerStatus = false;
  drawerToggle();
});

for (let anchor of anchors) {
  anchor.addEventListener("mousedown", function (e) {
    drawerStatus = false;
    drawerToggle();

    e.preventDefault();

    const blockID = anchor.getAttribute("href");

    if (anchor.getAttribute("href") === "#") {
      document.querySelector("body").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      document.querySelector("" + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

function drawerToggle() {
  if (drawerStatus) {
    mobileNav.classList.add("mobile_nav_active");
    drawer.style.left = 0;
  } else {
    mobileNav.classList.remove("mobile_nav_active");
    drawer.style.left = "-100%";
  }
}

$(document).ready(function () {
  $(".spec-slider").slick({
    dots: true,
  });
});

// firebase init
var config = {
  apiKey: "AIzaSyALtbvHxiYovWFnIMS63xJnc1yzUqS9CDg",
  authDomain: "hunger-01.firebaseapp.com",
  databaseURL: "https://hunger-01.firebaseio.com",
  storageBucket: "hunger-01.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// posting data function
function writeNewPost(postData, address) {
  var newPostKey = firebase.database().ref().child("posts").push().key;

  var updates = {};
  updates[address + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
