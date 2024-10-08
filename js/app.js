//язык
const lang = document.querySelector('.header__lang');
const itemLang = document.querySelector('.header__item-lang-active');
const other = document.querySelector('.header__other-lang');
const bodyLang = document.querySelector('body');
if (lang) {
	lang.addEventListener("click", function (e) {
		other.classList.toggle('header__other-lang-click');
		itemLang.classList.toggle('header__item-lang-click');
	});
}
if (bodyLang) {
	bodyLang.addEventListener("mouseout", function (e) {
		other.classList.remove('header__other-lang-click');
		itemLang.classList.remove('header__item-lang-click');
	});
}

//подменю услуги
const dropdown = document.querySelector('.dropdown');
const dropdownLists = document.querySelector('.dropdown__lists');
const bodyList = document.querySelector('body');
if (dropdown) {
	dropdown.addEventListener("click", function (e) {
		dropdownLists.classList.toggle('dropdown__lists-active');
	});
}
if (bodyList) {
	bodyList.addEventListener("mouseout", function (e) {
		dropdownLists.classList.remove('dropdown__lists-active');
	});
}

//Меню бургер
const menuBurger = document.querySelector('.icon-menu');
const menuNav = document.querySelector('.menu__nav-contacts');
const menuBody = document.querySelector('body');
const slogan = document.querySelector('.header__slogan');

if (menuBurger) {
	menuBurger.addEventListener("click", function (e) {
		menuBurger.classList.toggle('menu-open');
		menuNav.classList.toggle('menu__nav-contacts-active');
		menuBody.classList.toggle('lock');
		slogan.classList.toggle('header__slogan-none');
	});
}

document.querySelectorAll('.anchor').forEach((el) => (
	el.addEventListener('click', () => {
				menuBurger.classList.remove('menu-open');
				menuNav.classList.remove('menu__nav-contacts-active');
				menuBody.classList.remove('lock');
				slogan.classList.remove('header__slogan-none');
	})
));

// //Плавный скрол к блоку якоря
document.querySelectorAll("a[href^='#scroll']").forEach(link => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		let href = this.getAttribute("href").substring(1);
		const scrollTarget = document.getElementById(href);
		const topOffset = 10;
		// const topOffset = 0; // если не нужен отступ сверху
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: "smooth"
		});
	});
})


//Класс на меню при скролле
const mainNav = document.querySelector('.header__head-fixed');
const headerBody = document.querySelector('body');
window.onscroll = function () {
	windowScroll();
};
function windowScroll() {
	mainNav.classList.toggle("fix-block", mainNav.scrollTop > 41 || document.documentElement.scrollTop > 41);
	headerBody.classList.toggle("header-fixed-active", headerBody.scrollTop > 41 || document.documentElement.scrollTop > 41);
}

//video
document.querySelectorAll('.main__video').forEach((el) => (
	el.addEventListener('click', () => {
		let wrapperVideo = el.firstElementChild;
		let btnStop = el.lastElementChild;

		document.querySelectorAll('.main__video').forEach(
			(child) => child.classList.add('main__video-active')
		);

		if (btnStop) {
			btnStop.classList.add('main__play-video-active');
		}
		if (wrapperVideo) {
			wrapperVideo.controls = "controls";
			
		}
		if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
			wrapperVideo.play();
		}
	})
));
var videoPlaying = null;
const onPlay = function () {
	if (videoPlaying && videoPlaying != this) {
		videoPlaying.pause()
	}
	videoPlaying = this
}

//popup
const popups = document.querySelectorAll('.popup');
const popupButton = document.querySelectorAll('.click-me');
const body = document.body;
//Скачок у попапа
const popupWrapper = document.querySelectorAll('.popup-survey__wrapper');
//убрать скрол для фикс-блока
const fixBlock = document.querySelectorAll('.fix-block');//класс для фиксблоков
// убрать скрол
let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
let marginOffset = document.body.offsetWidth - window.innerWidth + 'px';

function openPopup(elem) {
	elem.classList.add('popup-open');
	body.classList.add('lock');
	// убрать скрол
	document.body.style.paddingRight = paddingOffset;
	//убрать скрол для фикс-блока
	fixBlock.forEach((el) => {
		el.style.paddingRight = paddingOffset;
	})
	//Скачок у попапа
	popupWrapper.forEach((el) => {
		el.style.marginLeft = marginOffset;
	})
}
//закрытие
function closePopup(e) {
	if (e.target.classList.contains('popup-survey__close') || e.target.closest('.popup-survey__close') || e.target.classList.contains('popup-survey__wrapper')) {
		e.target.closest('.popup-survey').classList.remove('popup-open');
		body.classList.remove('lock');
		// Вернуть скрол
		document.body.style.paddingRight = '0px';
		//убрать скрол для фикс-блока
		fixBlock.forEach((el) => {
			el.style.paddingRight = '0px';
		});
		//Скачок у попапа
		popupWrapper.forEach((el) => {
			el.style.marginLeft = 'auto';
		})
	}
}
//открытие попапа
popupButton.forEach(btn => {
	btn.addEventListener('click', (e) => {
		let data = e.target.dataset.popupOpen;

		popups.forEach(popup => {
			if (popup.dataset.popup == data || popup.dataset.popup == e.target.closest('.click-me').dataset.popupOpen) {
				openPopup(popup);
			}
		})
	})
})

popups.forEach(popup => {
	popup.addEventListener('click', e => closePopup(e))
})
//popup-end

//анимация
const animItems = document.querySelectorAll('.animation');//Класс по которуму сработает анимация
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 2; //анимация сработает когда 1\4 блока станет видна

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if(animItemHeight > window.innerHeight){
				animItemPoint = window.innerHeight - innerHeight / animStart;
			}

			if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset <(animItemOffset+animItemHeight)){
				animItem.classList.add('animation-active');
			}else{
				//отключем повтор анимации
				if(!animItem.classList.contains('animation-no-hide')){
					animItem.classList.remove('animation-active');
				}
			}
		}
	}
	
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	animOnScroll();
}



//Слайдер
//<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
//<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на странице СЛАЙДЕР УСЛУГИ
	if (document.querySelector('.services__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.services__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 1100,
			loop: true,
			// effect:'flip',
			// flipEffect:{
			// 	slideShadows:false,
			// 	limitRotation:true
			// },
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					spaceBetween: 30,
				},
				768: {
					spaceBetween: 30,
				},
			},
		});
	}

	//слайдер преимущества
	if (document.querySelector('.advantages-mobile__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.advantages-mobile__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 1100,
			loop: true,
			// effect:'flip',
			// flipEffect:{
			// 	slideShadows:false,
			// 	limitRotation:true
			// },
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 30,
				},
				600: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			},
		});
	}
}
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});

//tabs
document.querySelectorAll('.tabs-advantages__tab').forEach((item) => {
	item.addEventListener('mouseover', function (e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('/', '');

		document.querySelectorAll('.tabs-advantages__tab').forEach(
			(child) => child.classList.remove('tabs-advantages__tab-active')
		);
		document.querySelectorAll('.tabs-advantages__body').forEach(
			(child) => child.classList.remove('tabs-advantages__body-active')
		);
		document.querySelectorAll('.animatin-tabs').forEach(
			(child) => child.classList.remove('animatin-tabs')
		);

		item.classList.add('tabs-advantages__tab-active');
		document.getElementById(id).classList.add('tabs-advantages__body-active');
	});
});

document.querySelectorAll('.tabs-advantages__tab').forEach((item) => {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('/', '');

		document.querySelectorAll('.tabs-advantages__tab').forEach(
			(child) => child.classList.remove('tabs-advantages__tab-active')
		);
		document.querySelectorAll('.tabs-advantages__body').forEach(
			(child) => child.classList.remove('tabs-advantages__body-active')
		);
		document.querySelectorAll('.animatin-tabs').forEach(
			(child) => child.classList.remove('animatin-tabs')
		);

		item.classList.add('tabs-advantages__tab-active');
		document.getElementById(id).classList.add('tabs-advantages__body-active');
	});
});
//tabs