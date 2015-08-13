@extends('app')

@section('content')
    <div class="content-row">
        <div class="content" id="playlist">
            @include('partials.posts-featured', $posts)
        </div>
    </div>
@stop