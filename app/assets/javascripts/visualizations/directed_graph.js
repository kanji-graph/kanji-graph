$(document).ready(function(){

  var width = 960,
      height = 500;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .linkDistance(30)
      .linkStrength(2)
      .size([width, height]);

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.json("surnames/directed_graph", function(error, graph) {
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

    var link = svg.selectAll(".link")
        .data(bilinks)
      .enter().append("path")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(graph.nodes)
      .enter().append("g");
    var circle = node.append("circle")
          .attr("class", "node")
          .attr("r", 12)
          .style("fill", "white")
          .style("stroke", "#4b4b4b")
          .call(force.drag);
    var text = node.append("text")
          .attr("y", "5")
          .style("color", "#4b4b4b")
          .style('text-anchor', 'middle')
          .text(function(d) { return d.name; });


    node.append("title")
        .text(function(d) { return d.name; });

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
  });
});
