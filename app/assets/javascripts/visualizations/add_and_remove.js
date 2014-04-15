var graph;

function myGraph(vis_div) {

    this.readNodes = function () {
        return nodes;
    };

    this.readLinks = function () {
        return links;
    };
    // Add and remove elements on the graph object
    this.addNode = function (id) {
        nodes.push({
            "id": id
        });
        update();
    };

    this.removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            //individual links are objects
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                //remove link
                links.splice(i, 1);
            } else i++;
        }
        //remove node
        nodes.splice(findNodeIndex(id), 1);
        update();
    };

    this.removeLink = function (source, target) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].source.id == source && links[i].target.id == target) {
                links.splice(i, 1);
                break;
            }
        }
        //redraw
        update();
    };

    this.removeallLinks = function () {
        links.splice(0, links.length);
        update();
    };

    this.removeAllNodes = function () {
        nodes.splice(0, links.length);
        update();
    };

    this.addLink = function (source_id, target_id, value) {
        //links are objects
        links.push({
            "source": findNode(source_id),
            "target": findNode(target_id),
            "value": value
        });
        update();
    };


    link.enter().append("line")
        .attr("id",function(d){return d.source.id + "-" + d.target.id;})
        .attr("class","link");
    link.append("title")
    .text(function(d){
        return d.value;
    });
    link.exit().remove();

    var node = vis.selectAll("g.node")
        .data(nodes, function(d) { 
            return d.id;});

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    nodeEnter.append("svg:circle")
    .attr("r", 16)
    .attr("id",function(d) { return "Node;"+d.id;})
    .attr("class","nodeStrokeClass");

    nodeEnter.append("svg:text")
    .attr("class","textClass")
    .text( function(d){return d.id;}) ;

    node.exit().remove();
    force.on("tick", function() {

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y         + ")"; });

        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    });

    // Restart the force layout.
    force
    .gravity(.05)
    .distance(50)
    .linkDistance( 50 )
    .size([w, h])
    .start();
};

*/

// Make it all go
update();
}

/*
function drawGraph()
{
  graph = new myGraph("#svgdiv");
  graph.addNode('A');
  graph.addNode('B');
  graph.addNode('C');
  graph.addLink('A','B','10');
  graph.addLink('A','C','8');
  graph.addLink('B','C','15');
}
