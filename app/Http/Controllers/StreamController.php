<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;
use Request;
use Session;

use App\Post;

use App\Stream;
use Illuminate\Http\Response;

class StreamController extends Controller {

    public function setupStream($id, $token = null)
    {
        $stream = new Stream();

        if ($token == null) {
           if (Request::ajax()) {
                $sessionToken = $stream->setToken(str_random(40));
                return response($sessionToken);
            } else {
                return 'no way jose';
            }
        }

        if ($token ==  Session::get('songToken') ) {
            return($stream->sendStream($id));
        }
    }


}

