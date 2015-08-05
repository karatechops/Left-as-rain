<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;

use App\Post;

use Session;
use App\Stream;
use Request;

class StreamController extends Controller {

    public function setupStream($id, $token = null)
    {
        $stream = new Stream();

        /*if ($id && !$token)
        {
            if (Request::ajax())
            {
                $token = $stream->setToken(str_random(40));
                return ($token);
            } else {
                return('no way jose');
            }
        }*/
        //if ($id && $token != null && $token == $stream->getToken())
        //{
            $post = Post::find($id);
            return($post);
            $pathToFile = base_path().'/storage/app/mp3/'+$post.songPath;
            $name = $post.songPath;
            $headers = array(
                'Content-Type: audio/mpeg',
            );
            return response()->download($pathToFile, $name, $headers);
        //}
    }

}
