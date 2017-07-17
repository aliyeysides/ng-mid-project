$(document).ready(function(){





    $(".slide__1 .modal__button, .step--addlist").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__2").addClass("selected");
    });

    $(".slide__2 .modal__button, .step--idealist").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__3").addClass("selected");
    });

    $(".slide__3 .modal__button, .step--keyfeatures, .feature-1").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__4").addClass("selected");
    });

    $(".slide__4 .modal__button, .feature-2").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__5").addClass("selected");
    });

    $(".slide__5 .modal__button, .feature-3").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__6").addClass("selected");
    });

    $(".slide__6 .modal__button, .feature-4").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__7").addClass("selected");
    });

    $(".slide__7 .modal__button, .feature-5").click(function(){
        $(".modal__content").removeClass("selected");
        $(".modal__content.slide__8").addClass("selected");
    });



    $(".button__add").click(function(){
        $(".list__option:hover").addClass("add");
    });

    $(".button__remove").click(function(){
        $(".list__option:hover").removeClass("add");
    });

    $(".modal__close, .modal__skip, .slide__8 .modal__button").click(function(){
        $(".modal__container").css("display", "none");
    });

});