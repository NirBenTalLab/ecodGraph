/**
 * Created by boazhoch on 10/12/16.
 */

var cytoscape = require('cytoscape');
var cyforcelayout = require('cytoscape-ngraph.forcelayout');
var ecodData = require('./ecodData');

// var oboe = require('oboe');

cyforcelayout(cytoscape); // register extension

var cy = cytoscape({
    container: document.getElementById('cy')
});

var ed = ecodData();

// console.time('time');

// cy.startBatch();

var layoutSetting = {
    // name: 'concentric',
    name: 'cose',
    fit: true,
    randomize: true
    // levelWidth: function( nodes ){ // the variation of concentric values in each level
    //     return nodes.maxDegree() / 10;
    // },
    // name: 'cytoscape-ngraph.forcelayout',
    // async: {
    //     // tell layout that we want to compute all at once:
    //     maxIterations: 100000,
    //     stepsPerCycle: 3000,
    //
    //     // Run it till the end:
    //     waitForStep: true
    // }

    // some more options here...
};

var nodeStyle =  {
    selector: 'node',
    style: {
        'content': 'data(id)',
        //'width': 'data(size)',
        //'height': 'data(size)',
        //"font-size":"data(size)",
        "text-valign":"center",
        "text-halign":"center",
        //"background-color": "mapData(size,1,3896, green, red)",
        "text-outline-color":"#555",
        "text-outline-width":"2px",
        "color":"#000"
    }
};

var edgeStyle = {
    selector: 'edge',
    style: {
        //"line-color" : "mapData(size, 1,100, grey, black)",
        //'target-arrow-shape': 'triangle'
    }
};

var styleSettings = [
    {
        selector: ':selected',
        style: {

        }
    }
];

var drawArch = function(arch) {

    if (ed.allNodes[arch] == undefined)
        return;

    cy.remove(cy.nodes());

    cy.startBatch();
    cy.add(ed.allNodes[arch]);
    if (ed.allEdges[arch] != undefined) cy.add(ed.allEdges[arch]);
    cy.endBatch();

    cy.layout(layoutSetting);

    var nodeSizeMax = Math.max(...cy.nodes().map(function(n) { return n.data('size')}));
    var nodeSizeMin = Math.min(...cy.nodes().map(function(n) { return n.data('size')}));

    nodeStyle.style["background-color"] = "mapData(size,"+nodeSizeMin+","+nodeSizeMax+",grey, green)";

    var edgeSizeMax = Math.max(...cy.edges().map(function(n) { return n.data('size')}));
    var edgeSizeMin = Math.min(...cy.edges().map(function(n) { return n.data('size')}));

    edgeStyle.style["line-color"] = "mapData(size,"+edgeSizeMin+","+edgeSizeMax+",grey, red)";

    cy.style([nodeStyle, edgeStyle]);
};

drawArch("");

cy.on('tap', function(event){
    // cyTarget holds a reference to the originator
    // of the event (core or element)
    var evtTarget = event.cyTarget;

    if( evtTarget === cy ){
        console.log('tap on background');
    } else {
        console.log('tap on some element');
        console.log( 'tapped ' + evtTarget.id() + ' size: ' + evtTarget.data('size') );
        drawArch(evtTarget.id());
    }
});

/*
 oboe('./javascripts/ele.json')
 .node('elements.*', function (element) {

 var _source = element['data']['source'];
 var _target = element['data']['target'];

 cy.add([
 {group: "nodes", data: {id: _source}},
 {group: "nodes", data: {id: _target}},
 {group: "edges", data: {id: element['data']['id'], source: _source, target: _target}}
 ]);

 return oboe.drop;
 })
 .done(function (ele) {

 console.log('file', ele);

 // cy.layout({
 //   name: 'cose',
 //   idealEdgeLength: 100,
 //   nodeOverlap: 20
 // });

 cy.layout({name: 'cytoscape-ngraph.forcelayout'});

 cy.endBatch();

 console.timeEnd('time');
 });
 */
