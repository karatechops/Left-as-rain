<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Session;

class Stream extends Model {

    /**
     * @var string
     */
	public $token = '';

    /**
     * Sets up song token for one time use.
     *
     * @param $token
     */
    public function setToken($token)
    {
        Session::flush();
        Session::forget('songToken');
        Session::set('songToken', $token);
        return($token);
    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        return(Session::get('songToken'));
    }


}
