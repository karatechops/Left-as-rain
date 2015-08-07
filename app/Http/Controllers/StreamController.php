<?php namespace App\Http\Controllers;

use Requests;
use App\Http\Controllers\Controller;
use Request;
use Session;

use App\Post;

use App\Stream;
use Illuminate\Http\Response;

class StreamController extends Controller {

    public function setupStream($id)
    {
        if (Request::ajax()) {
            $stream = new Stream();
            $token = $stream->setToken(str_random(40));
            return response($token);
        } else{
            return 'no way jose';
        }
    }

    public function sendStream($id, $token)
    {
        $stream = new Stream();

        //if ($token == $stream->getToken())
        //{
            $post = Post::find($id);
            //$pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;
            //$pathToFile = base_path().'/storage/app/mp3/holy-soul.mp3';
            $pathToFile = base_path().'/public/mp3/holy-soul.mp3';
            $fileSize = filesize($pathToFile);
            $name = $post->song_path;
            $headers = array(
                'Content-Type'=>'audio/mpeg',
                'Content-Disposition'=>'attachment',
                'Pragma'=>'no-cache',
                'Filename'=>$name,
                'Content-Length'=>$fileSize,
                'Content-Range'=>'bytes 0-'.$fileSize.'/'.$fileSize,
                'Connection'=> 'keep-alive',

            );

            return response()->download($pathToFile, $name, $headers);
        //}
    }

}
