$(document).ready(function () {

  $(".collapse-side-nav").click(function () {
    $(".side-nav__container").toggleClass("collapsed");
    $(".body").toggleClass("collapsed");
  });

    // $(".discovery__tile").mouseover(function(){
    //     $(this).addClass("selected");
    // });
    //
    // $(".discovery__tile").mouseout(function(){
    //     $(this).removeClass("selected");
    // });


    $(".discovery-results__slider").mouseover(function(){
        $(this).addClass("selected-slider");
    });

    $(".discovery-results__slider").mouseout(function(){
        $(this).removeClass("selected-slider");
    });


    $(".cornerFlip").click(function(){
        $(".discovery__tile.selected").addClass('flipped').mouseleave(function(){
            $(this).removeClass('flipped');
        });
        return false;
    });

});
