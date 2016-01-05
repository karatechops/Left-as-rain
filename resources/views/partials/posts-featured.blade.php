<?php $i = 0 ?>
<?php $title = ' | '.$posts[0]->title; ?>
@section('title', $title)
@section('description', $posts[0]->description)
@foreach($posts as $post)

    <article id="{{ $post->id }}" class="post @if($i == 0) featured @endif">
        <div class="article-inner">
            <h1>{!! $post->title !!} <a href="/posts/{{ $post->slug }}" class="post-link"><i class="fa fa-link"></i></a></h1>
            <p class="small-info"><span class="name">{{ $post->author }}</span> on {{ date("F d Y",strtotime($post->created_at)) }}</p>
            <p class="copy">
                {!! $post->description !!}
            </p>
        </div>
    </article>
    <?php $i++ ?>
@endforeach