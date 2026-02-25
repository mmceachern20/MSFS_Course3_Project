function togglemenu() {
    const navList = document.querySelector('.nav-list');
    const burger = document.getElementById('hamburger');
    if (!navList || !burger) return;
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    navList.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(!expanded));
}

// wait for DOM to be ready before attaching listeners and initializing
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('hamburger');
    if (burgerBtn) {
        burgerBtn.addEventListener('click', togglemenu);
    }
    // start collapsed regardless of screen width
});

// smooth scrolling for in-page navigation
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// project filter functionality
function filterprojects(category) {
    const items = document.querySelectorAll('#projects [data-category]');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
    // update button active state
    document.querySelectorAll('.filter-controls button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === category);
    });
}

// initialize to show all
filterprojects('all');

// contact form validation
function showError(input, message) {
    const errorSpan = document.getElementById(`${input.id}-error`);
    input.classList.add('error');
    if (errorSpan) errorSpan.textContent = message;
}

function clearError(input) {
    const errorSpan = document.getElementById(`${input.id}-error`);
    input.classList.remove('error');
    if (errorSpan) errorSpan.textContent = '';
}

function validateInput(input) {
    if (!input.checkValidity()) {
        if (input.validity.valueMissing) {
            showError(input, 'This field is required.');
        } else if (input.validity.typeMismatch) {
            showError(input, 'Please enter a valid value.');
        } else {
            showError(input, 'Invalid input.');
        }
        return false;
    } else {
        clearError(input);
        return true;
    }
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    ['input', 'blur'].forEach(event => {
        contactForm.addEventListener(event, function(e) {
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                validateInput(target);
            }
        }, true);
    });

    contactForm.addEventListener('submit', function(e) {
        let valid = true;
        ['name', 'email', 'message'].forEach(id => {
            const field = document.getElementById(id);
            if (field && !validateInput(field)) valid = false;
        });
        if (!valid) {
            e.preventDefault();
        }
    });
}

// lightbox functionality for project images
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.querySelector('.modal-close');

function showLightbox(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
}

modalClose.addEventListener('click', closeLightbox);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeLightbox();
    }
});

// attach click listeners to project images
document.querySelectorAll('#projects img').forEach(img => {
    img.addEventListener('click', function() {
        showLightbox(this.src, this.alt);
    });
});
