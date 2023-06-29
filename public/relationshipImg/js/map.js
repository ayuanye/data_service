var concentricLayoutOptions = {
    name: 'concentric',
    fit: false,
    nodeDimensionsIncludeLabels: true,
    concentric: function (ele) {
        return ele.data('weight');
    },
    levelWidth: function (nodes) {
        return 10;
    },
    padding: 10
};

var coseLayoutOptions = {
    name: 'cose',
    nodeDimensionsIncludeLabels: true,
    animate: true,
    refresh: 1,
    gravity: 80,
    nodeOverlap: 20,
    edgeElasticity: 60,
    fit: true,
    padding: 10
};


function buildMap(data) {
    var cy = window.cy = cytoscape({
        container: document.getElementById('map_body'),
        minZoom: 0.2,
        maxZoom: 6,
        wheelSensitivity: 0.1,
        boxSelectionEnabled: true,
        style: fetch('/css/map.cycss?v=1').then(function (value) {
            return value.text();
        }), // layout: concentricLayoutOptions,
        layout: coseLayoutOptions,
        elements: data
    });

    var doubleClickDelayMs = 350;
    var previousTapStamp;
    cy.on('tap', function (event) {
        var currentTapStamp = event.timeStamp;
        var msFromLastTap = currentTapStamp - previousTapStamp;

        if (msFromLastTap < doubleClickDelayMs) {
            event.target.trigger('doubleTap', event);
        }
        previousTapStamp = currentTapStamp;

        //隐藏节点信息框
        document.getElementById('bottom_nodeInfo').style.display = 'none';
    });
    cy.on('select', 'node.snapshot', function (event) {
        var ele = event.target;
        if (cy.settings.subSelectUnionNode()) {
            doSubSelectUnionNode(ele);
        }
    });
    cy.on('unselect', 'node.snapshot', function (event) {
        cy.batch(function () {
            cy.nodes(".subSelected").removeClass('subSelected');
        });
    });

    cy.on('doubleTap', 'node', function (event) {
        var ele = event.target;
        let arr = ele.outgoers().targets();
        for (let i = 0; i < arr.length; i++) {
            ele.edgesTo(arr[i]).style('content', i + 1);
        }
    });

    cy.on('mousedown', 'node', function (event) {
        var ele = event.target;
        cy.elements().difference(ele.outgoers());
        ele.addClass('highlight').outgoers().addClass('highlight');
    });
    cy.on('mouseup', 'node', function (event) {
        var ele = event.target;
        ele.removeClass('highlight').outgoers().removeClass('highlight');
    });
    cy.on('cxttapstart', 'node', function (event) {
        var ele = event.target;
        let arr = ele.outgoers().targets();
        for (let i = 0; i < arr.length; i++) {
            ele.edgesTo(arr[i]).style('label', '');
        }
    });
    cy.on('cxttapstart', 'edge', function (event) {
        var ele = event.target;
        ele.style('label', '');
    });
    cy.on('cxtdrag', 'edges', function (event) {
        var ele = event.target;
        ele.remove();
    });
    cy.settings = {
        subSelectUnionNode: function () {
            return false;
        }
    };
    cy.loadElement = loadElement;
    cy.doFind = doFind;
    cy.doRefresh = doRefresh;
    return cy;
}

function loadElement(url, select, fullLayout, title) {
    fetch(url)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            return cy.add(data);
        }).then(function (eles) {
            if (fullLayout) {
                eles.layout({
                    name: "null",
                    nodeDimensionsIncludeLabels: true,
                    fit: true
                }).run();
            } else {
                doRefresh();
            }
            cy.center(eles);
            return eles;
        }).then(function (eles) {
            if (select) {
                cy.nodes(':selected').unselect();
                eles.select();
            }
        }).then(function (eles) {
            if (title.length > 0) {
                cy.filter("node[name='" + title + "']").select();
            }
        });
}

function doFind(key) {
    cy.batch(function () {
        cy.nodes('.find').removeClass('find');
        if (key != "") {
            // 正则匹配
            key = key.replace(/\*/g, ".*");
            key = "^" + key + ".*$";
            key = key.toLowerCase();

            var findNodes = cy.filter(function (element, i) {
                if (!element.isNode()) {
                    return false;
                }
                var name = element.data('name').trim();
                return name.toLowerCase().search(key) >= 0;
            });
            findNodes.addClass("find");
            $("#find_element label").html(findNodes.length);
        }
        $("#map_body").focus();
    });
}

function showHot() {
    cy.batch(function () {
        cy.filter(function (element, i) {
            return element.isNode() && !element.hasClass("snapshot");
        }).addClass('hot');
    });
}

function closeHot() {
    cy.batch(function () {
        cy.nodes('.hot').removeClass('hot');
    });
}

function doSubSelectUnionNode(ele) {
    cy.batch(function () {
        if (typeof (ele.data('references')) != "undefined") {
            ele.data('references').forEach(function (r) {
                cy.$id(r).addClass("subSelected");
            });
        }
    });
}

function doRefresh() {
    cy.layout(coseLayoutOptions).run();
}