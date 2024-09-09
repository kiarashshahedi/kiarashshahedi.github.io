$(document).ready(function() {
    // Scroll animation for sections
    $(window).scroll(function() {
        $('.timeline-item').each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass('fade-in');
            }
        });
    });
});
