<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;

use App\Post;

use App\Stream;
use Illuminate\Http\Response;

class StreamController extends Controller {

    public function setupStream(Request $request)
    {
        if ($request->ajax()) {
            $stream = new Stream();
            $token = $stream->setToken(str_random(40));
            $ts = gmdate("D, d M Y H:i:s") . " GMT";
            return response($token)
                ->header('Pragma', 'no-cache')
                ->header('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
                ->header('Vary', 'accept')
                ->header('Expires', $ts)
                ->header('Last-Modified', $ts);
        }
    }

    public function sendStream($id, $token)
    {
        $stream = new Stream();

        if ($token == $stream->getToken())
        {
            $post = Post::find($id);
            $pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;

            $name = $post->song_path;
            $ts = gmdate("D, d M Y H:i:s") . " GMT";
            $headers = array(
                'Pragma'=>'no-cache',
                'Cache-Control'=>'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                'Content-Type'=>'audio/mpeg',
                'Vary'=>'accept',
                'Expires'=>$ts,
                'Last-Modified'=>$ts,
            );

            return response()->download($pathToFile, $name, $headers);
        }
    }

}
