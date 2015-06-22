@extends('backend-app')

@section('content')
    <div class="container">
        <h1>Create Post</h1>
        <hr>
        {!! Form::open() !!}
        <div class="form-group">
            {!! Form::label('title', 'Title (ex. Artist - Song)') !!}
            {!! Form::text('title') !!}

            {!! Form::label('album', 'Album') !!}
            {!! Form::text('album') !!}

            {!! Form::label('description', 'Description') !!}
            {!! Form::textarea('description') !!}
        </div>
    </div>
@endsection