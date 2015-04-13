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

Route::get('/', 'PageController@index');

Route::get('/getsong/latest/{amount}', 'SongController@getLatest');
Route::get('/getsong/{id}', 'SongController@getSong');
Route::get('/getnextsong/{id}', 'SongController@getNextSong');
Route::get('/getmoresongs/{lastLoadedPostId}/{amountToLoad}', 'SongController@getMoreSongs');
Route::get('/streamsong/{id}/{token?}', 'SongController@setupStream');
//Route::get('/streamsong/{id}/{token?}', 'SongController@startStream');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
