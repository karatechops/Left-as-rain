Playlist = {

    currPost: [],

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
                sendToPlayer ? sendSongToPlayer(data[0], true) : sendSongToPlayer(data[0], false);
            },
            error: function(xhr, textStatus, thrownError) {
                alert('Something went to wrong.Please Try again later...');
            }
        })
    }

}

Player = {

    init: function() {
        soundManager.setup({
            url: '../swf/',
            flashVersion: 9,
            onready: function()
            {
                addListeners();
                Playlist.getLatest(1, false);
            }
        });
    },

    playedSongs:[],
    currSound: soundManager.createSound,

    /*Song: {
        currPost: [],
        currSound: soundManager.createSound
    },*/

    playSong: function()
    {
        this.currSound.play();
        Playlist.highlight(Playlist.currPost.id);
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
    }
}

Player.init();

function addListeners()
    {
    $('.title').click(function()
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

    $('article').click(function()
    {
        if (Playlist.currPost.id != $(this).attr('id') || Player.currSound.playState === 0) {
            var songId = $(this).attr('id');
            getSong(songId, true);
        }
    });

    $('.next-btn').click(function()
    {
        getNextSong(Playlist.currPost.id, true);
    });

    $('.side-bar').click(function(){
        console.log(Player.currSound.duration);
        //soundManager.setPosition(Player.currSound.id,currSound.duration-2500);
    });
}


function getSong(id, sendToPlayer)
{
    $.ajax({
        url: '/getsong/'+id,
        dataType: 'json',
        success: function(data) {
            if (sendToPlayer) sendSongToPlayer(data, true);
        },
        error: function(xhr, textStatus, thrownError) {
            alert('Something went to wrong.Please Try again later...');
        }
    }).done(function() {
        //finished
    });
}

function getNextSong(id, sendToPlayer)
{
    $.ajax({
        url: '/getnextsong/'+id,
        dataType: 'json',
        success: function(data) {
            if (sendToPlayer) getSong(data, true);
        },
        error: function(xhr, textStatus, thrownError) {
            alert('Something went to wrong.Please Try again later...');
        }
    }).done(function() {
        //finished
    });
}


function sendSongToPlayer(song, playSongNow)
{
    if (Player.playedSongs.length >= 1) {
        soundManager.unload('track'+Playlist.currPost.id);
    }

    Player.currSound = soundManager.createSound({
        id: 'track'+song.id,
        url: 'http://leftasrain.com/musica/'+song.song_path+'.mp3',
        onfinish: function()
        {
            getNextSong(song.id, true);
        }
    });

    Playlist.currPost = song;
    if (playSongNow) Player.playedSongs.unshift(Playlist.currPost);
    Player.setPlayerInfo(song.title, song.cover);

    if (playSongNow) Player.playSong();
}