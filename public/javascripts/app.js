/**
 * Created by boazhoch on 10/12/16.
 */

var cytoscape = require('cytoscape');
var cyforcelayout = require('cytoscape-ngraph.forcelayout');

var oboe = require('oboe');

cyforcelayout(cytoscape); // register extension

var cy = cytoscape({
  container: document.getElementById('cy'), // container to render in

  style: [
    {
      selector: 'node',
      style: {
        'content': 'data(name)'
      }
    },

    {
      selector: 'edge',
      style: {
        'target-arrow-shape': 'triangle'
      }
    },

    {
      selector: ':selected',
      style: {}
    }
  ]
});

console.time('time');

cy.startBatch();

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
