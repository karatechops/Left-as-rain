<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
	<title>Left as rain | Impossibly Chill</title>

    <link rel="stylesheet" href="{{ elixir('css/all.css') }}"
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
	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="{{ asset('js/jquery.waypoints.min.js') }}"></script>
    <script src="{{ asset('js/EventEmitter.js') }}"></script>
    <script src="{{ asset('/js/soundmanager2.js') }}"></script>
    <script src="{{ asset('/js/lar-player.js') }}"></script>
    <script src="{{ asset('/js/lar-nav.js') }}"></script>
</body>
</html>
