@extends('backend-app')

@section('content')
    <div class="container">
        <h1>Create Post</h1>
        <hr>
        @include('errors.list')
        {!! Form::open(
            array(
            'files' => true
            )
        ) !!}
        <div class="form-group">
            {!! Form::label('title', 'Title (ex. Artist - Song)') !!}
            {!! Form::text('title') !!}

            {!! Form::label('album', 'Album') !!}
            {!! Form::text('album') !!}

            {!! Form::label('description', 'Description') !!}
            {!! Form::textarea('description') !!}

            {!! Form::label('soundcloud_url', 'Soundcloud URL') !!}
            {!! Form::text('soundcloud_url') !!}

            {!! Form::label('song_path', 'MP3') !!}
            {!! Form::file('song_path'), null !!}

            <hr>

            {!! Form::submit('Post', ['class' => 'btn btn-primary form-control']) !!}
        </div>
        {!! Form::close() !!}
    </div>
@endsection