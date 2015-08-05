<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;
use Session;

use App\Post;

use App\Stream;
use Request;

class StreamController extends Controller {

    public function setupStream($id, $token = null)
    {
        $stream = new Stream();

        if ($id && !$token)
        {
            if (Request::ajax())
            {
                $token = $stream->setToken(str_random(40));
                return ($token);
            } else {
                return('no way jose');
            }
        }

        if ($token != null) $streamToken = $stream->getToken();

        if ($id && $token != null && $token == $streamToken)
        {
            $post = Post::find($id);
            $pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;

            $name = $post->song_path;
            $headers = array(
                'Content-Type: audio/mpeg',
            );
            return response()->download($pathToFile, $name, $headers);
            Session::flush();
            Session::regenerate();
        }
    }

}
