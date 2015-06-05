<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;

use Illuminate\Http\Request;

class SearchController extends Controller {

    /**
     * @param $query
     * @return mixed
     */
	public function search($query)
	{
        $searchResults = Post::where('title', 'LIKE', "%$query%")->get();
		return view('partials.search-results', compact('searchResults'));
	}

}
