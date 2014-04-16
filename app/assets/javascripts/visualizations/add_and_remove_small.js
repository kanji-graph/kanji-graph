$(document).ready(function(){

    var graph;
    var original_json;
    var original_nodes_num;
    var original_edges_num;

    function myGraph(vis_div) {

        this.readNodes = function() {
          return nodes;
        }

        this.readLinks = function() {
          return links;
        }

        // get an array of all the nodes
        this.readNodesArray = function() {
            var nodes_array = [];
            var nodes_copy = readNodes;
            for (i = 0; i < nodes_copy.length; i++) {
                nodes_array.push(nodes_copy[i].id);
            }
            return nodes_array;
        }

        // get an array of the edges, as [[source, target], ...]
        this.readLinksArray = function() {
            var links_array = [];
            var links_copy = this.readLinks();
            for (i = 0; i < links_copy.length; i++) {
                links_array.push([links_copy[i].source.id, links_copy[i].target.id])
            }
            return links_array;
        }


        this.numNodes = function(nodes_array) {
            return nodes_array.length;
        }

        this.numLinks = function(links_array) {
            return links_array.length;
        }

        // Helper function to determine if two arrays have overlap

        var hasOverlap = function (array1, array2) {
            // Only do this check if array1[i] != undefined
            if (array1 === undefined || array2 === undefined) {
                return 0;
            }
            for (var i=0; i < array1.length; i++) {
                if (array2.indexOf(array1[i]) > -1) {
                    return 1;
                }
            }
            return 0;
        }

        // Return array equivalent to 
        // Ex: [[1, 2], undefined, [3, 5], undefined, undefined, [1, 3]] #=> [[1, 2], [3, 5], [1, 3]]
        var deleteUndefined = function (edges) {
          var temp = []
          for (i = 0; i < edges.length; i++)
            if (edges[i] != undefined) {
              temp.push(edges[i])
            }
          return temp
        }

        var flatten = function(array_of_arrays) {
          var temp = $.map(array_of_arrays, function(n){
            return n;
          });
          return temp;
        }

        var unique = function(array_with_duplicates){
          var temp = []
          for (i = 0; i < array_with_duplicates.length; i++)
            if (temp.indexOf(array_with_duplicates[i]) == -1) {
              temp.push(array_with_duplicates[i])
            }
          return temp
        }


        this.numComponents = function (edges) {
            
            var components = [];

            while (edges.length > 0) {
                var component = edges.shift();
                while (edges.filter(function (edge) {return hasOverlap(edge, component);}).length > 0) {
                  console.log('Current amount of overlap: ' + edges.filter(function (edge) {return hasOverlap(edge, component);}).length + ' edges');
                  // Iterate through all of the edges.
                  for (i=0; i < edges.length; i++){
                    // If the edge overlaps with the current component
                    if (hasOverlap(edges[i], component) === 1) {
                      // add the contents of this edge to the component.
                      component.push(edges[i]);
                      // Put in "undefined" at that position.
                      edges[i] = undefined;
                      // Flatten the component and make it unique.
                      component = unique(flatten(component));
                    }
                  }
                  // Remove all undefined elements from array. 
                  // This has the same effect in the end as deleting the edges that moved into the component.
                  edges = deleteUndefined(edges);
                }  
                components.push(component);
            }
            return components.length;
        }



        // Add and remove elements on the graph object
        this.addNode = function (id, name) {
            nodes.push({"id": id, "name": name});
            update();
        };

        this.removeNode = function (id) {
            var i = 0;
            var n = findNode(id);
            while (i < links.length) {
                //individual links are objects
                if ((links[i]['source'] == n)||(links[i]['target'] == n))
                {
                    //remove link
                    // 9:35 am on tuesday: we're never getting to this point!!!
                    links.splice(i,1);
                }
                else i++;
            }
            //remove node
            nodes.splice(findNodeIndex(id),1);
            update();
        };

        // This correctly removes the node with id "kanji" from the list of node objects.
        // It does not redraw the graph (duh).
        this.removeNodeByKanji = function (kanji) {
            // Look through all of the edges
            // if it's there, break
            // if not, remove it
            
            var flag = 0;
            for (var i=0; i < links.length; i++) {
                if(links[i].source.name == kanji || links[i].target.name == kanji){
                    flag = 1
                    break;
                }
            }
            // If it's not a part of any other kanji, remove it.
            if (flag == 0) { 
                // Raise an exception if the node's index is undefined!!
                if (findNodeIndexByName(kanji) != undefined) {
                    nodes.splice(findNodeIndexByName(kanji), 1);
                }
            }
            update();
        };

        this.nodeExists = function(kanji) {
            var flag = 0;
            for (var i=0; i < links.length; i++) {
                if(links[i].source.name == kanji || links[i].target.name == kanji){
                    flag = 1
                    break;
                }
            }
            // If it's not a part of any other kanji, remove it.
            if (flag == 0) {
                return false;
            }
            else {
                return true;
            }
        }


        this.removeLink = function (source,target){
            for(var i=0;i<links.length;i++)
            {
                if(links[i].source.id == source && links[i].target.id == target)
                {
                    links.splice(i,1);
                    break;
                }
                if(links[i].source.id == target && links[i].target.id == source)
                {
                    links.splice(i,1);
                    break;
                }
            }
            //redraw
            update();
        };

        this.removeLinkByKanji = function (sourceKanji,targetKanji){
            for(var i=0;i<links.length;i++)
            {
                if(links[i].source.name == sourceKanji && links[i].target.name == targetKanji)
                {
                    links.splice(i,1);
                    break;
                }
                if(links[i].source.name == targetKanji && links[i].target.name == sourceKanji)
                {
                    links.splice(i,1);
                    break;
                }
            }
            //redraw
            update();
        };


        this.removeallLinks = function(){
            links.splice(0,links.length);
            update();
        };

        this.removeAllNodes = function(){
            nodes.splice(0,links.length);
            update();
        };

        this.addLink = function (source_id, target_id, value) {
            //links are objects
            // Find the node whose id is the source id and the node whose id is the target id.
            links.push({"source":findNode(source_id),"target":findNode(target_id),"value":value});
            update();
        };


        var findNode = function(id) {
          for (var i in nodes) {
            if (nodes[i]["id"] === id) return nodes[i];
          };
        };

        var findNodeIndex = function(id) {
            for (var i=0;i<nodes.length;i++) {
                if (nodes[i].id==id){
                    return i;
                }
            };
        };

        var findNodeIndexByName = function(name) {
            for (var i=0;i<nodes.length;i++) {
                if (nodes[i].name==name){
                    return i;
                }
            };
        }

        this.findOriginalJsonNodeIdByName = function(name) {
            for (var i=0;i<original_json.nodes.length;i++) {
                if (original_json.nodes[i].name==name){
                    return original_json.nodes[i].id;
                }
            };
        }

        this.linked = function(node_index) {
          for (i=0;i<links.length;i++) {
            if (links[i]["source"]["id"] === node_index || links[i]["target"]["id"] === node_index) {
              return true;
            }
          }
          return false;
        }

        // set up the D3 visualisation in the specified element
        var w = 750,
            h = 509;
        var vis = d3.select(vis_div)
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .attr("id","svg")
            .attr("pointer-events", "all")
            .attr("viewBox","0 0 "+w+" "+h)
            .attr("perserveAspectRatio","xMinYMid")
            .append('svg:g');

        
        vis.append("circle")
          .attr("r", "100")
          .style("fill", "rgba(225, 0, 0, .2)")
          .attr("transform", "translate(388, 250)");

        var force = d3.layout.force();
        force
          .charge(-120)
          .linkDistance(100);

        var nodes = force.nodes(),
            links = force.links();

        var update = function () {
              var link = vis.selectAll("line")
                .data(links, function(d) {
                  return d.source.id + "-" + d.target.id; 
                });

            link.enter().insert("line", ".node")
                .attr("id",function(d){return d.source.id + "-" + d.target.id;})
                .attr("class","link");
            link.append("title")
            .text(function(d){
                return d.value;
            });
            link.exit().remove();

            var node = vis.selectAll("g.node")
                .data(nodes, function(d) {return d.id;});

            // handle nodes that don't exist yet
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .call(force.drag);

            var background = nodeEnter.append("circle")
                  .attr("r", 12)
                  .style("fill", "white");
            var text = nodeEnter.append("text")
                  .attr("y", "5")
                  .style("color", "#4b4b4b")
                  .style('text-anchor', 'middle')
                  .text(function(d) { 
                    return d.name; });
            var circle = nodeEnter.append("circle")
                  .attr("id", function(d) {return d.index})
                  .attr("r", 12)
                  .style("fill", "rgba(255, 255, 255, 0)")
                  .style("stroke", "#4b4b4b");

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


        // Make it all go
        update();
    }

    var graph = new myGraph("#directed_graph_dynamic");
    function drawGraph()
    {
      //graph = new myGraph("#svgdiv");

      d3.json("surnames/directed_graph_small", function(error, json) {
        if (error) return console.warn(error);

        original_json = json;

        json.nodes.forEach(function(node){
          graph.addNode(node.id, node.name);
          
        });

        json.links.forEach(function(link){
          // source and target actually symbols
          // graph.addLink(graph.readNodes()[link["source"]].name, graph.readNodes()[link["target"]].name, '20');
          // Add a link between the source and target ids 
          //(which are set for a particular kanji--they're not based on position inside any array!)
          graph.addLink(link.source, link.target, '20')
        });
      });
    }
    drawGraph();






    $('.name_checkbox').click(function(){
        if ($(this).is(':checked')){

            var kanji1 = $(this).val()[0];
            var kanji2 = $(this).val()[1];

            // find id for node in json.nodes that has this kanji as its name
            var kanji1_id = graph.findOriginalJsonNodeIdByName(kanji1);
            var kanji2_id = graph.findOriginalJsonNodeIdByName(kanji2);

            // create nodes for kanji1 and kanji2 if they don't exist
            // Kanji are stored in the Character table of the database
            if (!graph.nodeExists(kanji1)) {
                graph.addNode(kanji1_id, kanji1);
            }
            if (!graph.nodeExists(kanji2)) {
                graph.addNode(kanji2_id, kanji2);
            }

            // add edge between them
            graph.addLink(kanji1_id, kanji2_id, '20');

            // Update statistics

            $('#statistics li:nth-child(1)').html('<h4>Nodes: '+ graph.numNodes(graph.readNodes()) + ' </h4>')
            $('#statistics li:nth-child(2)').html('<h4>Edges: '+ graph.numNodes(graph.readLinks()) + ' </h4>')
            $('#statistics li:nth-child(3)').html('<h4>Components: '+ graph.numComponents(graph.readLinksArray()) + ' </h4>')

        }

        else {
            var kanji1 = $(this).val()[0];
            var kanji2 = $(this).val()[1];

            graph.removeLinkByKanji(kanji1, kanji2);
            if (!graph.linked(kanji1)) {
              graph.removeNodeByKanji(kanji1);
            }
            if (!graph.linked(kanji2)) {
              graph.removeNodeByKanji(kanji2);
            }

            // Update statistics
            // console.log(graph.numNodes(graph.readNodes()));
            // console.log(graph.numLinks(graph.readLinks()));
            // console.log(graph.readLinksArray());

            $('#statistics li:nth-child(1)').html('<h4>Nodes: '+ graph.numNodes(graph.readNodes()) + ' </h4>')
            $('#statistics li:nth-child(2)').html('<h4>Edges: '+ graph.numNodes(graph.readLinks()) + ' </h4>')
            $('#statistics li:nth-child(3)').html('<h4>Components: '+ graph.numComponents(graph.readLinksArray()) + ' </h4>')

        }
    });

});
