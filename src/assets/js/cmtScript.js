$(document).ready(function(){

    $(".list-sort__button--arc").click(function(){
        $(this).addClass("active");
        $(".list-sort__button--alpha").removeClass("active");
        $(".list-sort__button--drop").removeClass("active");
    });

    $(".list-sort__button--alpha").click(function(){
        $(this).addClass("active");
        $(".list-sort__button--arc").removeClass("active");
        $(".list-sort__button--drop").removeClass("active");
    });

    $(".list-sort__button--drop").click(function(){
        $(this).addClass("active");
        $(".list-sort__button--alpha").removeClass("active");
        $(".list-sort__button--arc").removeClass("active");
    });

    

});