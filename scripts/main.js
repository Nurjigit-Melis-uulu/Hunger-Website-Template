let mobileNav = document.querySelector(".header__mobile-nav");
let backdrop = document.querySelector(".backdrop");
let hamburger = document.querySelector(".hamburger");
let drawer = document.querySelector(".drawer");
let anchors = document.querySelectorAll(".anchor");
let popup = document.querySelector(".galerie__popup");
let galerieList = document.querySelectorAll(".galerie__list img");
let drawerStatus = false;

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
