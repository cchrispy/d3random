var data = [];

var graphSize = {
  height: 600,
  width: 800,
  bars: 100,
  size: 1000
}
function genSize() {
  var cur = 50 + Math.random()*(graphSize.size-50);
  for (var i = 0; i < graphSize.bars; i++) {
    var rando = -999;
    while (Math.abs(cur - rando) > 150) {
      rando = 50 + Math.random()*(graphSize.size-50);
    }
    cur = rando;
    data[i] = {num: i, value: rando};
  }
}
genSize();

var svg = d3.select('.graph').append('svg')
            .attr('height', graphSize.height)
            .attr('width', graphSize.width);

var xScale = d3.scaleLinear().domain([0, graphSize.bars*(graphSize.width/graphSize.bars)+graphSize.bars]).range([20, graphSize.width]);
var yScale = d3.scaleLinear().domain([0, graphSize.size]).range([0, graphSize.height-20]);

var xAxisScale = d3.scaleLinear().domain([0, 100]).range([20, graphSize.width]);
var yAxisScale = d3.scaleLinear().domain([1000, 0]).range([0, graphSize.height-20]);

var xAxis = d3.axisBottom(xAxisScale).ticks(20);
var yAxis = d3.axisLeft(yAxisScale).ticks(15);

svg.selectAll('rect').data(data, function(d) {
  return d.num;
}).enter().append('rect')
  .attr('class', 'bar')
  .attr('x', function(d, i) {
    return xScale(i*(graphSize.width/graphSize.bars) + i);
  })
  .attr('y', function(d, i) {
    return yScale(graphSize.size - d.value);
  })
  .attr('width', 6)
  .attr('height', function(d, i) {
    return yScale(d.value);
  })
  .attr('fill', 'black')
  .attr('transform', 'translate(10,0)');

svg.append('g').attr('class', 'xAxis')
  .attr('transform', 'translate(10, ' + (graphSize.height-15) + ')')
  .call(xAxis);
svg.append('g').attr('class', 'yAxis')
  .attr('transform', 'translate(25, 0)')
  .call(yAxis);

setInterval(function() {
  genSize();
  svg.selectAll('.bar').data(data, function(d) {
    return d.num;
  }).transition().duration(500)
    .attr('y', function(d) {
      return yScale(graphSize.size - d.value);
    })
    .attr('height', function(d, i) {
      return yScale(d.value);
    })
}, 500)