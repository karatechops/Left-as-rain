<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta property="fb:admins" content="39601694"/>
    <meta property="fb:app_id" content="382016265209375"/>
    <meta property="og:image" content="http://leftasrain.com/img/lar_200.jpg"/>
    <meta property="og:title" content="left as rain | Impossibly Chill @yield('title')"/>
    <meta property="og:type" content="blog"/>
    <meta property="og:description" content="A place for Chris Thomas and Alex Mejias to share their feelings."/>
    <meta property="og:url" content="http://www.leftasrain.com/"/>
    <meta name="description" content="A place where Chris Thomas and Alex Mejias share their feelings while playing marginally okay music."/>
    <meta name="google-site-verification" content="PsQQ2QhNwci1R9hrcSLLwAywc4dwGCmT9jp9cpe3XAs" />
    <title>Left as rain | Impossibly Chill</title>

    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">

</head>
<body>
    @include('partials.nav')
    @include('partials.loader')
    <div class="container" id="main">
	    @yield('content')
    </div>
    @include('partials.sidebar')
    @include('partials.player')
    <div class="clearfix"></div>
    <div class="shading"></div>

    <script src="{{ asset('js/modernizr.min.js') }}"></script>
	<script src="{{ asset('js/app.js') }}"></script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-3794332-1', 'auto');
        ga('send', 'pageview');

    </script>
</body>
</html>
