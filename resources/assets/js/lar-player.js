$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    cache: false
});

function Playlist (playlistDiv)
{
    this.playlistDiv = playlistDiv;
    this.currPost = [];
    this.prevPost = 0;

    this.events = new EventEmitter();
    this.postsLoaded = 10;

    this.latestPost;
    this.getLatestPosts(function(posts) { this.latestPost = posts }, 1);

    this.shuffle = this.checkShuffle();
}

Playlist.prototype = {
    highlight: function(id){
        if ( $(".currently-playing").length > 0) {
            var prevElem = $("#playlist").find(".currently-playing");
            prevElem.removeClass('currently-playing');
        }
        $('#'+id).addClass('currently-playing');
    },

    getLatestPosts: function(callback, amount)
    {
        $.ajax({
            url: '/posts/get/latest/'+amount,
            dataType: 'html',
            success: function(data) {
                if(typeof callback === "function") callback(data);
            },
            error: function(xhr, textStatus, thrownError) {
                alert('Something went to wrong.Please Try again later...');
            }
        })
    },

    getMorePosts: function(callback, amount)
    {
        var posts;
        var lastId = $('.content article:last').attr('id');
        if (!lastId) lastId = this.latestPost;

        $.ajax({
            url: '/posts/get/more/'+lastId+'/'+amount,
            dataType: 'html',
            success: function(data) {
                posts = data;
                if(typeof callback === "function") callback(posts);
            },
            error: function(xhr, textStatus, thrownError) {
                return('Something went to wrong.Please Try again later...');
            }
        })
    },

    addPostsToPlaylist: function(posts)
    {
        Playlist.playlistDiv.append(posts);
        this.postsLoaded = ($(".content > article").length)
        Playlist.events.emitEvent('playlistEvent', ['addedPosts']);
    },

    getNextPostId: function () {
        var currPostElem = $('#'+this.currPost.id);
        var nextPostId = currPostElem.next('article').attr('id');
        return nextPostId;
    },

    checkShuffle: function()
    {
        var string = 'playlists/shuffle';
        return(window.location.toString().indexOf(string) > -1);
    },

    /*postsToTracklist: function()
    {
        var list = [];
        $('.content article').each(function(index){
            list.push($(this).attr('id'));
        });
        return list;
    },*/

    scrollToPost: function(id)
    {
        $('html,body').animate({
         scrollTop: $('#'+id).offset().top - 75
         });
    },

    clear: function()
    {
        this.playlistDiv.html('');
        this.scrollToTop();
    },

    scrollToTop: function()
    {
        $("html, body").animate({ scrollTop: 0 });
    },

    active: function()
    {
        if ($(".post").length ) return true;
    }

}

function Player()
{
    soundManager.setup({
        url: '../swf/',
        flashVersion: 9,
        onready: function()
        {
            addListeners();
        },
        debugMode: true
    });
    this.playedSongs = [];
    this.currSound = soundManager.createSound;
    this.visible = false;
    this.events = new EventEmitter();
    this.streamUrl = '';
}

Player.prototype = {

    playSong: function()
    {
        this.pullUpPlayer();
        Player.currSound.play();
        if (!this.visible) Playlist.highlight(Playlist.currPost.id);
    },

    pauseSong: function()
    {
        this.currSound.pause();
    },

    resumeSong: function()
    {
        this.currSound.resume();
    },

    getPreviousSong: function()
    {
        var previousSong = Player.playedSongs[1].id;
        return (previousSong);
    },

    playPreviousSong: function()
    {
        if (Player.playedSongs.length > 1){
            var getString = '/posts/get/'+Player.playedSongs[1].id;
            $.get( getString, function( post ) {
                Player.sendSongToPlayer(post, true, true);
            });
            Player.playedSongs.splice(1,1);
        }
        console.table(Player.playedSongs);
    },

    setPlayerInfo: function(title, cover){
        $('#song-title').html(title);
        //$('.cover').css('background-image', 'url(http://www.leftasrain.com/img/covers/'+escape(cover)+')');
    },

    getSong: function(id)
    {
        Playlist.shuffle =  Playlist.checkShuffle();
            $.ajax({
                type: 'GET',
                url: '/posts/get/' + id,
                success: function (data) {
                    Player.streamSong(data, true);
                },
                error: function (xhr, textStatus, thrownError) {
                    console.log('xhr:' + xhr.error);
                    console.log('textStatus:' + textStatus);
                    console.log('thrownError:' + thrownError);
                }
            })
    },

    getNextSong: function(id)
    {
        var currId = Playlist.currPost.id;

        if (Playlist.active()) {
            // extend playlist if there's no track to play.
            if($('#'+currId).next('article').length == 0 && $('#'+currId).length == 1) {
                Playlist.getMorePosts(function (posts) {
                    Playlist.addPostsToPlaylist(posts);
                    Player.getSong(Playlist.getNextPostId());
                }, 10);
            }

            // check for played track in current list, check if there's a track to play.
            if ($('#'+Playlist.currPost.id).length && $('#'+currId).next('article').length > 0)  {
                Player.getSong(Playlist.getNextPostId());
            } else {
                $.get( '/posts/get/'+currId+'/next', function( id ) {
                    Player.getSong(id);
                })
            }
        }

        if (!Playlist.active() && !Playlist.shuffle) {
            $.get( '/posts/get/'+id+'/next', function( id ) {
                Player.getSong(id);
            });
        } else if (!Playlist.active() && Playlist.shuffle) {
            $.get( '/posts/get/shuffle/1', function( post ) {
                Player.getSong(post[0].id);
            });
        }
    },

    streamSong: function(song, playSongNow, previousSong)
    {
        $.ajax({
            url: '/streamsong/'+song.id,
            type: 'get',
            success: function(data) {
                var stream = '/streamsong/'+song.id+'/'+data;
                Player.sendSongToPlayer(song, playSongNow, previousSong, stream);
            },
            error: function(xhr, textStatus, thrownError) {
                console.log('Something went to wrong.Please Try again later...');
            }
        });
    },

    sendSongToPlayer: function(song, playSongNow, previousSong, stream)
    {
        if (Player.playedSongs.length >= 1) {
            soundManager.unload('track'+Playlist.currPost.id);
        }

        var randomString = (Math.floor(Math.random() * (999 - 100 + 1)) + 100);

        if(Player.currSound.id) soundManager.unload(Player.currSound.id);
        console.log(song.song_path);
        Player.currSound = soundManager.createSound({
            id: 'track'+song.id+'_'+randomString,
            url: stream,
            type: 'audio/mp3',
            onplay: function()
            {
                Player.events.emitEvent('playerEvent', ['play']);
            },
            onresume: function()
            {
                Player.events.emitEvent('playerEvent', ['resume']);
            },
            onpause: function()
            {
                Player.events.emitEvent('playerEvent', ['pause']);
            },
            onfinish: function()
            {
                Player.events.emitEvent('playerEvent', ['next']);
                Player.getNextSong(Playlist.currPost.id, true);
            }

        });

        Playlist.currPost = song;
        if (playSongNow && !previousSong ) Player.playedSongs.unshift(Playlist.currPost);
        Player.setPlayerInfo(unescape(song.title), song.cover);

        Player.playSong();
    },

    pullUpPlayer: function()
    {
        $('#player').css('bottom', '0');
        $('body').css('padding-bottom', '80px');
        $('.shading').css('margin-bottom', '78px');
        $('.shading').css('height', '15%');
    }
}

var Playlist = new Playlist($('.content'));
var Player = new Player();

function addListeners()
{
    $('#play').click(function()
    {
        if (Player.currSound.paused == false && Player.currSound.playState === 1)
        {
            Player.pauseSong();
        }
        else if (Player.currSound.paused == true && Player.currSound.playState === 1)
        {
            Player.resumeSong();
        }

        if (Player.currSound.playState == 0) Player.playSong();

    });

    $('#next').click(function()
    {
        Player.getNextSong(Playlist.currPost.id, true);
    });

    $('#previous').click(function(){
       Player.playPreviousSong();
    });

    Player.events.addListener('playerEvent', playerEventHandler);
    Playlist.events.addListener('playlistEvent', playlistEventHandler);

    articleListeners();
}

function playerEventHandler(e)
{
    var playIcon = $('#play i');
    switch (e) {
        case 'play':
            if (playIcon.hasClass( "fa-play" )) {
                playIcon.removeClass('fa-play');
                playIcon.addClass('fa-pause');
            };
            //removeLoader();
            break;
        case 'pause':
            playIcon.removeClass('fa-pause');
            playIcon.addClass('fa-play');
            break;
        case 'resume':
            playIcon.removeClass('fa-play');
            playIcon.addClass('fa-pause');
            break;
        case 'next':
            break;
    }
}

function playlistEventHandler(e)
{
    switch (e) {
        case 'addedPosts':
            //console.log('addedPosts Event Handler: Adding Listeners and highlighting');
            articleListeners();
            Playlist.highlight(Playlist.currPost.id);
            break;
    }
}

function articleListeners(){
    if (Playlist.active()) {
        Waypoint.destroyAll();
        $('article').click(function () {

            if (Playlist.currPost.id != $(this).attr('id') || Player.currSound.playState === 0) {
                // Initialize audio on click to bypass iOS restrictions.
                if(typeof Player.currSound.playState === 'undefined'){
                    var mySound1 = soundManager.createSound({
                        id: 'init',
                        url: '/mp3/blank.mp3',
                        autoplay: true,
                        onfinish: function()
                        {
                            Player.events.emitEvent('playerEvent', ['next']);
                            Player.getNextSong(Playlist.currPost.id, true);
                        }
                    });
                    soundManager.unload('init');
                };

                var songId = $(this).attr('id');
                Player.getSong(songId);
            }

        });

        $('article a').click(function (e) {
            e.stopPropagation();
            if ($(this).attr('class') == 'post-link') {
                //console.log('Post link clicked');
                e.preventDefault();
                simulateAnchorClick($(this).attr('href'));
            }
        });

        // Make sure links in articles open in new window.
        $('article p a').attr('target', '_blank');

        var waypoints = $('.content article:last').waypoint(function (direction) {
            if (direction === 'down') {
                var posts = Playlist.getMorePosts(function (posts) {
                    Playlist.addPostsToPlaylist(posts);
                }, 10);
            }
        }, {
            triggerOnce: true,
            offset: '99%'
        });
    }
}