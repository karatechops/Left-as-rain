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
        //var firstSong = getLatest(1, true);
    }
});

/*
 * Setup listeners
 */
function addListeners()
{
    $('#player').click(function()
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
            if (sendToPlayer) sendSongToPlayer(data[0]);
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
    console.log('id: '+id);
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
        url: 'http://leftasrain.com/musica/'+song.song_path+'.mp3'
    });

    Song.currPost = song;

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