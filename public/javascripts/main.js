// init scroller


// set content's height
function setContentHeight() {
    var headerHeight = $('.ui-header').height();
    var footerHeight = $('.ui-footer').height();
    var contentHeight = $(window).height() - headerHeight - footerHeight;
    $('.ui-content').height(contentHeight);
}
setContentHeight();
window.articlesScroll = new IScroll('.ui-content', {click: true});

$(window).on('resize', setContentHeight);
