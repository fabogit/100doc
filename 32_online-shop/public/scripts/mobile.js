const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu() {
	mobileMenuElement.classList.toggle('open');
}

// event listener, when button is clicked it toggle the menu to show/hide,
// adding/removing class open to mobile-menu
mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);