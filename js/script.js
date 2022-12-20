"use strict"


document.addEventListener('DOMContentLoaded', function () {
	


	// Меню-бургер
	const iconHeader = document.querySelector('.header__icon');
	const menuHeader = document.querySelector('.header__menu');
	if (iconHeader) {

		iconHeader.addEventListener('click', function (e) {
			// анимация иконки
			iconHeader.classList.toggle('_active');
			menuHeader.classList.toggle('_active');
			// замок на скрол при открытом мобильном меню
			document.body.classList.toggle('_lock');
		})
	};

	//Прокрутка при клике

	let menuLinks = document.querySelectorAll('.menu__link[data-goto]');
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {

			menuLink.addEventListener("click", onMenuLinkClick);
		});

		function onMenuLinkClick(e) {
			const menuLink = e.target;

			//если атрибут дата не пустои и он вообще существует ли объект, на который ссылается дата атрибут
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto);
				//выщитываем положение объекта: координата верхней границы блока + кол-во прокрученных пикселей - высота хедера
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header__menu-wrapper').offsetHeight;
				// Делаем скролл контента по клику на номер разделов в мобаил меню
				//если объект иконки меню содержит класс active(меню открыто), то 
				if (iconHeader.classList.contains('_active')) {
					iconHeader.classList.remove('_active');
					menuHeader.classList.remove('_active');
					// замок на скрол при открытом мобильном меню 110
					document.body.classList.remove('_lock');
				}

				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});

				e.preventDefault();
			}
		}
	}
	//color menu
	document.addEventListener('scroll', () => {
		const headerWrap = document.querySelector('.header__menu-wrapper');
		const header = document.querySelector('header');
		if (window.scrollY > 0 && headerWrap.style.backgroundColor != "rgba(30, 37, 45, 0.9)") {
			headerWrap.style.backgroundColor = "rgba(30, 37, 45, 0.9)";
		}
		if (header.getBoundingClientRect().top === 0) headerWrap.style.backgroundColor = "rgba(0,0,0, 0)";

	});

	//video
	const btnVideo = document.querySelector('.video__btn');
	const playVideo = document.getElementById('selection__video');

	btnVideo.addEventListener('click', () => {
		if (btnVideo){
			playVideo.play();
			btnVideo.style.display = "none";
			playVideo.setAttribute('controls', 'controls');
		}
		
	});

	//form
	const form = document.querySelectorAll('.form');
	
	form.forEach(form => {
		form.addEventListener('submit', formSend);
		
	})
	
	async function formSend(e){
		e.preventDefault();
		
		let error = formValidate(this);
		console.log(error)
	}

	function formValidate(form){
		let error = 0;
		const formReq = Array.from(form.childNodes).filter(item => item.tagName === 'INPUT');
		
		for (let i = 0; i < formReq.length; i++){
			const input = formReq[i];
			formRemoveError(input);

			if (input.classList.contains('phone')) {
				if (telTest(input)) {
					formAddError(input);
					error++;
				}
			}
			
			else{
				if(input.value === ''){
					formAddError(input);
					error++;
				}
			}

			if (input.classList.contains('name')) {
				if (nameTest(input)) {
					formAddError(input);
					error++;
				}
			}
			else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}			
		}
		return error = true
	}

	function formAddError(input){
		
		input.classList.add('error');
	}
	function formRemoveError(input) {
		input.classList.remove('error');
	}

	//test phone
	function telTest(input){
		return !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(input.value);
	}

	//test name
	function nameTest(input) {
		return !/^[a-zA-ZА-Яа-я_-]{3,16}$/.test(input.value);
	}
});




