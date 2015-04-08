function Playlist (playlistDiv)
{
    this.currPost = [];
    this.playlistDiv = playlistDiv;
    this.events = new EventEmitter();
}

Playlist.prototype = {
    highlight: function(id){
        if (Player.playedSongs.length > 1) $('#'+Player.getPreviousSong()).removeClass('currently-playing');
        $('#'+id).addClass('currently-playing');
    },

    getLatest: function(amount, sendToPlayer)
    {
        $.ajax({
            url: '/getsong/latest/'+amount,
            dataType: 'json',
            success: function(data) {
                sendToPlayer ? Player.sendSongToPlayer(data[0], true) : Player.sendSongToPlayer(data[0], false);
            },
            error: function(xhr, textStatus, thrownError) {
                alert('Something went to wrong.Please Try again later...');
            }
        })
    },

    getMorePosts: function(id, amountToGet)
    {
        $.ajax({
            url: '/getmoresongs/'+id+'/'+amountToGet,
            dataType: 'json',
            success: function(data) {
                console.log('MORE POSTS INCOMING');
                console.log(data);
                Playlist.addPostsToPlaylist(data);
            },
            error: function(xhr, textStatus, thrownError) {
                return('Something went to wrong.Please Try again later...');
            }
        })
    },

    addPostsToPlaylist: function(posts)
    {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        jQuery.each(posts, function(i, post) {
            var date = new Date(post.created_at);
            Playlist.playlistDiv.append('<article id="'+post.id+'"><div class="article-inner"><h1>'+post.title+'</h1><p class="small-info">'+post.author+' on '+monthNames[date.getMonth()]+' '+date.getDay()+' '+date.getFullYear()+'</p><p class="copy">'+post.description+'</p></div></article>');
        });
        Playlist.events.emitEvent('playlistEvent', ['addedPosts']);
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
        debugMode: false
    });
    this.playedSongs = [];
    this.currSound = soundManager.createSound;
    this.visible = false;
    this.events = new EventEmitter();
}

Player.prototype = {

    playSong: function()
    {
        this.pullUpPlayer();
        this.currSound.play();
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

    setPlayerInfo: function(title, cover){
        $('#song-title').text(title);
        $('.cover').css('background-image', 'url(http://www.leftasrain.com/img/covers/'+escape(cover)+')');
    },

    getSong: function(id)
    {
        $.ajax({
            url: '/getsong/'+id,
            dataType: 'json',
            success: function(data) {
                Player.sendSongToPlayer(data, true);
            },
            error: function(xhr, textStatus, thrownError) {
                alert('Something went to wrong.Please Try again later...');
            }
        }).done(function() {
            //finished
        });
    },

    getNextSong: function(id)
    {
        $.ajax({
            url: '/getnextsong/'+id,
            dataType: 'json',
            success: function(data) {
                Player.getSong(data);
            },
            error: function(xhr, textStatus, thrownError) {
                alert('Something went to wrong.Please Try again later...');
            }
        }).done(function() {
            //finished
        });
    },

    sendSongToPlayer: function(song, playSongNow)
    {
        if (Player.playedSongs.length >= 1) {
            soundManager.unload('track'+Playlist.currPost.id);
        }

        Player.currSound = soundManager.createSound({
            id: 'track'+song.id,
            url: 'http://leftasrain.com/musica/'+song.song_path+'.mp3',
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
                Player.getNextSong(song.id);
            }

        });

        Playlist.currPost = song;
        if (playSongNow) Player.playedSongs.unshift(Playlist.currPost);
        Player.setPlayerInfo(song.title, song.cover);

        if (playSongNow) Player.playSong();
    },

    pullUpPlayer: function()
    {
        $('#player').css('bottom', '0');
        $('body').css('padding-bottom', '80px')
    }
}

var Playlist = new Playlist($('#playlist'));
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

    $('.title').click(function()
    {

        var articleElem = '#' + Playlist.currPost.id;
        console.log('Article Element: '+articleElem);

        $('html,body').animate({
            scrollTop: $(articleElem).offset().top - 75
        });
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
            }
            break;
        case 'pause':
            playIcon.removeClass('fa-pause');
            playIcon.addClass('fa-play');
            break;
        case 'resume':
            playIcon.removeClass('fa-play');
            playIcon.addClass('fa-pause');
            break;
    }
}

function playlistEventHandler(e)
{
    switch (e) {
        case 'addedPosts':
            console.log('POSTS ADDED EVENT');
            Waypoint.refreshAll();
            articleListeners();
            break;
    }
}

function articleListeners(){
    Waypoint.destroyAll();
    $('article').click(function()
    {
        if (Playlist.currPost.id != $(this).attr('id') || Player.currSound.playState === 0) {
            var songId = $(this).attr('id');
            Player.getSong(songId);
        }
    });
    var waypoints = $('#playlist article:last').waypoint(function(direction)
    {
        if (direction === 'down') {
            console.log('WAY POINT TRIGGERED');
            var lastId = $('#playlist article:last').attr('id');
            Playlist.getMorePosts(lastId, 10);
        }
    }, {
        triggerOnce: true,
        offset: '99%'
    })
}