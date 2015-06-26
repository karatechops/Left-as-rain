<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Post;
use App\PostOld;

class PostsTableSeeder extends Seeder {

    public function run()
    {
        $data = DB::table('playlist')->get();
        Eloquent::unguard();
        foreach($data as $dataSingle) {
            $pathUpdate = $dataSingle->SONG_PATH;
            //settype($pathUpdate, "string");
            $pathUpdate .= '.mp3';
            Post::create([
                'id' => $dataSingle->ENTRY_AUTO,
                'title' => $dataSingle->TITLE,
                'description' => $dataSingle->DESCRIPTION,
                'album' => $dataSingle->ALBUM,
                'song_path' => $pathUpdate,
                'author' => $dataSingle->AUTHOR,
                'cover' => $dataSingle->COVER,
                'slug' => $dataSingle->URL,
                'created_at' => strtotime($dataSingle->POST_DATE),
                'updated_at' => strtotime($dataSingle->POST_DATE)
            ]);
        }
    }

}