<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;
use Request;
use Session;

use App\Post;

use App\Stream;
use Illuminate\Http\Response;

class StreamController extends Controller {

    private function sendStream($id)
    {
        $post = Post::find($id);
        //$pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;
        $pathToFile = base_path().'/storage/app/mp3/holy-soul.mp3';
        //$pathToFile = base_path().'/public/mp3/holy-soul.mp3';
        $fileSize = filesize($pathToFile);
        $name = $post->song_path;
        $headers = array(
            'Content-Type'=>'audio/mpeg',
            'Pragma'=>'public',
            'Content-Transfer-Encoding' => 'binary',
            'Expires'=> 0,
            'Cache-Control'=> 'must-revalidate, post-check=0, pre-check=0',
            'Filename'=>$name,
            'Connection'=> 'keep-alive'
        );

        return response()->download($pathToFile, $name, $headers);
    }

    public function setupStream($id, $token = null)
    {
        $stream = new Stream();

        if ($token == null) {
            if (Request::ajax()) {
                $token = $stream->setToken(str_random(40));
                return response($token);
            } else {
                return 'no way jose';
            }
        }

        if ($token == $stream->getToken()) {
            return($stream->sendStream($id));
        }
    }



}
