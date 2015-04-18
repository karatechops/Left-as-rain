@foreach($posts as $post)
    <article id="{{ $post->id }}">
        <div class="article-inner">
            <h1>{{ $post->title}}</h1>
            <p class="small-info">{{ $post->author }} on {{ date("F d Y",strtotime($post->created_at)) }}</p>
            <p class="copy">
                {{ $post->description }}
            </p>
        </div>
    </article>
@endforeach