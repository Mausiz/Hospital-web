document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('menu-open');
    });
});
/*******Services section - Start ********/
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
});
/*******Services section - End ********/

/***************search bar Start ***************/
function searchFunction() {
    let input = document.getElementById('search-bar').value.toLowerCase();
    let sections = document.querySelectorAll('#services');
    let found = false;

    sections.forEach(section => {
        if (section.textContent.toLowerCase().includes(input)) {
            section.scrollIntoView({ behavior: 'smooth' });
            found = true;
        }
    });

    if (!found) {
        alert('No matching products or categories found.');
    }
}

/***************search bar End ***************/


/************* Slider - Start ****************/
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0;
let startX;
let isSwiping = false;
let autoScrollInterval;
let isTransitioning = false;

// Clone all slides
const slideCount = slides.length;
for (let i = 0; i < slideCount; i++) {
    const clone = slides[i].cloneNode(true);
    slider.appendChild(clone);
}

// Update slider width
slider.style.width = `${slideCount * 200}vw`;

function goToSlide(index, transition = true) {
    currentIndex = index;
    updateSlider(transition);
}

function updateSlider(transition = true) {
    slider.style.transition = transition ? 'transform 0.5s ease-in-out, filter 0.5s ease-in-out' : 'none';
    slider.style.filter = 'blur(10px)';
    setTimeout(() => {
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        slider.style.filter = 'blur(0)';
    }, transition ? 250 : 0);
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    if (currentIndex >= slideCount) {
        goToSlide(currentIndex);
        setTimeout(() => {
            goToSlide(0, false);
            currentIndex = 0;
            isTransitioning = false;
        }, 500);
    } else {
        goToSlide(currentIndex);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    resetAutoScroll();
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    if (currentIndex < 0) {
        goToSlide(slideCount - 1, false);
        setTimeout(() => {
            goToSlide(slideCount - 1);
            currentIndex = slideCount - 1;
            isTransitioning = false;
        }, 50);
    } else {
        goToSlide(currentIndex);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    resetAutoScroll();
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextSlide, 5000);
}

// Swipe functionality
slider.addEventListener('touchstart', (e) => {
    if (isTransitioning) return;
    startX = e.touches[0].clientX;
    isSwiping = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isSwiping || isTransitioning) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    slider.style.transform = `translateX(calc(-${currentIndex * 100}vw - ${diff}px))`;
});

slider.addEventListener('touchend', (e) => {
    if (!isSwiping || isTransitioning) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    } else {
        updateSlider();
    }
    isSwiping = false;
});

// Arrow navigation
leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);

// Initial setup
goToSlide(0, false);
resetAutoScroll();

/************* Slider - End ******************/


/************* Location button - Start********/
document.getElementById('external-link-btn').onclick = function() {
    window.location.href = 'https://www.example.com';
};

document.getElementById('show-map-btn').onclick = function() {
    document.getElementById('map-overlay').style.display = 'flex';
    initMap();
};

document.getElementById('close-map-btn').onclick = function() {
    document.getElementById('map-overlay').style.display = 'none';
};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

/************* Location button - End *********/

/************ logo slider - Start ***********/
var copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

/************ logo slider - End ***********/

/*********** scroll to top btn - Start *******/
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

            // Show the button when the user scrolls down 500px from the top
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

            // Scroll to the top when the user clicks the button
scrollToTopBtn.addEventListener("click", function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

/*********** scroll to top btn - End ************/

/*********** Reviews - Start **************/

function initMap() {
    const map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);

    const request = {
        placeId: 'YOUR_PLACE_ID', // Replace with your Google Place ID
        fields: ['reviews']
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayReviews(place.reviews);
        }
    });
}

function displayReviews(reviews) {
    const reviewsGrid = document.getElementById('reviews-grid');
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <img src="${review.profile_photo_url}" alt="Reviewer Avatar" class="reviewer-avatar">
                <div>
                    <div class="reviewer-name">${review.author_name}</div>
                    <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
            </div>
            <p class="review-content">"${review.text}"</p>
        `;
        reviewsGrid.appendChild(reviewCard);
    });
}
/*********** Reviews - End ***************/

/********* Form Submission(AJAX) - Start ******/
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    fetch('process_appointment.php', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show success or error message
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

/********* Form Submission(AJAX) - End ******/