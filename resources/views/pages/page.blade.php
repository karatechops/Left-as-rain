@extends('app')

@section('content')
    <div class="content-row">
        <div class="content" id="playlist">
            <article class="page">
                <h1>{{ $page->title }}</h1>
                <p class="copy">
                    {!! $page->body !!}
                </p>
            </article>
            <div id="loader"></div>
        </div>
    </div>
@stop