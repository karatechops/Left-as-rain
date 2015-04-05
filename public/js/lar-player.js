var Song = {
    currPost: [],
    currSound: soundManager.createSound
};
var PreviousSong = {};
Playlist = {
    /**
     * Set copy and image in player.
     * @param title
     * @param cover
     */
    setPlayerInfo: function(title, cover){
        $('#song-title').text(title);
        $('.cover').css('background-image', 'url(http://www.leftasrain.com/img/covers/'+escape(cover)+')');
    },
    /**
     * Add highlight to selected track.
     * @param id
     */
    highlight: function(id){
        if (Player.playedSongs.length > 1) $('#'+Player.playedSongs[Player.playedSongs.length-1].id).removeClass('currently-playing');
        $('#'+id).addClass('currently-playing');
    },

    /**
     * Get latest tracks in playlist.
     *
     * @param amount
     * @param sendToPlayer
     */
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
    playedSongs:[],

    playSong: function()
    {
        Song.currSound.play();
        Playlist.highlight(Song.currPost.id);
    },

    pauseSong: function()
    {
        Song.currSound.pause();
    },

    resumeSong: function()
    {
        Song.currSound.resume();
    }
}

/**
 * Setup player
 */
soundManager.setup({
    url: '../swf/',
    flashVersion: 9,
    onready: function()
    {
        addListeners();
        Playlist.getLatest(1, false);
    }
});

/*
 * Setup listeners
 */
function addListeners()
{
    $('.title').click(function()
    {
        if (Song.currSound.paused == false && Song.currSound.playState === 1)
        {
            Player.pauseSong();
        }
        else if (Song.currSound.paused == true && Song.currSound.playState === 1)
        {
            Player.resumeSong();
        }

        if (Song.currSound.playState == 0) Player.playSong();

    });

    $('article').click(function()
    {
        if (Song.currPost.id != $(this).attr('id') || Song.currSound.playState === 0) {
            var songId = $(this).attr('id');
            getSong(songId, true);
        }
    });

    $('.next-btn').click(function()
    {
        getNextSong(Song.currPost.id, true);
    });

    $('.side-bar').click(function(){
        console.log(Song.currSound.duration);
        soundManager.setPosition(Song.currSound.id,Song.currSound.duration-2500);
    });
}

/**
 * Get song by ID, send to player to play now.
 *
 * @param id
 * @param sendToPlayer
 */
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

/**
 * Get next song in playlist
 *
 * @param id
 * @param sendToPlayer
 */
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


/**
 * Send the requested song to the player.
 *
 * @param song
 * @param playSongNow
 */
function sendSongToPlayer(song, playSongNow)
{
    if (Player.playedSongs.length >= 1) {
        soundManager.unload('track'+Song.currPost.id);
        PreviousSong.currPost = Song.currPost;
    }

    Song.currSound = soundManager.createSound({
        id: 'track'+song.id,
        url: 'http://leftasrain.com/musica/'+song.song_path+'.mp3',
        onfinish: function()
        {
            getNextSong(song.id, true);
        }
    });

    Song.currPost = song;
    if (playSongNow) Player.playedSongs.unshift(Song.currPost);
    Player.setPlayerInfo(song.title, song.cover);

    if (playSongNow) playSong();
}