<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;
use Session;

use App\Post;

use App\Stream;
use Request;
use Response;

class StreamController extends Controller {

    public function setupStream($id, $token = null)
    {
        $stream = new Stream();

        if ($id && $token == null)
        {
            if (Request::ajax())
            {
                $token = $stream->setToken(str_random(40));
                return ($token);
            } else {
                return('no way jose');
            }
        }

        if ($token == $stream->getToken())
        {
            $post = Post::find($id);
            $pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;

            $name = $post->song_path;
            $ts = gmdate("D, d M Y H:i:s") . " GMT";
            $headers = array(
                'Pragma: no-cache',
                'Cache-Control: no-cache, no-store',
                'Content-Type: audio/mpeg',
                'Expires: '.$ts,
                'Last-Modified: '.$ts,
            );

            return Response::download($pathToFile, $name, $headers);
        }
    }

}
