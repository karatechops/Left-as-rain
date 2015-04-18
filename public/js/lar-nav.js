var navOpen = false;

$('.nav-button').click(function()
{
    (!navOpen) ? openNav() : closeNav();
});

$('#about').click(function()
{
    getContent('about');
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
    if (section != '/')
    {
        $.ajax({
            type: 'get',
            url: section,
            datatype: 'html',
            success: function (data) {
                swapContent(data);
            },
            error: function (xhr, textStatus, thrownError) {
                alert('Something went to wrong.Please Try again later...');
            }
        });
    }

    if (section == '/')
    {
        goHome();
    }
}

function swapContent(content)
{
    $('.content').html(content);
    closeNav();
    loaderFade('out');
}

function goHome()
{
    Playlist.getLatestPosts(function(posts) {
        Playlist.clear();
        Playlist.addPostsToPlaylist(posts);
        Playlist.highlight(Playlist.currPost.id);
        closeNav();
    }, Playlist.postsLoaded);
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

var popped = ('state' in window.history), initialURL = '/';

$(window).bind('popstate', function(event) {
    var initialPop = !popped && location.href == initialURL;
    popped = true;
    if ( initialPop ) return;

    var returnLocation = history.location || document.location;
    getContent(returnLocation.pathname);
});

$(document).on("click", "a", function(e) {
    e.preventDefault();
    hrefURL = $(this).attr("href");
    var url = hrefURL;
    console.log(url);
    history.pushState( null, null, this.href );
    getContent(url);
});

function simulateAnchorClick (id)
{
    hrefURL = '/posts/'+id;
    var url = hrefURL;
    history.pushState( null, null, this.href );
    getContent(url);
}

(function(window,undefined){
    History.Adapter.bind(window,'statechange',function(){
        var State = History.getState();
    });
})(window);

$('#playlist').bind('DOMSubtreeModified', function() {
    loaderFade('out');
});

$('.title').click(function()
{
    var articleId = Playlist.currPost.id;
    var article = $('#' + articleId);

    (article.length) ? Playlist.scrollToPost(articleId) : simulateAnchorClick(articleId);
});