@foreach($searchResults as $post)
    <li class="search-result">
        <h1><a href="/posts/{{ $post->slug }}" class="post-link">{!! $post->title !!}</a></h1>
        <p class="small-info"><span class="name">{{ $post->author }}</span> on {{ date("F d Y",strtotime($post->created_at)) }}</p>
    </li>
@endforeach