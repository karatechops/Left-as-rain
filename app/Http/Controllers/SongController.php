<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

use Illuminate\Http\Request;

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
    public function getNextSong($id) {
        $song = Post::where('id', '<', $id)->max('id');
        return($song);
    }

    public function getMoreSongs($lastLoadedPostId, $amountToLoad) {
        $posts = Post::where('id', '<', $lastLoadedPostId)->orderBy('id', 'desc')->get()->take($amountToLoad);
        return($posts);
    }

}
