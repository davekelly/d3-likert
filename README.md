#D3 Likert

Display charts for 7-point Likert data with [D3.js](http://d3js.org). 

Based on code by [Asif Rahman](https://github.com/asifr) in [http://neuralengr.com/asifr/journals/](http://neuralengr.com/asifr/journals/)

##Usage
    
    <!-- contained in css/likert.css -->
    <style type="text/css">
        .hover{fill: #eee !important; cursor: pointer !important;}
        .no-hover{fill: #fff;}
        .axis path{fill: none;stroke:#b6b6b6;shape-rendering: crispEdges;}
        div.tooltip { position: absolute; text-align: left; width: 150px; min-height: 30px; padding: 1em; font: 12px sans-serif; background: #efefef; border: 1px solid #dbdbdb; border-radius: 5px; pointer-events: none; color: #000; }
    </style>

    <!-- element where the chart is going -->
    <div id="display-likert-chart"></div>

    <!-- add jquery & d3. (You could use the CDN versions...) -->
    <script src="/bower_components/jquery/jquery.min.js"></script>
    <script src="/bower_components/d3/d3.min.js"></script>

    <!-- d3.likert script -->
    <script src="js/d3.likert.js"></script>
  
    <script>

        var likertData = [
            {
                "rating": {
                    "1": "184",
                    "2": "63",
                    "3": "32",
                    "4": "39",
                    "5": "28",
                    "6": "17",
                    "7": "19"
                },
                "name": "A first item to rate"
            },
            {
                "rating": {
                    "1": "32",
                    "2": "35",
                    "3": "36",
                    "4": "70",
                    "5": "68",
                    "6": "83",
                    "7": "61"
                },
                "name": "A second item to rate"
            }
        ];

        // call the chart
        d3Likert('#display-likert-chart', likertData, {height: 740, width: $('#chart-element-id').width() });
    </script>

## Note

This is an early version that needs customisation for wider use. Some examples of potential updates include:

- allowing other rating scales (3 or 5), 
- flexible height, 
- remove jQuery dependency (which shouldn't be difficult), 
- allow colour customisation through properties

