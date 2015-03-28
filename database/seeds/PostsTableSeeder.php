<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Post;
use App\PostOld;

class PostsTableSeeder extends Seeder {

    public function run()
    {
        $data = PostOld::all();
        Eloquent::unguard();
        foreach($data as $dataSingle) {
            Post::create([
                'id' => $dataSingle->ENTRY_AUTO,
                'title' => $dataSingle->TITLE,
                'description' => $dataSingle->DESCRIPTION,
                'album' => $dataSingle->ALBUM,
                'song_path' => $dataSingle->SONG_PATH,
                'author' => $dataSingle->AUTHOR,
                'cover' => $dataSingle->COVER,
                'slug' => $dataSingle->URL,
                'created_at' => strtotime($dataSingle->POST_DATE),
                'updated_at' => strtotime($dataSingle->POST_DATE)
            ]);
        }
    }

}