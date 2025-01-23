$(document).ready(function ($) {
    "use strict";


    var book_table = new Swiper(".book-table-img-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,
        effect: "coverflow",
        coverflowEffect: {
            rotate: 3,
            stretch: 2,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        },
        loopAdditionSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var team_slider = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 2000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

// Add this to your existing ScrollTrigger setup
ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
});

const bannerImg = document.querySelector('.banner-img'); // Make sure the selector matches your HTML

const images = [
    'assets/images/bt1.jpg',
    'assets/images/bt3.jpg',
    'assets/images/bt2.jpg'
];

let currentIndex = 0;

// Function to cycle images
function cycleImages() {
    if (bannerImg) {
        bannerImg.style.backgroundImage = `url(${images[currentIndex]})`;
        currentIndex = (currentIndex + 1) % images.length;
    } else {
        console.error('Banner image element not found');
    }
}

// Start cycling images every 3 seconds
setInterval(cycleImages, 3000);

// Call the function once to display the first image immediately
cycleImages();

$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('.header-menu a').on('click', function(event) {
        event.preventDefault(); // Prevent default anchor click behavior
        var target = $(this).attr('href'); // Get the target section ID
        // Check if the target exists before scrolling
        if ($(target).length) {
            $('html, body').stop().animate({
                scrollTop: $(target).offset().top // Animate scroll to the target section
            }, 800); // Duration of the scroll animation in milliseconds
        }
    });
});
// Function to handle logout with fade-out effect
function handleLogout(event) {
    event.preventDefault(); // Prevent default link behavior

    // Add fade-out class to the body
    document.body.classList.add('fade-out');

    // Wait for the transition to complete before redirecting
    setTimeout(() => {
        window.location.href = 'login-page/index.html'; // Redirect to login page
    }, 500); // Match the timeout duration with the CSS transition duration
}

// Update the logout link to call the handleLogout function
document.querySelector('.dropdown-menu li:last-child a').addEventListener('click', handleLogout);
document.getElementById('user-button').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click event from bubbling up
    const menu = document.getElementById('dropdown-menu');
    const userButton = document.getElementById('user-button');
    
    // Toggle the dropdown visibility
    if (menu.style.display === 'block') {
        menu.style.display = 'none'; // Hide dropdown
        userButton.classList.remove('show-hamburger'); // Show user icon
    } else {
        menu.style.display = 'block'; // Show dropdown
        userButton.classList.add('show-hamburger'); // Show hamburger icon
    }
});

// Optional: Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdown-menu');
    const userButton = document.getElementById('user-button');
    if (!userButton.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none'; // Close the menu
        userButton.classList.remove('show-hamburger'); // Show user icon
    }
});
