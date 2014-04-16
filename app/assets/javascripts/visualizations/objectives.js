$(document).ready(function(){

  var width = 355,
      height = 591;

  var color = d3.scale.category20();

  // configure force graph options
  var force = d3.layout.force()
      .charge(-400)
      .linkDistance(30)
      .linkStrength(.9)
      .size([width, height]);

  // main svg element
  var svg = d3.select("#objectives").append("svg")
      .attr("width", width)
      .attr("height", height);
  var group = svg.append("g")
      .attr("transform", "translate(0, -150)");

  var nodes = [{text: "Rails"}, {text: "OO JS"}, {text: "D3.js"}]

  var node = group.selectAll(".node")
    .data(nodes)
    //data with no corresponding nodes (Right now there are none...)
    .enter().append("g")
    .call(force.drag);
  var background = node.append("circle")
    .attr("r", 12)
    .style("fill", "white")
  var text = node.append("text")
    .attr("y", "5")
    .style("color", "#4b4b4b")
    .style('text-anchor', 'middle')
    .text(function(d) { return d.text; });
  var circle = node.append("circle")
    .attr("id", function(d) {return d.index})
    .attr("class", "node") 
    .attr("r", 64)
    .style("fill", "rgba(255, 255, 255, 0)")
    .style("stroke", "#4b4b4b")
    .style("stroke-width", "4");

  force
    //sets nodes array
    .nodes(nodes)
    .start();

  force.on("tick", function() {
    node.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  });

});
