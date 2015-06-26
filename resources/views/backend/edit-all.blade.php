@extends('backend-app')

@section('content')
    <div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Confirm Delete</h4>
                </div>

                <div class="modal-body">
                    <p>You are about to delete a track. Don't fuck up, Chris.</p>
                    <p>Are you sure?</p>
                    <p class="debug-url"></p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-danger btn-ok">Delete</a>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <h1>Posts</h1>
        <hr>
    @foreach($posts as $post)
        <article id="{{ $post->id }}" class="post">
            <div class="article-inner">
                <h2>{!! $post->title !!} <a href="/posts/{{ $post->slug }}" class="post-link">link</a></h2>
                <p class="small-info"><span class="name">{{ $post->author }}</span> on {{ date("F d Y",strtotime($post->created_at)) }}</p>
                <p class="copy">
                    {!! $post->description !!}
                </p>
                <button class="btn btn-danger" data-href="/delete.php?id=54" data-toggle="modal" data-target="#confirm-delete">
                    Delete
                </button>
            </div>
        </article>
    @endforeach
    </div>
    <script>
        $('#confirm-delete').on('show.bs.modal', function(e) {
            $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

            $('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
        });
    </script>
@endsection