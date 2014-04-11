var myGraph;
function graph(element_id) {
  this.addNode = function (id) {
    nodes.push({"id":id});
    update();
  }
}


$(document).ready(function(){
  myGraph = graph("#add_and_remove_small");
});
