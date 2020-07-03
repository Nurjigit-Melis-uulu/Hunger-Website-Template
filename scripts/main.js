let mobileNav = document.querySelector(".header__mobile-nav");
let backdrop = document.querySelector(".backdrop");
let hamburger = document.querySelector(".hamburger");
let drawer = document.querySelector(".drawer");
let anchors = document.querySelectorAll("nav a");
let drawerStatus = false;

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

    for (let link of links) {
      if (link.getAttribute("href") === blockID) {
        link.className = "active";
      } else {
        link.className = "";
      }
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
