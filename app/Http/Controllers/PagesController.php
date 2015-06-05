<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;
use App\Page;

use Request;

class PagesController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $posts = Post::orderBy('id', 'desc')->get()->take(10);
        return view('pages.home', compact('posts'));
	}

    /**
     * Returns either data or page depending on request type.
     *
     * @return \Illuminate\View\View
     */
	public function about()
    {
        return (Request::ajax()) ? view('partials.about') : view('pages.about');
    }

    public function show($url)
    {
        $page = Page::where('slug', '=', $url)->firstOrFail();
        return view('pages.page', compact('page'));
    }

    public function store($data)
    {

    }

    public function get($url)
    {
        $page = Page::where('slug', '=', $url)->firstOrFail();
        return view('partials.page', compact('page'));
    }

}
