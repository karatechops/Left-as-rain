<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'PagesController@index');
Route::get('/about', 'PagesController@about');
Route::get('/pages/get/{url}/', 'PagesController@get');
Route::resource('/pages', 'PagesController');

Route::get('/playlists/shuffle/{amount?}', 'PostsController@shuffle');

Route::get('/posts/{slug}', 'PostsController@getPostsFrom');
Route::get('/posts/get/latest/{amount?}', 'PostsController@getLatest');
Route::get('/posts/get/{id}', 'PostsController@getPost');
Route::get('/posts/get/{id}/next', 'PostsController@getNextPost');
Route::get('/posts/get/more/{lastLoadedPostId}/{amount?}', 'PostsController@getMorePosts');
Route::get('posts/get/shuffle/{amount?}', 'PostsController@getRandomPosts');

Route::get('/streamsong/{id}/{token?}', 'StreamController@setupStream');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
