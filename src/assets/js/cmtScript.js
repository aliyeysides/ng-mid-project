$(document).ready(function () {





// List Carousel


  $("li.list__option").mouseover(function () {
    $(this).addClass("hover");
  });

  $("li.list__option").mouseout(function () {
    $(this).removeClass("hover");
  });


  $("li.list__option").click(function () {
    $("li.list__option").removeClass("selected");
    $(this).addClass("selected");
  });


  $("li.list__option--watching").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--watching").addClass("selected");
    $(".list__title span").removeClass("selected");
    $(".list__title--watching").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--idealist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--IPlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--chartlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--userlist");
  });

  $("li.list__option--holding").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--holding").addClass("selected");
    $(".list__title span").removeClass("selected");
    $(".list__title--holding").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--idealist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--IPlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--chartlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--userlist");
  });

  $("li.list__option--ideasforyou").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--ideasforyou").addClass("selected");
    $(".list__title span").removeClass("selected");
    $(".list__title--ideasforyou").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--userlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--IPlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--chartlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--idealist");
  });

  $("li.list__option--classicbears").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--classicbears").addClass("selected");
    $(".list__title span").removeClass("selected");
    $(".list__title--classicbears").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--idealist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--userlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--chartlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--IPlist");
  });

  $("li.list__option--classicbulls").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--classicbulls").addClass("selected");
    $(".list__title span").removeClass("selected");
    $(".list__title--classicbulls").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--idealist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--userlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--chartlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--IPlist");
  });

  $("li.list__option--selldips").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--selldips").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--idealist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--userlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--IPlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--chartlist");
  });

  $("li.list__option--buyrallies").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--buyrallies").addClass("selected");
    $(".list-view__actionbar").removeClass("list-view__actionbar--idealist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--userlist");
    $(".list-view__actionbar").removeClass("list-view__actionbar--IPlist");
    $(".list-view__actionbar").addClass("list-view__actionbar--chartlist");
  });

  $("li.list__option--largecap").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--largecap").addClass("selected");
  });

  $("li.list__option--add").click(function () {
    $(".list-description span").removeClass("selected");
    $(".list-description--addlist").addClass("selected");
  });


// List Descriptions


  $("li.list__option--holding").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--holding").addClass("hover");
  });

  $("li.list__option--holding").mouseout(function () {
    $(".list-description--holding").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--watching").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--watching").addClass("hover");
  });

  $("li.list__option--watching").mouseout(function () {
    $(".list-description--watching").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--ideasforyou").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--ideasforyou").addClass("hover");
  });

  $("li.list__option--ideasforyou").mouseout(function () {
    $(".list-description--ideasforyou").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--classicbears").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--classicbears").addClass("hover");
  });

  $("li.list__option--classicbears").mouseout(function () {
    $(".list-description--classicbears").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--classicbulls").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--classicbulls").addClass("hover");
  });

  $("li.list__option--classicbulls").mouseout(function () {
    $(".list-description--classicbulls").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--selldips").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--selldips").addClass("hover");
  });

  $("li.list__option--selldips").mouseout(function () {
    $(".list-description--selldips").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--buyrallies").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--buyrallies").addClass("hover");
  });

  $("li.list__option--buyrallies").mouseout(function () {
    $(".list-description--buyrallies").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


  $("li.list__option--largecap").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--largecap").addClass("hover");
  });

  $("li.list__option--largecap").mouseout(function () {
    $(".list-description--largecap").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });

  $("li.list__option--add").mouseover(function () {
    $(".list-description span.selected").addClass("selected-hidden");
    $(".list-description--addlist").addClass("hover");
  });

  $("li.list__option--add").mouseout(function () {
    $(".list-description--addlist").removeClass("hover");
    $(".list-description span.selected").removeClass("selected-hidden");
  });


// Action Bar


  $(".view-toggle--panel-view").click(function () {
    $(this).addClass("active");
    $(".view-toggle--list-view").removeClass("active");
  });

  $(".view-toggle--list-view").click(function () {
    $(this).addClass("active");
    $(".view-toggle--panel-view").removeClass("active");
  });


// List View


  $(".list__entry").mouseover(function () {
    $(this).addClass("hover");
  });

  $(".list__entry").mouseout(function () {
    $(this).removeClass("hover");
  });


  $(".list__entry").click(function () {
    $(".list__entry").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".list__container").sortable({
    axis: "y",
    scroll: true,
    cursor: "move"
  });

// List Sort Menu

  $(".list-sort__button").click(function (e) {
    $(".top-sort-menu.dropdown-menu").toggle("blind", 250);
  });


// List View Stock Options Pop Over


  $(".stock__options-button").click(function (e) {
    var targetOpen = $(this.offsetParent).hasClass("slideOpen");

    // if any slide is open and the target is open, then close them all and return;
    if ($(".slideOpen") && targetOpen) {
      $(".slideOpen").toggle("slide", {direction: "right"}, 250);
      $(".slideOpen").removeClass("slideOpen");
      return;
    }
    // if any slide is open and the target is not open, then close them all
    if ($(".slideOpen") && !targetOpen) {
      $(".slideOpen").toggle("slide", {direction: "right"}, 250);
      $(".slideOpen").removeClass("slideOpen");
    }

    // toggle slide
    $(".list__entry.hover .stock-options__popup").toggle("slide", {direction: "right"}, 250);
    $(".list__entry.hover .stock-options__popup").toggleClass("slideOpen");

    e.stopPropagation();

  });


// Side Bar

  $(".sidebar").sortable({
    axis: "y",
    scroll: true,
    cursor: "move"
  });

  $(".sidebar__panel--sectors .icon-expand").click(function () {
    $(".panel__expand--sectors").toggle();
    $(".sidebar__panel--sectors").toggleClass("open");
  });

  $(".sidebar__panel--alerts .icon-expand").click(function () {
    $(".panel__expand--alerts").toggle();
    $(".sidebar__panel--alerts").toggleClass("open");
  });

  $(".panel__market-data--SPY .icon-expand").click(function () {
    $(".panel__chart--SPY").toggle();
    $(".panel__market-data--SPY").toggleClass("open");
  });

  $(".panel__market-data--DIA .icon-expand").click(function () {
    $(".panel__chart--DIA").toggle();
    $(".panel__market-data--DIA").toggleClass("open");
  });

  $(".panel__market-data--QQQ .icon-expand").click(function () {
    $(".panel__chart--QQQ").toggle();
    $(".panel__market-data--QQQ").toggleClass("open");
  });


  // Get all bars on a page with the following class:
  var bars = $('.sliderBar');

  $.each(bars, function (index, div) {
    // get raw width
    var rawWidth = div.style.width;
    // parse width to int
    var width = parseInt(rawWidth.slice(0, -1));

    if (width <= 25) {
      /* Old browsers */
      $(this).css({
        background: "#EF5A00"
      })
      /* FF3.6-15 */
      $(this).css({
        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 100%)"
      })
      /* Chrome10-25,Safari5.1-6 */
      $(this).css({
        background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 100%)"
      });
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      $(this).css({
        background: "linear-gradient(to right, #e00000 0%,#ef5a00 100%)"
      })
      /* IE6-9 */
      $(this).css({
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#ef5a00',GradientType=1 )"
      })
    } else if (width > 25 && width <= 50) {
      /* Old browsers */
      $(this).css({
        background: "#ffbe00"
      })
      /* FF3.6-15 */
      $(this).css({
        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 50%, #ffbe00 100%)"
      })
      /* Chrome10-25,Safari5.1-6 */
      $(this).css({
        background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 50%,#ffbe00 100%)"
      });
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      $(this).css({
        background: "linear-gradient(to right, #e00000 0%,#ef5a00 50%,#ffbe00 100%)"
      })
      /* IE6-9 */
      $(this).css({
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#ffbe00',GradientType=1 )"
      })
    } else if (width > 50 && width <= 75) {
      /* Old browsers */
      $(this).css({
        background: "#61C600"
      })
      /* FF3.6-15 */
      $(this).css({
        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 33%, #ffbe00 66%, #61c600 100%)"
      })
      /* Chrome10-25,Safari5.1-6 */
      $(this).css({
        background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 33%,#ffbe00 66%,#61c600 100%)"
      });
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      $(this).css({
        background: "linear-gradient(to right, #e00000 0%,#ef5a00 33%,#ffbe00 66%,#61c600 100%)"
      })
      /* IE6-9 */
      $(this).css({
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#61c600',GradientType=1 )"
      })
    } else if (width == 100) {
      /* Old browsers */
      $(this).css({
        background: "#24a300"
      })
      /* FF3.6-15 */
      $(this).css({
        background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 25%, #ffbe00 50%, #61c600 75%, #24a300 100%)"
      })
      /* Chrome10-25,Safari5.1-6 */
      $(this).css({
        background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 25%,#ffbe00 50%,#61c600 75%,#24a300 100%)"
      });
      /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      $(this).css({
        background: "linear-gradient(to right, #e00000 0%,#ef5a00 25%,#ffbe00 50%,#61c600 75%,#24a300 100%)"
      })
      /* IE6-9 */
      $(this).css({
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#24a300',GradientType=1 )"
      })
    }
  });


});
