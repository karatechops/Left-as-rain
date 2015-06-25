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

    public function storeMP3($mp3, $name)
    {
        $mp3->move(storage_path('app/mp3'), $name);
    }

    public function nameMP3($string)
    {
        $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $string);
        $withoutExt = str_slug($withoutExt, '-');
        $withoutExt .= ".mp3";
        return($withoutExt);
    }

}
