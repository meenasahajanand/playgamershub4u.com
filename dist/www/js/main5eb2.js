//图片lazy 加载
$(document).ready(function() {
    $("img.lazyLoad").lazyload();
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
        navigation: {
            nextEl: '.swiper-button-n',
            prevEl: '.swiper-button-p',
        },
    })
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


