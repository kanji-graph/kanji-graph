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

    var findNode = function (id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id) return nodes[i];
        }
    };

    var findNodeIndex = function (id) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
                return i;
            }
        }
    };
}
