/**
 * Created by boazhoch on 10/12/16.
 */


/**
 * Created by boazhoch on 10/12/16.
 */

(function(){
  var Viva = require('vivagraphjs');

  var oboe = require('oboe');

  var graph = Viva.Graph.graph();

  var layout = Viva.Graph.Layout.forceDirected(graph, {
    springLength : 30,
    springCoeff : 0.0008,
    dragCoeff : 0.01,
    gravity : -1.2,
    theta : 1
  });
  var graphics = Viva.Graph.View.webglGraphics();
  var renderer = Viva.Graph.View.renderer(graph,
      {
        layout     : layout,
        graphics   : graphics,
        renderLinks : true,
        prerender  : true
      });


  console.time('time');


  oboe('./javascripts/full-ele.json')
      .node('elements.*', function (element) {

        var _source = element['data']['source'];
        var _target = element['data']['target'];

        graph.addNode(_source);

        graph.addNode(_target);

        graph.addLink(_source,_target);

        return oboe.drop;
      })
      .done(function (ele) {

        renderer.run();

      });

})();