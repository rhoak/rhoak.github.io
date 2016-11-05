// Get Data -> one JSON AJAX request mocked up
//    AKA: a function that returns data. 

// linked charts...

/**
  ConstructCharts({
    asterPlotTarget: '',
    timeseriesChart: '',
  })   // <- this is a javascript object

  Inside javascript object:
   -- constructor
       -- create charts from data
       -- bind events
   -- event binding function 
       -- binds events like moving the cursor along the timeseires 
       -- in theory this is where you bind tooltips


new ChartManager({asterPlotTarget: '#target1', timeSeriesTarget: '#target2'}, {});

class ChartManager {
  public function __init__(options, data) {
    // do stuff, give data to charts
    AsterPlot(, 

**/

////////////////////////////////Pie Chart
(function() {
  var margin = {top: 80, right: 80, bottom: 40, left: 80};

  var width = 340,
      height = 340,
      radius = Math.min(width, height) / 2,
      innerRadius = 0 * radius;

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.width; });

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
      return d.data.symbol + ": <span style='color:#f06526'>" + d.data.score + "</span>";
    });

  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) { 
      return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
    });

  var outlineArc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(radius);

  var svg = d3.select(".pchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

  svg.call(tip);

  d3.csv('pchart.csv', function(error, data) {
    data.forEach(function(d) {
      d.symbol  =  d.symbol;
      d.color  =  d.color;
      d.weight = +d.weight;
      d.score  = +d.score;
      d.width  = +d.weight;
      console.log(d.weight[0]);
    });

     var outerGroup = svg.selectAll(".solidArc")
        .data(pie(data))
        .enter()
        .append("g")
      
      outerGroup
        .append("path")
        .attr("fill", function(d) { return d.data.color; })
        .attr("class", "solidArc")
        .attr("stroke", "#cfcfcf")
        .attr("d", arc)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
        
      outerGroup
        .append("text")
        .attr("transform", function(d) {
          return "translate(" + centroid(60, width, d.startAngle, d.endAngle) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.symbol });

    var outerPath = svg.selectAll(".outlineArc")
        .data(pie(data))
        .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", "#cfcfcf")
        .attr("class", "outlineArc")
        .attr("d", outlineArc);  
     
    function centroid(innerR, outerR, startAngle, endAngle){
      var r = (innerR + outerR) / 2, a = (startAngle + endAngle) / 2 - (Math.PI / 2);
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    }
  });
})();

/////////////////////////////Line Chart
(function() {

  var margin = {top: 10, right: 10, bottom: 2, left: 10},
      width = 900 - margin.left - margin.right,
      height = 69 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%b %Y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.score); });

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.score); });

  d3.csv("lchart.csv", type, function(error, data) {
   // Nest data by symbol.
    var symbols = d3.nest()
        .key(function(d) { return d.symbol; })
        .entries(data);
    // Compute the maximum score per symbol, needed for the y-domain.
    symbols.forEach(function(s) {
      s.maxScore = d3.max(s.values, function(d) { return d.score; })
    });
    // Compute the minimum and maximum date across symbols.
    // We assume values are sorted by date.
    x.domain([
      d3.min(symbols, function(s) { return s.values[0].date; }),
      d3.max(symbols, function(s) { return s.values[s.values.length - 1].date; })
    ]);
    // Add an SVG element for each symbol, with the desired dimensions and margin.
    var svg = d3.select(".lchart").selectAll("svg")
        .data(symbols)
      .enter().append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the area path elements. Note: the y-domain is set per element.
    svg.append("path")
        // .attr("class", "area")
        .style("fill", function(d) { return d.values[0].color;  }) 
        .attr("d", function(d) { y.domain([0, d.maxScore]); return area(d.values); });

    // Add the line path elements. Note: the y-domain is set per element.
    svg.append("path")
        .attr("class", "line")
        .attr("d", function(d) { y.domain([0, d.maxScore]); return line(d.values); });

    // Add a small label for the symbol name.
    svg.append("text")
        .attr("x", width - 6)
        .attr("y", height - 6)
        .style("text-anchor", "end")
        .text(function(d) { return d.key; });
    });
  function type(d) {
    d.score = +d.score;
    d.date = parseDate(d.date);
    return d;
  }
})();

