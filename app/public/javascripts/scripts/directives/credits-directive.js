angular.module('VisApp')
  .directive('credits',['d3Service', '$window', '$interval', 
    function(d3Service, $window, $interval) {
    console.log('credits directive called');
    
    return {
      restrict : 'EA',
      scope: {
        data: '='
      },
      link : link
    };

    function link (scope, element, attrs){
      var word = scope.data.split('');
      //     wordLen = word.length,
      //     count = 0;

      // //wait for d3 service to doad
      d3Service.d3().then(function(d3){
        //var word = "autumn".split("");
        var width = d3.select('body').node().offsetWidth ,
            height = 100;

        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(48," + (height / 2) + ")");

        scope.$watch('data', function(){
          if(!data) return;
          return scope.render(data);
        });

        function update(data) {
          //count++;
          // if (count === word.length){
          //   $interval.cancel();
          // }


          // DATA JOIN Join new data with existing elements, if any.
          var text = svg.selectAll("text")
              .data(data);

          // ENTER Create new elements as needed.
          text.enter().append("text")
              .attr("class", "slateblue namefont")
              .attr("dy", "-2em")
              .attr("y", -10)
              .attr("x", function(d, i) { return (i * 28); })
              .style('font-size', "30px")
              .style("fill-opacity", 1e-6)
              .text(function(d) { return d; })
            .transition()
              .duration(4000)
              .attr("y", 100)
              .style("fill-opacity", 1);
        }

        // The initial display.
        update(word);
        // console.log(word.length);
        // var alphaAdd = [];

        // // $interval(function(){
        // //   alphaAdd.push(word[count]);
        // //   update(alphaAdd);
        // //   }, 1000
        // // )
        // // .then(stop);

        // var stop = function(){
        //   console.log(arguments);
        //   if (count === word.length){
        //     $interval.cancel();
        //   }
        // }

        // var go = setInterval(function(){
        //   alphaAdd.push(word[i]);
        //   update(alphaAdd);
        //   i++
        // }, 1000);
    
      }); 
    }    
}]);
