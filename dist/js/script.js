('use strict');

////////////////////////////////////////////////////
// HAMBURGER
////////////////////////////////////////////////////

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
   hamburger.classList.toggle('hamburger-active');
   navMenu.classList.toggle('hidden');
});

////////////////////////////////////////////////////
// YEAR
////////////////////////////////////////////////////
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// NAVIGATION SCROLL
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelectorAll('.links').forEach(function (el) {
   el.addEventListener('click', function (e) {
      e.preventDefault();

      // Matching strategy
      if (e.target.classList.contains('link')) {
         const id = e.target.getAttribute('href');
         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
   });
});

////////////////////////////////////////////////////
// NAVBAR FIXED INTERSECTING API
////////////////////////////////////////////////////

const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height + 40;
const home = document.querySelector('#home');

const stickyNav = function (entries) {
   const [entry] = entries;
   entry.isIntersecting
      ? header.classList.remove('navbar-fixed')
      : header.classList.add('navbar-fixed');
};

const headerObserver = new IntersectionObserver(stickyNav, {
   root: null,
   threshold: 0,
   rootMargin: `-${headerHeight}px`,
});
headerObserver.observe(home);

// NAVBAR FIXED
// window.onscroll = function () {
//    const header = document.querySelector('header');
//    const fixedNav = header.offsetTop;

//    if (window.scrollY > fixedNav) {
//       header.classList.add('navbar-fixed');
//    } else {
//       header.classList.remove('navbar-fixed');
//    }
// };
