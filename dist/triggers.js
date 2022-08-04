/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./DropBox-uploadFiles/assets/js/triggers.js ***!
  \***************************************************/
var triggerAccordions = document.querySelectorAll('.accordions');
var openCloseInfo = document.querySelectorAll('.info-open-close');
var toggleSideNav = document.getElementById('toggle-side-nav');
var slideSideNav = document.getElementById('side-nav');
var tableFolders = document.getElementById('table-folders'); // Loop tru accordions

triggerAccordions.forEach(function (trigger) {
  // Variables
  var btn = trigger.querySelector('.triggers-accordions');
  var contentLast = trigger.lastElementChild;
  var contentFirst = trigger.firstElementChild;
  var content = document.querySelectorAll('.accordion-content');
  var headerContent = document.querySelectorAll('.triggers-accordions'); // On click show content of accordion

  btn.addEventListener('click', function () {
    // Loop tru content and add or remove active class
    content.forEach(function (cont) {
      if (contentLast !== cont) {
        cont.classList.remove('active-accord');
        cont.classList.remove('first-child-accordion');
      } else {
        cont.classList.add('active-accord');
      }
    }); // Loop tru buttons and add or remove active class for color text

    headerContent.forEach(function (hCont) {
      if (contentFirst !== hCont) {
        hCont.classList.remove('active-color');
        hCont.classList.remove('active-color-first');
      } else {
        hCont.classList.add('active-color');
      }
    });
  });
}); // Loop tru clicked elements and add variations and styles

for (i = 0; i < openCloseInfo.length; i++) {
  openCloseInfo[i].addEventListener('click', function () {
    var inactiveIcons = document.getElementById('icons-on-close');
    var infoAside = document.getElementById('informations-aside');
    var headAccordion = document.getElementById('head-accordion');
    var headInfoSlide = document.getElementById('head-info-slide');

    if (inactiveIcons.classList.contains('inactive-icons')) {
      inactiveIcons.classList.remove('inactive-icons');
      inactiveIcons.classList.add('sl__ac');
      infoAside.style.width = "4%";
      tableFolders.style.width = "80%";
      headAccordion.style.display = "none";
      headInfoSlide.style.display = "none";
    } else {
      inactiveIcons.classList.add('inactive-icons');
      inactiveIcons.classList.remove('sl__ac');
      headAccordion.style.display = "block";
      headInfoSlide.style.display = null;
      tableFolders.style.width = null;
      infoAside.style.width = null;
    }
  });
} // Toggle side nav on mobile and tablet


toggleSideNav.addEventListener('click', function () {
  if (slideSideNav.classList.contains('active-slide-nav')) {
    tableFolders.classList.remove('active-slide-nav-before');
    slideSideNav.classList.remove('active-slide-nav');
  } else {
    slideSideNav.classList.add('active-slide-nav');
    tableFolders.classList.add('active-slide-nav-before');
  }
});
/******/ })()
;