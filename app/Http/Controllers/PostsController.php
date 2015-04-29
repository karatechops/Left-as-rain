<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

use Request;
use Session;
use App\Stream;

class PostsController extends Controller {

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
	public function getPost($id)
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
    public function getLatest($amount =10)
    {
        $posts = Post::orderBy('id', 'desc')->get()->take($amount);
        return view('partials.posts', compact('posts'));
    }

    /**
     * Next song in list.
     *
     * @param int $id
     * @return Response
     */
    public function getNextPost($id)
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
    public function getMorePosts($lastLoadedPostId, $amountToLoad = 10)
    {
        $posts = Post::where('id', '<', $lastLoadedPostId)->orderBy('id', 'desc')->get()->take($amountToLoad);
        return view('partials.posts', compact('posts'));
    }

    /**
     * Used for linking to posts
     *
     * @param $slug
     * @param int $amount
     * @return mixed
     */
    public function getPostsFrom($slug, $amount = 10)
    {
        $post = Post::where('slug', $slug)->get();
        $posts = Post::where('id', '<=', $post[0]->id)->orderBy('id', 'desc')->get()->take($amount);
        return (Request::ajax()) ? view('partials.posts', compact('posts')) : view('pages.home', compact('posts'));
    }

    /**
     * @param int $amount
     * @return \Illuminate\View\View
     */
    public function shuffle($amount = 10)
    {
        $posts = Post::orderBy(\DB::raw('RAND()'))->take($amount)->get();
        return view('pages.home', compact('posts'));
    }

    public function getRandomPosts($amount = 10)
    {
        $posts = Post::orderBy(\DB::raw('RAND()'))->take($amount)->get();
        return view('partials.posts', compact('posts'));
    }

}
