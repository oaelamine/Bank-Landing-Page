"use strict";
///////////////////////////////////////
// Variables
const header = document.querySelector(".header");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");
const navLogo = document.querySelector(".nav__logo");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");

const operationsTabContainer = document.querySelector(
	".operations__tab-container"
);
const operationsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
//FUNCTION

//Modal Function
const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

//FADING MENU ANIMATHION  FUNCTION
const opacityFunc = function (e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;
		const siblings = e.target
			.closest(".nav")
			.querySelectorAll(".nav__link");
		const logo = e.target.closest(".nav").querySelector("img");

		siblings.forEach((el) => {
			if (el !== link) {
				el.style.opacity = this;
			}
			logo.style.opacity = this;
		});
	}
};

///////////////////////////////////////
//EVENTS

//Modal Event
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

//Smohe Scroling Event
btnScrollTo.addEventListener("click", function () {
	section1.scrollIntoView({ behavior: "smooth" });
});

//Smohe Scroling To All the Page
navLinks.addEventListener("click", function (e) {
	e.preventDefault();

	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");

		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

//OPERATION TAB
operationsTabContainer.addEventListener("click", function (e) {
	//CHANG THE TAB
	Array.from(operationsTabContainer.children).forEach((el) =>
		el.classList.remove("operations__tab--active")
	);

	const clickedTarget = e.target.closest(".operations__tab");

	if (!clickedTarget) return;

	clickedTarget.classList.add("operations__tab--active");

	//CHANGE THE CONTENT
	operationsContent.forEach((el) =>
		el.classList.remove("operations__content--active")
	);
	document
		.querySelector(`.operations__content--${clickedTarget.dataset.tab}`)
		.classList.add("operations__content--active");
});

//FADING MENU ANIMATHION EVENT
nav.addEventListener("mouseover", opacityFunc.bind("0.5"));
nav.addEventListener("mouseout", opacityFunc.bind("1"));

//STICKY NAVBAR
const navHeghit = nav.getBoundingClientRect().height;
const obsCallback = function (enteries) {
	const [entry] = enteries;

	entry.isIntersecting
		? nav.classList.remove("sticky")
		: nav.classList.add("sticky");
};

const options = {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeghit}px`,
};

const headerObserver = new IntersectionObserver(obsCallback, options);
headerObserver.observe(header);

//DISPLAY SECTIONS ON SCROLL

const sectionObserverCallback = (enteries, observer) => {
	const [entry] = enteries; //beacuse we only have one value in the threshold

	if (!entry.isIntersecting) return;

	entry.target.classList.remove("section--hidden");
	observer.unobserve(entry.target);
};

const sectoionOptions = {
	root: null,
	threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
	sectionObserverCallback,
	sectoionOptions
);

const allSections = document.querySelectorAll(".section");

allSections.forEach((sec) => {
	sectionObserver.observe(sec);
	sec.classList.add("section--hidden");
});

//lazy loding images
const loadImgs = (enteries, observer) => {
	const [entry] = enteries;

	if (!entry.isIntersecting) return;
	entry.target.src = entry.target.dataset.src;

	entry.target.addEventListener("load", function () {
		this.classList.remove("lazy-img");
	});

	//entry.target.classList.remove("lazy-img");
	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImgs, {
	root: null,
	threshold: 0,
	rootMargin: "200px",
});

const imges = document.querySelectorAll(".features img");

imges.forEach((img) => {
	imgObserver.observe(img);
});

//SLIDER
const slider = function () {
	const allSlide = document.querySelectorAll(".slider .slide");
	const btlLeft = document.querySelector(".slider__btn--left");
	const btlRight = document.querySelector(".slider__btn--right");
	const Pagination = document.querySelector(".dots");

	let current = 0;

	//FUNCTIONS
	const getSlide = function (current) {
		allSlide.forEach((slide, index) => {
			slide.style.transform = `translateX(${(index - current) * 100}%)`;
		});
	};
	getSlide(0);

	//GO LEFT
	const nexSlide = function () {
		if (current === allSlide.length - 1) {
			current = 0;
		} else {
			current++;
		}
		getSlide(current);
		changeDot(current);
	};
	//GO RIGHT
	const prevSlide = function () {
		if (current === 0) {
			current = allSlide.length - 1;
		} else {
			current--;
		}
		getSlide(current);
		changeDot(current);
	};

	const changeDot = function (slide) {
		Pagination.querySelectorAll("button").forEach((btn, index) => {
			btn.classList.remove("dots__dot--active");
			if (parseInt(slide) === index) {
				btn.classList.add("dots__dot--active");
			}
		});
	};

	//EVENTS
	btlRight.addEventListener("click", nexSlide);

	btlLeft.addEventListener("click", prevSlide);

	document.addEventListener("keydown", function (e) {
		e.key === "ArrowRight" && nexSlide();
		e.key === "ArrowLeft" && prevSlide();
	});

	//SLIDER DOTS
	allSlide.forEach((_, index) => {
		const dot = document.createElement("button");
		dot.className = "dots__dot";
		dot.dataset.slide = index;
		Pagination.appendChild(dot);

		if (index === 0) {
			dot.className += " dots__dot--active";
		}
	});

	Pagination.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			getSlide(slide);
			changeDot(slide);
		}
	});
};
slider();
