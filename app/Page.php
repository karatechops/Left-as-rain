<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {

	protected $fillable = [
        'title',
        'body',
        'published_at'
    ];

    protected $dates = ['published_at'];

    function setSlugAttribute($title) {
        $this->attributes['slug'] = Str::slug($title);
    }

}
