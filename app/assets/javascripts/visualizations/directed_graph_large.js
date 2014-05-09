$(document).ready(function(){

  var width = 776,
      height = 800;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-80)
      .linkDistance(30)
      .linkStrength(.9)
      .size([width, height]);

  var svg = d3.select("#directed_graph_large").append("svg")
      .attr("width", width)
      .attr("height", height);

  // !!! Diagram's position on page
  var group = svg.append("g")
    .attr("transform", "translate(0, 0)")

  d3.json("surnames/directed_graph_large", function(error, graph) {
    var nodes = graph.nodes.slice(),
        links = [],
        bilinks = [];

    graph.links.forEach(function(link) {
      var s = nodes[link.source],
          t = nodes[link.target],
          i = {}; // intermediate node
      nodes.push(i);
      links.push({source: s, target: i}, {source: i, target: t});
      bilinks.push([s, i, t]);
    });

    force
        .nodes(nodes)
        .links(links)
        .start();

    var link = group.selectAll(".link")
        .data(bilinks)
      .enter().append("path")
        .attr("class", "link")
        .attr("source", function(d) {return d[0].index})
        .attr("target", function(d) {return d[2].index})
        .attr("marker-end", "url(#end_marker)");

    var node = group.selectAll(".node")
        .data(graph.nodes)
      .enter().append("g");
    var background = node.append("circle")
          .attr("r", 12)
          .style("fill", "white")
    var text = node.append("text")
          .attr("y", "5")
          .style("color", "#4b4b4b")
          .style('text-anchor', 'middle')
          .text(function(d) { return d.name; });
    var circle = node.append("circle")
          .attr("id", function(d) {return d.index})
          .attr("class", "node")
          .attr("r", 12)
          .style("fill", "rgba(255, 255, 255, 0)")
          .style("stroke", "#4b4b4b");
    node.call(force.drag);

    // create tooltips
    //    1) initialize function tip(vis)
    var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.meaning }).offset([-7,0]);

    //    2) call in context of svg ???
    d3.select("#directed_graph_large svg").call(tip);

    //    3) bind to node mouseover event
    node.on('mouseover.tooltip', tip.show)
      .on('mouseout.tooltip', tip.hide)
      .on('mousedown.tooltip', tip.hide)
      .on('mouseup.tooltip', tip.show);

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

    // highlight links
    node.on('mouseover.links', function(d) {
      highlight_links(d.id);
    })
    .on('mouseout.links', function(d) {
      un_highlight_links(d.id);
    });
  });
});
