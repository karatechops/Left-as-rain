<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Left as rain</title>

    <link rel="stylesheet" href="{{ elixir('css/all.css') }}"
</head>
<body>
    @include('partials.nav')
    <div class="container">
	    @yield('content')
    </div>
    <div class="side-bar">
        <div class="side-bar-content">
            <p>Sidebar Content</p>
            <img src="/img/banner-test.jpg">
        </div>
    </div>
    @include('partials.player')
    <div class="clearfix"></div>
	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="{{ asset('/js/soundmanager2.js') }}"></script>
    <script src="{{ asset('/js/lar-player.js') }}"></script>
</body>
</html>
