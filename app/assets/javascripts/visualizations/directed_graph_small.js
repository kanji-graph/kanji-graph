$(document).ready(function(){

  var width = 960,
      height = 500;

  var color = d3.scale.category20();

  // configure force graph options
  var force = d3.layout.force()
      .charge(-160)
      .linkDistance(30)
      .linkStrength(.9)
      .size([width, height]);

  // main svg element
  var svg = d3.select("#directed_graph_small").append("svg")
      .attr("width", width)
      .attr("height", height)

  // group for all elements
  var group = svg.append("g")
    .attr("transform", "translate(-100, 0)");

  // AJAX request for JSON
  d3.json("surnames/directed_graph_small", function(error, graph) {
    var nodes = graph.nodes.slice(),
        links = [],
        bilinks = [];

    graph.links.forEach(function(link) {
      var s = nodes[link.source],
          t = nodes[link.target],
          i = {}; // intermediate node for curved links
      nodes.push(i);
      links.push({source: s, target: i}, {source: i, target: t});
      bilinks.push([s, i, t]);
    });

    force
        .nodes(nodes)
        .links(links)
        .start();

    //create links
    var link = group.selectAll(".link")
        .data(bilinks)
      .enter().append("path")
        .attr("class", "link")
        .attr("marker-end", "url(#end_marker)");

    //create nodes (<circle>, <text>, <circle>)
    var node = group.selectAll(".node")
        .data(graph.nodes)
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
          .text(function(d) { return d.name; });
    var circle = node.append("circle")
          .attr("class", "node")
          .attr("r", 12)
          .style("fill", "rgba(255, 255, 255, 0)")
          .style("stroke", "#4b4b4b");

    // create tooltips
    //    1) initialize function tip(vis)
    var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.name }).offset([-7,0]);

    //    2) call in context of svg ???
    d3.select("#directed_graph_small svg").call(tip);

    //    3) bind to node mouseover event
    node.on('mouseover', tip.show)
      .on('mouseout', tip.hide)
    
    // update nodes on tick event 
    force.on("tick", function() {
      link.attr("d", function(d) {
        return "M" + d[0].x + "," + d[0].y
            + "S" + d[1].x + "," + d[1].y
            + " " + d[2].x + "," + d[2].y;
      });
      node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });
  }); // End AJAX Request

});

// Markers
// =======
/*
   svg.append("defs").append("marker")
   .attr("id", "end_marker")
   .attr("viewBox", "0 -5 10 10")
   .attr("refX", 25)
   .attr("refY", -1)
   .attr("markerWidth", 3)
   .attr("markerHeight", 3)
   .attr("orient", "auto")
   .append("path")
   .attr("d", "M0,-5L10,0L0,5");

//marker.append("circle")
// .attr("cx", 6)
//.attr("cy", 6)
//.attr("r", 5);
*/
