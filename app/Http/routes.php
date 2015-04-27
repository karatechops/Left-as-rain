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
Route::resource('/pages', 'PagesController');
Route::get('/posts/{slug}', 'PostController@getPostsFrom');

Route::get('/posts/get/latest/{amount?}', 'PostController@getLatest');
Route::get('/posts/get/{id}', 'PostController@getPost');
Route::get('/posts/get/{id}/next', 'PostController@getNextPost');
Route::get('/posts/get/more/{lastLoadedPostId}/{amountToLoad?}', 'PostController@getMorePosts');

Route::get('/streamsong/{id}/{token?}', 'StreamController@setupStream');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
