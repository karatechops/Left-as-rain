<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
	<title>Left as rain | Impossibly Chill</title>

    <script src="{{ asset('js/modernizr.min.js') }}"></script>
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

	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
