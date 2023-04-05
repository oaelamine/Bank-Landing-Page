'use strict';

///////////////////////////////////////
// Variables

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');

const operationsTabContainer = document.querySelector('.operations__tab-container');
const operationsContent = document.querySelectorAll('.operations__content');










///////////////////////////////////////
//FUNCTION

//Modal Function
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


//Smouthe Scroling Function


///////////////////////////////////////
//EVENTS

//Modal Event
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)
)

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



//Smohe Scroling Event
btnScrollTo.addEventListener('click', function(e) {

  const s1coord = section1.getBoundingClientRect();

/*   window.scrollTo(
    {left: s1coord.left + window.pageYOffset,
     top: s1coord.top + window.pageYOffset,
     behavior: 'smooth'
    }
    ); */

    section1.scrollIntoView({behavior: 'smooth'})
})



//Smohe Scroling To All the Page
//Olde schole

/* navLink.forEach(el => {
  el.addEventListener('click', function(e)  {

    e.preventDefault();

    //const href = e.target.href;
    //const id = href.slice(href.indexOf('#'))
    const id = this.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior : 'smooth'});
  })
}) */


//new methode
navLinks.addEventListener('click', function(e) {

  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {

    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior : 'smooth'});
  }

})


//OPERATION TAB
operationsTabContainer.addEventListener('click', function(e) {

  //CHANG THE TAB
  Array.from(operationsTabContainer.children).forEach((el) => el.classList.remove('operations__tab--active'));

  const clickedTarget = e.target.closest('.operations__tab');

  if (!clickedTarget) return;
  
  clickedTarget.classList.add('operations__tab--active');

  //CHANGE THE CONTENT
  operationsContent.forEach(el => el.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clickedTarget.dataset.tab}`).classList.add('operations__content--active');
  
})






