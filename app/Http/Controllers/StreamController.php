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
                $sessionToken = str_random(40);
                Session::put('songToken', $sessionToken);
                //$token = Stream::setToken(str_random(40));
                return response($sessionToken);
            } else {
                return 'no way jose';
            }
        }

        if ($token ==  Session::get('songToken') ) {
            //return($stream->sendStream($id));
            $post = Post::find($id);
            $pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;
            //$pathToFile = base_path().'/storage/app/mp3/holy-soul.mp3';
            $fileSize = filesize($pathToFile);
            $size   = filesize($pathToFile);
            $length = $size;
            $start  = 0;
            $end    = $size - 1;
            $name = $post->song_path;
            $headers = array(
                'Content-Type'=>'audio/mpeg',
                'Pragma'=>'public',
                'Content-Transfer-Encoding' => 'binary',
                'Expires'=> 0,
                'Cache-Control'=> 'must-revalidate, post-check=0, pre-check=0',
                'Filename'=>$name,
                'Content-Length'=>$length,
                'Content-Range'=>'bytes '.$start.'-'.$end.'/'.$size,
                'Connection'=> 'keep-alive'
            );

            return response()->download($pathToFile, $name, $headers);
        }
    }


}

