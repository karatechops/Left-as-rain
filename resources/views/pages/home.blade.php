@extends('app')

@section('content')
    <div class="content-row">
        <div class="content" id="playlist">
            @include('partials.posts', $posts)
            <div id="loader"></div>
        </div>
    </div>
@stop