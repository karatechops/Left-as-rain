var navOpen = false;

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
    //console.log('Navigating to section: '+section);
    if (section != '/')
    {
        if(~section.indexOf('/pages/')){
            var page = (section.substr(section.lastIndexOf('/') + 1));
            section = '/pages/get/'+page;
            //console.log('Section for API: '+section);
        }

        if(~section.indexOf('/playlists/')){
            section = '/partials/get/shuffle/10';
            //console.log('Section for API: '+section);
        }

        $.ajax({
            type: 'get',
            url: section,
            datatype: 'html',
            success: function (data) {
                swapContent(data);
            },
            error: function (xhr, textStatus, thrownError) {
                //console.log('Something went to wrong in getContent.');
            }
        });
    }

    if (section == '/')
    {
        home();
        closeNav();
    }
}

function swapContent(content)
{
    //console.log('Swapping content');
    Waypoint.destroyAll();
    $('.content').html(content);
    Playlist.events.emitEvent('playlistEvent', ['addedPosts']);
    Playlist.scrollToTop();
    closeNav();
    loaderFade('out');
    setActiveLocation();
}

function home()
{
    Playlist.getLatestPosts(function(posts) {
        //console.log('Playlist home function');
        Playlist.clear();
        Playlist.addPostsToPlaylist(posts);
        Playlist.highlight(Playlist.currPost.id);
        setActiveLocation();
    }, 10);
    Playlist.scrollToTop;
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

window.addEventListener("popstate", function(e) {
    // Get State value using e.state
    getContent(location.pathname);
});

$(document).on("click", "a", function(e) {
    if ($(this).attr("target") != "_blank") {
        e.preventDefault();
        var url = $(this).attr("href");
        getContent(url);
        history.pushState(null, null, url);
        //console.log("Pushing State: "+url);
        //History.pushState(null, null, "?state=4");
        //getContent(url);
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
    (article.length) ? Playlist.scrollToPost(articleId) : simulateAnchorClick('/posts/'+Playlist.currPost.slug);
});

function setActiveLocation(){
    var path = location.pathname;
    //console.log('Set active location: '+path);
    var listItems = $(".nav-list li a");

    listItems.each(function(idx, link) {
        var navLink = $(link);
        navLink.removeClass('active');
    });

    if (path != '/') {
        if (~path.indexOf('/pages/about')) {
            $('#about a').addClass('active');
        }

        if (~path.indexOf('/pages/contact')) {
            $('#contact a').addClass('active');
        }

        if (~path.indexOf('/posts')) {
            //$('#home a').addClass('active');
        }

        if (~path.indexOf('/playlists/')) {
            $('#shuffle a').addClass('active');
        }
    }

    if (path == '/' || path == '') {
        $('#home a').addClass('active');
    }

}

setActiveLocation();