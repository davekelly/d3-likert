/**
 * Display data for 7-point Likert scales using D3.js
 *
 * @author Dave Kelly ~ hello@davidkelly.ie | @davkell
 * @license mit license: http://opensource.org/licenses/MIT
 * @version 0.1
 * 
 *
 
 */

var d3Likert = function(element, dataObject, dimensions){

    var d3PrePropData = [];    

    var height = dimensions.height,
        width = dimensions.width,
        margin = {left: 200, right: 0, top: 0, bottom: 0};

    
    var svg = d3.select(element)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

                    
    var x = d3.scale.linear()
                .range([0, (width - 490)]);

    var xScale = d3.scale.linear()
        .domain([1, 8])
        .range([390, width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .tickValues([1, 2, 3, 4, 5, 6, 7]);

    var ratingFormat = d3.format("<");
    xAxis.tickFormat(ratingFormat);

    x.domain([1, 7]);

    // add x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(386," + 60 + ")")
        .style("font", "12px 'Helvetica Neue'")
        .call(xAxis);


    // 
    // get the min/max number of votes across all ratings
    // => necessary to keep the scales the same for each factor
    var totalMaxRatings = [];
    var totalMinRatings = [];
    var arr = [];

    $.each(dataObject, function(index, data){

        arr = d3.entries(data.rating);
        var maxValue = d3.max(arr, function(d) { return +d.value; });
        var minValue = d3.min(arr, function(d) { return +d.value; });
        
        totalMaxRatings.push(maxValue);
        totalMinRatings.push(minValue);

    });

    maxValue = d3.max(totalMaxRatings, function(d){return +d});
    minValue = d3.min(totalMinRatings, function(d){return +d});
    

    // set up radius scales
    var rScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range([2, 20]);
    
    // set up the tooltip for mouseovers
    var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);


    // Add each rating row
    $.each(dataObject, function(index, data){
        
        var ratingArr = d3.entries(data.rating);

        // get the max number of votes within this ranking
        var rangeMaxValue = d3.max(ratingArr, function(d) { return +d.value; });

        var g = svg.append('g');
                    
        // used for setting a bg on the hover event
        var rect = g.selectAll('rect')
                    .data(ratingArr)
                    .enter()
                    .append('rect')
                    .attr('width', width)
                    .attr('height', 40)
                    .attr("x", 0)
                    .attr("y", (index * 40) + 80)
                    .style('fill', 'none');

        
        var circles = g.selectAll('circle')
            .data(ratingArr)
            .enter()
            .append('circle')
                .attr("cx", function(d, i) {  return xScale(d.key); })
                .attr("cy", (index * 40) + 100)
                .attr("r", function(d) { return rScale(d.value); })
                .attr("title", function(d){return d.value; })
                .style("fill", function(d) { 
                    // if this is the highest rated value,
                    // give it a different colour
                    if(d.value == rangeMaxValue){
                        return 'rgb(252, 187, 161)';
                    }else{
                        return "#ccc";
                    }    
                })
            .on("mouseover", function(d) { 
                div.transition()        
                    .duration(200)      
                    .style("opacity", .9);      
                div .html('<strong>' + d.key + "</strong>: "  + d.value + " respondents")  
                    .style("left", (d3.event.pageX) + "px")     
                    .style("top", (d3.event.pageY - 28) + "px");    

            })                  
            .on("mouseout", function(d) {       
                div.transition()        
                    .duration(500)      
                    .style("opacity", 0);   
            });


        // Add the actual values as text below the 
        // circles => used for display on label mouseover
        var text = g.selectAll("text")
            .data(ratingArr)
            .enter()
            .append("text");

        text
            .attr("y", (index * 40) + 105)
            .attr("x",function(d, i) { return xScale(d.key) - 12; })
            .attr("class","value")
            .style('fill', '#666')
            .text(function(d){ return d.value; })
            .style("display","none");

        // Y-axis labels (contain html)
        g.append("foreignObject")
            .attr("y", (index * 40) + 90)
            .attr("x", 0)
            .attr("class","chart-label")
            .attr("width", 380)
            .attr("height", 40)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .append("xhtml:body")
            .style("font", "12px 'Helvetica Neue'")
            .style("line-height", "16px")
            .style("background", "transparent")
            .html('<i class="glyphicon glyphicon-info-sign">&nbsp;</i>' + data.name );

        
    });

    xAxis.orient("bottom");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(386," + (height - 40) + ")")
        .style("font", "12px 'Helvetica Neue'")
        .call(xAxis);


    function mouseover(p) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).style('cursor', "pointer");
        d3.select(g).selectAll('rect').attr('class', 'hover');
        d3.select(g).selectAll("circle").style("display","none");
        d3.select(g).selectAll("text.value").style("display","block");
    }

    function mouseout(p) {
        var g = d3.select(this).node().parentNode;
        
        d3.select(g).style('cursor', "normal");
        d3.select(g).selectAll('rect').attr('class', 'no-hover');
        d3.select(g).selectAll("circle").style("display","block");
        d3.select(g).selectAll("text.value").style("display","none");
    }
};