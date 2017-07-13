var windowHeight = 0;
var windowWidth = 0;
var siteScreenBlocks = [];

$(document).ready(function() {

    $(window).resize(function() {
        adjustLayout();
    }).resize();

    $(window).scroll(function(){
        windowScroll();
    }).scroll();

    changeSvgToInline();

    // init menus
    $('.cover-menu-link, .sidebar-menu-link').click(function(e) {
        e.preventDefault();
        var target = $('#'+$(this).attr('href').replace('#', ''));
        scrollTo(target);
        menuClose();
    });
    $('.sidebar-menu-title').click(function() {
        scrollTo(0);
    });

    // init screenblocks
    $.each($('.sidebar-menu-link'), function(i, link) {
        var target = $(this).attr('href').replace('#', '');
        $(link).attr('id', 'sidebar-link-' + target);
    });
    $.each($('.site-screen-block'), function(i, block) {
        siteScreenBlocks.push($(block).attr('id'));
    });
    $('.cover-screen-arrow-link').click(function() {
        var target = $('#' + siteScreenBlocks[0]);
        scrollTo(target);
    });
});


function adjustLayout() {
    windowHeight = Math.floor($(window).height()) + 1;
    windowWidth = $(window).width();
    $('.cover-screen').css({'paddingBottom': 0, 'height': windowHeight});
    $('.site-screen-block').css({'min-height': windowHeight});

}

function windowScroll() {
    var pageScrollY = 0;
    if(typeof(window.pageYOffset)=='number') pageScrollY=window.pageYOffset;
    else pageScrollY=document.documentElement.scrollTop;

    if(pageScrollY > windowHeight * 0.5) {
        $('.sidebar-menu').addClass('active');
    } else {
        $('.sidebar-menu').removeClass('active');
    }


    // active screen block
    var activeBlock = '';
    $('.sidebar-menu-link').removeClass('active');
    if(siteScreenBlocks.length > 0) {
        for(i=0; i<siteScreenBlocks.length; i++) {
            var blockId = siteScreenBlocks[i];
            var block = $('#' + blockId);
            if($(block).length) {
                if(pageScrollY >= ($(block).offset().top - (windowHeight * .25))) {
                    activeBlock = blockId;
                }
            }
        }
    }
    if(activeBlock != '') $('#sidebar-link-' + activeBlock).addClass('active');

}

function changeSvgToInline() {

    var browserSvgSupport = (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"));

    if (!browserSvgSupport) {
        $('img[src$=".svg"]').each(function () {
            var $img = $(this);
            var substitude_img = $img.attr('src').replace(/svg$/, 'png');
            if (typeof $img.data('substitude') != 'undefined') substitude_img = $img.data('substitude');
            $img.attr('src', substitude_img).css({'opacity': 1});
        });
    }
    else {

        $('img[src$=".svg"]').each(function () {

            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
                $svg = $svg.removeAttr('xmlns:xlink');

                $svg.css({'opacity': 1});

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');

        });

    }
}

function scrollTo(target) {
    if(typeof(window.pageYOffset)=='number') pageScrollY=window.pageYOffset;
    else pageScrollY=document.documentElement.scrollTop;

    $("html,body").stop();

    if(typeof target == 'number') {
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: target}, 500);
    } else if($(target).length!=0) {
        var scrollTime = 500;
        if(Math.abs($(target).offset().top - pageScrollY) > 1000) scrollTime = 1000;
        if(Math.abs($(target).offset().top - pageScrollY) > 2000) scrollTime = 1500;

        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: ($(target).offset().top)}, scrollTime);
    }
}

var menuStatus = false;
function toggleMenu()
{
    if ( menuStatus == false )
    {
        menuOpen ();
        return true;
    }
    else if ( menuStatus == true )
    {
        menuClose ();
        return true;
    }
}
function menuOpen ()
{
    $('.burger').addClass('opened');
    $('.event-top-menu').addClass('opened');
    menuStatus = true;
}
function menuClose ()
{
    $('.burger').removeClass('opened');
    $('.event-top-menu').removeClass('opened');
    menuStatus = false;
}
