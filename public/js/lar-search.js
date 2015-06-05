$('.search-button').on('click', function(e){
    searchBoxToggle();
});

$("#search-form").submit(function(e){
    return false;
});

$('#search-query').on('input', function() {
    var query = $(this).val();
    if(query.length >= 3) {
        var getString = '/search/'+query;
        $.get( getString, function( results ) {
            $('.search-list').html(results);
            searchListeners();
        });
    } else {
        // Disable submit button
    }
});

function searchBoxToggle() {
    var searchOpacity = $('.search-overlay').css('opacity');
    if ( searchOpacity == 0) {
        $('.search-overlay').css({display: "block"});
        $('.search-overlay').animate({ opacity: "1" }, 350);
        $("body").css({ overflow: 'hidden' });
    } else {
        $("body").css({ overflow: 'inherit' });
        $('.search-overlay').animate({ opacity: "0" }, 350, function() {
            $('.search-overlay').css({display: "none"});
            $('#search-query').val('');
            $('.search-list').html('');
        });
    }
}
function searchListeners() {
    $('.search-result h1 a').on('click', function(e){
        searchBoxToggle();
    });
}