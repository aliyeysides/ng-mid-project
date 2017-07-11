// $(document).ready(function() {
//         // Get all bars on a page with the following class:
//         var bars = $('.sliderBar');
//
//         $.each(bars, function(index, div) {
//             // get raw width
//             var rawWidth = div.style.width;
//             // parse width to int
//             var width = parseInt(rawWidth.slice(0, -1));
//
//             if (width <= 25) {
//                 /* Old browsers */
//                 $(this).css({
//                         background: "#EF5A00"
//                     })
//                     /* FF3.6-15 */
//                 $(this).css({
//                         background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 100%)"
//                     })
//                     /* Chrome10-25,Safari5.1-6 */
//                 $(this).css({
//                     background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 100%)"
//                 });
//                 /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
//                 $(this).css({
//                         background: "linear-gradient(to right, #e00000 0%,#ef5a00 100%)"
//                     })
//                     /* IE6-9 */
//                 $(this).css({
//                     filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#ef5a00',GradientType=1 )"
//                 })
//             } else if (width > 25 && width <= 50) {
//                 /* Old browsers */
//                 $(this).css({
//                         background: "#ffbe00"
//                     })
//                     /* FF3.6-15 */
//                 $(this).css({
//                         background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 50%, #ffbe00 100%)"
//                     })
//                     /* Chrome10-25,Safari5.1-6 */
//                 $(this).css({
//                     background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 50%,#ffbe00 100%)"
//                 });
//                 /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
//                 $(this).css({
//                         background: "linear-gradient(to right, #e00000 0%,#ef5a00 50%,#ffbe00 100%)"
//                     })
//                     /* IE6-9 */
//                 $(this).css({
//                     filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#ffbe00',GradientType=1 )"
//                 })
//             } else if (width > 50 && width <= 75) {
//                 /* Old browsers */
//                 $(this).css({
//                         background: "#61C600"
//                     })
//                     /* FF3.6-15 */
//                 $(this).css({
//                         background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 33%, #ffbe00 66%, #61c600 100%)"
//                     })
//                     /* Chrome10-25,Safari5.1-6 */
//                 $(this).css({
//                     background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 33%,#ffbe00 66%,#61c600 100%)"
//                 });
//                 /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
//                 $(this).css({
//                         background: "linear-gradient(to right, #e00000 0%,#ef5a00 33%,#ffbe00 66%,#61c600 100%)"
//                     })
//                     /* IE6-9 */
//                 $(this).css({
//                     filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#61c600',GradientType=1 )"
//                 })
//             } else if (width == 100) {
//                 /* Old browsers */
//                 $(this).css({
//                         background: "#24a300"
//                     })
//                     /* FF3.6-15 */
//                 $(this).css({
//                         background: "-moz-linear-gradient(left, #e00000 0%, #ef5a00 25%, #ffbe00 50%, #61c600 75%, #24a300 100%)"
//                     })
//                     /* Chrome10-25,Safari5.1-6 */
//                 $(this).css({
//                     background: "-webkit-linear-gradient(left, #e00000 0%,#ef5a00 25%,#ffbe00 50%,#61c600 75%,#24a300 100%)"
//                 });
//                 /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
//                 $(this).css({
//                         background: "linear-gradient(to right, #e00000 0%,#ef5a00 25%,#ffbe00 50%,#61c600 75%,#24a300 100%)"
//                     })
//                     /* IE6-9 */
//                 $(this).css({
//                     filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e00000', endColorstr='#24a300',GradientType=1 )"
//                 })
//             }
//         });
//
//
//
//         /** CHART COLLAPSE FUNCTION **/
//         function toggleCharts(id1, id2) {
//             var btn = $(this),
//                 btnText = btn.text().replace(/\s/g,'').toLowerCase();
//
//             // change 'view table' to 'view chart'
//             if (btnText === 'viewtable') {
//                 btn.text('View Chart');
//             } else if (btnText === 'viewchart') {
//                 btn.text('View Table');
//             }
//
//             // toggle id1
//             $('#' + id1).toggle();
//             // toggle id2
//             $('#' + id2).toggle();
//         }
//
//         $('#view-chart-1').click(function(){
//             toggleCharts.call(this, 'earningsGrowth-chart', 'earningsGrowth-table');
//         });
//
//         $('#view-chart-2').click(function(){
//             toggleCharts.call(this, 'earningsSurprise-chart', 'earningsSurprise-table');
//         });
//
//
//         $('#view-chart-3').click(function(){
//              toggleCharts.call(this, 'epsQuarterly-chart', 'epsQuarterly-table')
//         });
//
//         $('#view-chart-4').click(function(){
//              toggleCharts.call(this, 'epsYearly-chart', 'epsYearly-table')
//         });
//
//         $('#view-chart-5').click(function(){
//              toggleCharts.call(this, 'expertsEstimate-chart', 'expertsEstimate-table')
//         });
//
//         $('#view-chart-6').click(function(){
//              toggleCharts.call(this, 'expertsAnalyst-chart', 'expertsAnalyst-table')
//         });
//
//
//
// });
