// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    
    material: true,
});


var $$ = Dom7;

var mySwiperSlow = myApp.swiper('.swiper-slow', {
  pagination:'.swiper-slow .swiper-pagination',
  speed: 600
});

var mySwiper3 = myApp.swiper('.swiper-3', {
  slidesPerView: 'auto',
  centeredSlides: true,
  pagination:'.swiper-3 .swiper-pagination',
  spaceBetween: 10,
  slidesPerView: 1
});


// 加载flag
var loading = false;
 
// 上次加载的序号
var lastIndex = $$('.news-list li').length;
 
// 最多可加载的条目
var maxItems = 20;
 
// 每次加载添加多少条目
var itemsPerLoad = 5;

// 注册'infinite'事件处理函数
$$('.infinite-scroll').on('infinite', function () {
 
  // 如果正在加载，则退出
  if (loading) return;
 
  // 设置flag
  loading = true;
 
  // 模拟1s的加载过程
  setTimeout(function () {
    // 重置加载flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // 加载完毕，则注销无限加载事件，以防不必要的加载
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // 删除加载提示符
      $$('.infinite-scroll-preloader').remove();
      return;
    }
 
    // 生成新条目的HTML
    var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      html += '<li><a href="#" class="item-content">' +
     ' <div class="item-media"><img src="images/tmp/img1.jpg" width="150"></div> ' +
      '<div class="item-inner text-right">'+
       ' <div class="item-title-row">'+
        '  <div class="item-title">华本企业家走进喜蚨投融，探讨“金融+...</div>'+
       ' </div>'+
         ' <div class="item-subtitle">临空尽上中朝鸭绿江景，坐卧...</div>'+
         ' <div class="item-text">-05.14-</div> '+
      '</div></a> </li>';
    }
 
    // 添加新条目
    $$('.news-list ul').append(html);
 
    // 更新最后加载的序号
    lastIndex = $$('.news-list li').length;
  }, 1000);
});          




























