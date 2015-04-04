var PreviousSong = new Object();
var Song = new Object();
Song.currPost = [];
Song.currSound = soundManager.createSound;

soundManager.setup({
    url: '../swf/',
    flashVersion: 9,
    onready: function()
    {
        addListeners();
        getLatest(1, false);
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
            console.log('pausing song');
            pauseSong();
        }
        else if (Song.currSound.paused == true && Song.currSound.playState === 1)
        {
            console.log('playing song');
            resumeSong();
        }

        if (Song.currSound.playState == 0) playSong();

    });

    $('article').click(function()
    {
        if (Song.currPost.id != $(this).attr('id')) {
            var songId = $(this).attr('id');
            getSong(songId, true);
        }
    });

    $('.next-btn').click(function()
    {
        getNextSong(Song.currPost.id, true);
    });
}

/*
 * Gets latest songs
 */
function getLatest(amount, sendToPlayer)
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

/*
 * Gets a particular song by ID.
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

function getNextSong(id, sendToPlayer)
{
    console.log('get next song');
    $.ajax({
        url: '/getnextsong/'+id,
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

/*
 * Sends a song to the player. Bool to play now.
 */
function sendSongToPlayer(song, playSongNow)
{
    if (Song.currSound.playState === 1) {
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
    setPlayerInfo(song.title, song.cover);

    if (playSongNow) playSong();
}

function playSong()
{
    Song.currSound.play();
    highlight(Song.currPost.id);
}

function pauseSong()
{
    Song.currSound.pause();
}

function resumeSong()
{
    Song.currSound.resume();
}

function highlight(id){
    if ('currPost' in PreviousSong) $('#'+PreviousSong.currPost.id).removeClass('currently-playing');
    $('#'+id).addClass('currently-playing');
}

function setPlayerInfo(title, cover){
    $('#song-title').text(title);
    $('.cover').css('background-image', 'url(http://www.leftasrain.com/img/covers/'+cover+')');
    console.log(title);
    console.log(cover);
}