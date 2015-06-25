<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {

	protected $fillable = [
        'title',
        'description',
        'album',
        'song_path',
        'soundcloud_url',
        'author',
        'cover',
        'slug',
    ];

    static function storeMP3($mp3)
    {
        $mp3->move(storage_path('app/mp3'), 'name.mp3');
    }

}
