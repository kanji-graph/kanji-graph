$(document).ready(function(){

  var width = 750,
      height = 518;

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
    .attr("transform", "translate(0, 0)");

  group.append("circle")
    .attr("r", "100")
    .style("fill", "rgba(225, 0, 0, .2)")
    .attr("transform", "translate(388, 250)");

  // AJAX request for JSON
  d3.json("surnames/directed_graph_small", function(error, json) {
    if (error) return console.warn(error);
    // graph.nodes.forTeach(function(node) {
    //   graph.addNode(node);
    // }
    
    var nodes = json.nodes.slice(),
        links = [],
        bilinks = [];


    //make links pointing to node objects
    json.links.forEach(function(link) {
      var s = nodes[link.source],
          t = nodes[link.target],
          i = {}; // intermediate node for curved links
      nodes.push(i);

      // links have source and target attributes which correspond to 
      // nodes' indeces in the nodes array
      // all of the other attributes get set by force layout

      links.push({source: s, target: i}, {source: i, target: t});
      window.our_links = links;
      bilinks.push([s, i, t]);
    });

    force
        //sets nodes array
        .nodes(nodes)
        //sets links array
        .links(links)
        .start();

    //create links
    var link = group.selectAll(".link")
        .data(bilinks)
      .enter().append("path")
        .attr("class", "link")
        .attr("source", function(d) {return d[0].index})
        .attr("target", function(d) {return d[2].index})

    //create nodes (<circle>, <text>, <circle>)
    var node = group.selectAll(".node")
        .data(json.nodes)
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
          .attr("id", function(d) {return d.index})
          .attr("class", "node") 
          .attr("r", 12)
          .style("fill", "rgba(255, 255, 255, 0)")
          .style("stroke", "#4b4b4b");

    // create tooltips
    //    1) initialize function tip(vis)
    var tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.meaning }).offset([-7,0]);

    //    2) call in context of svg ???
    d3.select("#directed_graph_small svg").call(tip);

    //    3) bind to node mouseover event
    node.on('mouseover.tooltip', tip.show)
      .on('mouseout.tooltip', tip.hide)
      .on('mousedown.tooltip', tip.hide)
      .on('mouseup.tooltip', tip.show);

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

    // Highlight adjacent edges on node hover

    node.on('mouseover.links', function(d) {
      console.log(d);
      highlight_links(d.id);
    })
      .on('mouseout.links', function(d) {
       un_highlight_links(d.id);
      });
      
  }); // End AJAX Request
    
});

  function highlight_links(id) {
    // Select links where target or source == id
    adjacent_links = d3.selectAll("path[target='" + id + "'], path[source='" + id + "']");
    window.our_adjacent_links = adjacent_links;
    // Add a class to these that will change their color! :D
    adjacent_links.attr("class", "link active");
  }

  function un_highlight_links(id) {
    // Select links where target or source == id
    adjacent_links = d3.selectAll("path[target='" + id + "'], path[source='" + id + "']")
    // Add a class to these that will change their color! :D
    adjacent_links.attr("class", "link");
  }

