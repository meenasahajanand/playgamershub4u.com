//图片lazy 加载
$(document).ready(function() {
    // Fix lazyLoad class name (some use lazyLoad, some use lazyload)
    $("img.lazyLoad, img.lazyload").each(function() {
        $(this).addClass('lazyload');
    });
    
    // Handle category images separately - check if they exist before loading
    $('.category_list .thum img').each(function() {
        var $img = $(this);
        var $thum = $img.closest('.thum');
        var dataSrc = $img.attr('data-src');
        
        if (dataSrc) {
            // Check if image exists before loading
            var testImg = new Image();
            testImg.onload = function() {
                // Image exists, load it
                $img.attr('src', dataSrc).removeClass('lazyload lazyLoad');
                $img.css('opacity', '1');
            };
            testImg.onerror = function() {
                // Image doesn't exist, hide img and show fallback
                $img.hide();
                $img.css('opacity', '0');
                // Ensure gradient background is visible
                $thum.css({
                    'background-size': 'cover',
                    'background-position': 'center'
                });
            };
            // Start loading check
            testImg.src = dataSrc;
        } else {
            // No data-src, hide image and show fallback
            $img.hide();
        }
    });
    
    // Regular lazy loading for other images (not category images)
    $("img.lazyload").not('.category_list .thum img').lazyload({
        threshold: 0,
        effect: "fadeIn",
        effect_speed: 300
    });
    
    // Handle errors for other images
    $("img.lazyload").not('.category_list .thum img').on('error', function() {
        $(this).hide();
    });
});
//点击出现搜索框
var search_btn = document.getElementById('search_btn');
var search_head = document.getElementById('search_head');
document.addEventListener('click', function(e) {
    if (e.target.className == 'search_btn' || e.target.className == 'iconfont icon-sousuo') {
        $('.hea_l').addClass('actives2');
    } else if ($('.hea_l').hasClass('actives2') && !e.composedPath().includes(search_head)) {
        $('.hea_l').removeClass('actives2');
    }
});
//swiper 
if ($(".preview1").length > 0) {
    var mySwiper = new Swiper('.preview1',{
        // loop: true,
        slidesPerView: 8,
		slidesPerGroup: 8,
        spaceBetween: 28,
        watchSlidesVisibility: true,
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
        // Touch/Swipe settings for mobile
        touchEventsTarget: 'container',
        allowTouchMove: true,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        grabCursor: true,
        // Free mode for smooth scrolling on mobile
        freeMode: false,
        freeModeMomentum: true,
        freeModeMomentumRatio: 0.5,
        freeModeMomentumVelocityRatio: 0.5,
        freeModeSticky: false,
        // Resistance for better touch feel
        resistance: true,
        resistanceRatio: 0.85,
        // Mobile specific settings
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                spaceBetween: 10,
                freeMode: true,
                freeModeMomentum: true,
            },
            768: {
                slidesPerView: 4,
                slidesPerGroup: 2,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 6,
                slidesPerGroup: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 8,
                slidesPerGroup: 8,
                spaceBetween: 28,
            }
        },
        navigation: {
            nextEl: '.swiper-button-n',
            prevEl: '.swiper-button-p',
        },
    })
}

// Screenshot Swiper for Game Detail Pages
if ($(".preview").length > 0 && $(".preview").not(".preview1").length > 0) {
    var screenshotSwiper = new Swiper('.preview', {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 15,
        watchSlidesVisibility: true,
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
        // Touch/Swipe settings
        touchEventsTarget: 'container',
        allowTouchMove: true,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        grabCursor: true,
        freeMode: true,
        freeModeMomentum: true,
        freeModeMomentumRatio: 0.5,
        freeModeMomentumVelocityRatio: 0.5,
        freeModeSticky: false,
        resistance: true,
        resistanceRatio: 0.85,
        // Responsive breakpoints
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                spaceBetween: 15,
                freeMode: true,
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 20,
                freeMode: false,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 25,
            }
        },
        // Navigation
        navigation: {
            nextEl: '.swiper-button-n1',
            prevEl: '.swiper-button-p1',
        },
    });
}

//回到顶部按钮
var backTop = document.querySelector('.top_lea');
document.addEventListener('scroll', function() {
    var scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 100) {
        backTop.style.display = "flex";
    } else {
        backTop.style.display = "none";
    }
});
backTop.addEventListener('click', function() {
    document.documentElement.scrollTop = "0px";
});

// Mouse drag/swipe functionality for Editor's Picks and game lists
(function() {
    function enableDragScroll(element) {
        if (!element) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        let startTime;
        
        // Mouse events
        element.addEventListener('mousedown', function(e) {
            isDown = true;
            element.style.cursor = 'grabbing';
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
            startTime = Date.now();
            e.preventDefault();
        });
        
        element.addEventListener('mouseleave', function() {
            isDown = false;
            element.style.cursor = 'grab';
        });
        
        element.addEventListener('mouseup', function() {
            isDown = false;
            element.style.cursor = 'grab';
        });
        
        element.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            element.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        element.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].pageX - element.offsetLeft;
            touchScrollLeft = element.scrollLeft;
        }, { passive: true });
        
        element.addEventListener('touchmove', function(e) {
            if (!touchStartX) return;
            const x = e.touches[0].pageX - element.offsetLeft;
            const walk = (x - touchStartX) * 1.5;
            element.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            touchStartX = 0;
        });
        
        // Set initial cursor
        element.style.cursor = 'grab';
    }
    
    // Enable drag scroll for all scrollable lists
    $(document).ready(function() {
        // Editor's Picks
        const moreList = document.querySelector('.more .more_list');
        if (moreList) enableDragScroll(moreList);
        
        // Game lists
        const gameLists = document.querySelectorAll('.game_main .game_list, .gameBox .game_list, .box_main .box_r .gameBox .game_list');
        gameLists.forEach(function(list) {
            enableDragScroll(list);
        });
        
        // Similar games lists (game detail pages)
        const similarLists = document.querySelectorAll('.detail .similar .similar_list');
        similarLists.forEach(function(list) {
            enableDragScroll(list);
        });
        
        // RBox game lists (Hot Games section in game detail pages)
        const rboxGameLists = document.querySelectorAll('.detail .boxes .RBox .game_main .game_list');
        rboxGameLists.forEach(function(list) {
            enableDragScroll(list);
        });
    });
})();


