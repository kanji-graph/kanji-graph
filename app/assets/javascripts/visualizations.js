$(document).ready(function(){

d3.json("/surnames/histogram", function(error, json) {
  if (error) return console.warn(error);
  window.our_json = json;
  draw_histogram(json);
});


function draw_histogram(json) {
  var data = json;

  var x = d3.scale.linear()
      .domain([0, max_property_value(json, 'value')])     //d3.max(+data.value)
      .range([0, 580]);

  d3.select(".chart")
    .selectAll("div")
      .data(data)
    .enter().append("div")
      .style("width", function(d) { console.log(d.value); return x(d.value) + "px";  })
      .html(function(d) { return d.kanji + "<span>" + d.value + "</span>"; });
  }
});


function max_property_value(object_array, property) {
  var curr_max = 0;
  for (i = 0; i < object_array.length; i++) {
    if (object_array[i][property] > curr_max) {
      curr_max = object_array[i][property];
    }
  }
  return curr_max;  // wow.
}