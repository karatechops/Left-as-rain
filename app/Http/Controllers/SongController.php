<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

use Request;
use Session;
use App\Stream;

class SongController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function getSong($id)
	{
        $song = Post::find($id);
		return ($song);
	}

    /**
     * Display the specified resource.
     *
     * @param  int  $amount
     * @return Response
     */
    public function getLatest($amount)
    {
        $songs = Post::orderBy('id', 'desc')->get()->take($amount);
        return ($songs);
    }

    /**
     * Next song in list.
     *
     * @param int $id
     * @return Response
     */
    public function getNextSong($id)
    {
        $song = Post::where('id', '<', $id)->max('id');
        return($song);
    }

    /**
     * Gets more songs to add to DOM playlist.
     *
     * @param $lastLoadedPostId
     * @param $amountToLoad
     * @return mixed
     */
    public function getMoreSongs($lastLoadedPostId, $amountToLoad)
    {
        $posts = Post::where('id', '<', $lastLoadedPostId)->orderBy('id', 'desc')->get()->take($amountToLoad);
        return($posts);
    }

    public function setupStream($id, $token = null)
    {
        $stream = new Stream();

        if ($id && !$token)
        {
            if (Request::ajax())
            {
                $token = $stream->setToken(str_random(40));
                return ($token);
            } else {
                return('no way jose');
            }
        }
        if ($id && $token != null && $token == $stream->getToken())
        {
            $pathToFile = base_path().'/storage/app/mp3/xx.mp3';
            $name = 'xx.mp3';
            $headers = array(
                'Content-Type: audio/mpeg',
            );
            return response()->download($pathToFile, $name, $headers);
        }

        /*if (Request::ajax())
        {
            $validString = str_random(40);
            Session::put('songToken', $validString);
            return(Session::get('songToken', $validString));
        } else {
            return('nah');
        }*/
    }

}
