var navOpen = false;
var navigating = false;

$('.nav-button').click(function()
{
    (!navOpen) ? openNav() : closeNav();
});

function openNav(){
    $('.nav-button').css('opacity', '1');
    $('.overlay-menu').css('left', '0');
    navOpen = true;
}

function closeNav(){
    $('.nav-button').css('opacity', '0.5');
    $('.overlay-menu').css('left', '-250px');
    navOpen = false;
}

function getContent(section)
{
    loaderFade('in');
    console.log('Navigating to section: '+section);
    if (section != '/')
    {
        $.ajax({
            type: 'get',
            url: section,
            datatype: 'html',
            success: function (data) {
                console.log('section other than home')
                swapContent(data);
            },
            error: function (xhr, textStatus, thrownError) {
                console.log('Something went to wrong.Please Try again later...');
            }
        });
    }

    if (section == '/' && navigating === false)
    {
        console.log('navigating: '+navigating);
        Playlist.home();
    }

    navigating = true;
}

function swapContent(content)
{
    console.log('Swapping content');
    Waypoint.destroyAll();
    $('.content').html(content);
    Playlist.events.emitEvent('playlistEvent', ['addedPosts']);
    Playlist.scrollToTop();
    closeNav();
    loaderFade('out');
}

function postLink(post){

}

function loaderFade(state)
{
    switch(state) {
        case 'in':
            $('.loader-screen').fadeIn();
            break;
        case 'out':
            $('.loader-screen').fadeOut();
            break;
    }
}

var popped = ('state' in window.history), initialURL = location.href;
// ADDING DOUBLE CLICKS
$(window).bind('popstate', function(event) {
    var initialPop = !popped && location.href == initialURL;
    popped = true;
    if ( initialPop ) return;

    var returnLocation = history.location || document.location;
    getContent(returnLocation.pathname);
});

$(document).on("click", "a", function(e) {
    if ($(this).attr("target") != "_blank") {
        e.preventDefault();
        var url = $(this).attr("href");
        History.pushState(null, null, url);
        console.log("Link Clicked");
        getContent(url);
    }
});

function simulateAnchorClick (url)
{
    history.pushState( null, null, url );
    getContent(url);
}

$('#playlist').bind('DOMSubtreeModified', function() {
    loaderFade('out');
});

$('.title').click(function()
{
    var articleId = Playlist.currPost.id;
    var article = $('#' + articleId);
    console.log(Playlist.currPost);

    (article.length) ? Playlist.scrollToPost(articleId) : simulateAnchorClick(Playlist.currPost.slug);
});

