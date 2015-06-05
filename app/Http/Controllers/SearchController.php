<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

use Illuminate\Http\Request;

class SearchController extends Controller {

    /**
     * @param $term
     * @return mixed
     */
	public function search($term)
	{
        $searchResults = Post::where('title', 'LIKE', "%$term%")->get();
		return view('partials.search', compact('searchResults'));
	}

}
