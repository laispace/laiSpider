// init scroller

//window.articlesScroll = new IScroll('.content', {click: true});

// set content's height
function setContentHeight() {
    var headerHeight = $('.bar-header').height();
    var footerHeight = $('.tabs').height();
    var contentHeight = $(window).height() - headerHeight - footerHeight;
    $('.content').height(contentHeight);
}
setContentHeight();
$(window).on('resize', setContentHeight);

// double click title to return top
$('.bar-header').on('tap', function () {
    $('.content').scrollTop(0);
})