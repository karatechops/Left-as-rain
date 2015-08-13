<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Session;
use App\Post;
use Illuminate\Http\Response;

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
        Session::flash('songToken', $token);
        return($token);
    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        return(Session::get('songToken'));
    }

    public function sendStream($id)
    {
        $post = Post::find($id);
        $pathToFile = base_path().'/storage/app/mp3/'.$post->song_path;
        //$pathToFile = base_path().'/storage/app/mp3/holy-soul.mp3';
        $fileSize = filesize($pathToFile);
        $name = $post->song_path;
        $headers = array(
            'Content-Type'=>'audio/mpeg',
            'Pragma'=>'public',
            'Content-Transfer-Encoding' => 'binary',
            'Expires'=> 0,
            'Cache-Control'=> 'must-revalidate, post-check=0, pre-check=0',
            'Filename'=>$name,
            'Content-Length'=>$fileSize,
            'Connection'=> 'keep-alive'
        );

        return response()->download($pathToFile, $name, $headers);
    }


}
