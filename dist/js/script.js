('use strict');

////////////////////////////////////////////////////
// HAMBURGER
////////////////////////////////////////////////////

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
const hamburgerLine = document.querySelector('.hamburger-line');

hamburger.addEventListener('click', function () {
   hamburger.classList.toggle('hamburger-active');
   navMenu.classList.toggle('hidden');
});

// WHEN OUTSIDE HAMBURGER CLICKED
window.addEventListener('click', function (e) {
   if (
      e.target != navMenu &&
      e.target != hamburger &&
      e.target != hamburgerLine
   ) {
      hamburger.classList.remove('hamburger-active');
      navMenu.classList.add('hidden');
   }
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
      // Matching strategy
      if (e.target.classList.contains('link')) {
         e.preventDefault();
         const id = e.target.getAttribute('href');
         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      } else if (e.target.classList.contains('to-top')) {
         e.preventDefault();
         document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
      }
   });
});

////////////////////////////////////////////////////
// NAVBAR FIXED INTERSECTING API
////////////////////////////////////////////////////

const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height + 40;
const home = document.querySelector('#home');
const toTop = document.querySelector('#to-top');

const stickyNav = function (entries) {
   const [entry] = entries;
   if (entry.isIntersecting) {
      header.classList.remove('navbar-fixed');
      toTop.classList.add('hidden');
   } else {
      header.classList.add('navbar-fixed');
      toTop.classList.remove('hidden');
   }
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

////////////////////////////////////////////////////
// DARKMODE TOGGLE
////////////////////////////////////////////////////
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function () {
   if (darkToggle.checked) {
      html.classList.add('dark');
      localStorage.theme = 'dark';
   } else {
      html.classList.remove('dark');
      localStorage.theme = 'light';
   }
});

// POSITION TOGGLE DEPENDS ON MODE
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
   localStorage.theme === 'dark' ||
   (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
   darkToggle.checked = true;
} else {
   document.documentElement.classList.remove('dark');
   darkToggle.checked = false;
}
