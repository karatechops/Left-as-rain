var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
    mix.styles(['public/css/vendor/normalize.css', 'public/css/vendor/font-awesome.css', 'app.css'], null, 'public/css/');
    mix.version('public/css/all.css');
    mix.scripts([
        'jquery-2.1.4.js',
        'jquery.waypoints.min.js',
        'soundmanager2.js',
        'EventEmitter.js',
        'lar-player.js',
        'lar-nav.js',
        'lar-search.js',
    ], 'public/js/app.js', 'resources/assets/js')
});