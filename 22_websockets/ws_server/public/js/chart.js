

/**
 * Group trades by day by splitting the date string at the 'T' character
 * @param trades requires an .at field which is the date of the trade
 * @returns   
 */
function groupTradesByDay(trades) {
    const grouped = trades.reduce((acc, trade) => {
        const day = trade.at.split('T')[0]
        if (!acc[day]) {
            acc[day] = []
        }
        acc[day].push(trade)
        return acc
    }, {})

    return grouped
}

/**
 * 
 * @param {*} trades 
 * @returns 
 */
function aggregateTrades(trades) {
    const buys = d3.filter(trades, d => d.type === 'buy')
    const sells = d3.filter(trades, d => d.type === 'sell')

    const totalBuys = d3.sum(buys, d => d.value)
    const totalSells = d3.sum(sells, d => d.value)

    return {
        numTrades: trades.length,
        numBuys: buys.length || 0,
        numSells: sells.length || 0,
        minBuy: d3.min(buys, d => d.value) || 0,
        maxBuy: d3.max(buys, d => d.value) || 0,
        minSell: d3.min(sells, d => d.value) || 0,
        maxSell: d3.max(sells, d => d.value) || 0,
        profit: totalSells - totalBuys,
    }
}

/**
 * Draw trades chart
 */
function drawChart(parent, id, aggregated, title, subtitle) {
    d3.select(`#${parent}`)
        .append('div')
        .html(`
      <div class="px-4 py-2 mx-4 mb-5 text-center rounded-4 bg-secondary-subtle border border-secondary-subtle">
        <div class="d-block mx-auto mb-4" id="${id}"></div>
        <h1 class="display-5 fw-bold text-body-emphasis">${title}</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">${subtitle}</p>
        </div>
      </div>
    `);

    // Set dimensions and margins for the chart
    const margin = { top: 50, right: 80, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Set up the x and y scales
    const x = d3.scaleTime()
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    // Create the SVG element and append it to the chart container
    const svg = d3.select(`#${id}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set the domains for the x and y scales
    x.domain(d3.extent(aggregated, d => d.Date));
    // work out the max value for the y-axis
    if (d3.max(aggregated, d => d.value) >= 0) {
        y.domain([0, d3.max(aggregated, d => d.value)]);
        colour = "#85bb65";
    } else {
        y.domain([d3.min(aggregated, d => d.value), 0]);
        colour = "#d62728";
    }

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .style("font-size", "8px")
        .call(d3.axisBottom(x)
            .tickValues(x.ticks(d3.timeMonth.every(1)))
            .tickFormat(d3.timeFormat("%Y-%m")))
        .selectAll(".tick line")
        .style("stroke-opacity", 1)
    svg.selectAll(".tick text")
        .attr("fill", "#777");

    // Add the y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${width},0)`)
        .style("font-size", "10px")
        .call(d3.axisRight(y)
            .ticks(10)
            .tickFormat(d => {
                if (isNaN(d)) return "";
                return `$${d.toFixed(2)}`;
            }))
        .selectAll(".tick text")
        .style("fill", "#777");

    // Set up the line generator
    const line = d3.line()
        .x(d => x(d.Date))
        .y(d => y(d.value));

    // Create an area generator
    const area = d3.area()
        .x(d => x(d.Date))
        .y0(height)
        .y1(d => y(d.value));

    // Add the area path
    svg.append("path")
        .datum(aggregated)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", colour)
        .style("opacity", .5);

    // Add the line path
    svg.append("path")
        .datum(aggregated)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", colour)
        .attr("stroke-width", 1)
        .attr("d", line);

    const circle = svg.append("circle")
        .attr("r", 0)
        .attr("fill", "red")
        .style("stroke", "white")
        .attr("opacity", 0.7)
        .style("pointer-events", "none");

    // Add red lines extending from the circle to the date and value
    const tooltipLineX = svg.append("line")
        .attr("class", "tooltip-line")
        .attr("id", "tooltip-line-x")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

    const tooltipLineY = svg.append("line")
        .attr("class", "tooltip-line")
        .attr("id", "tooltip-line-y")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

    // create a listening rectangle
    const listeningRect = svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    // create the mouse move function
    listeningRect.on("mousemove", function (event) {
        const [xCoord] = d3.pointer(event, this);
        const bisectDate = d3.bisector(d => d.Date).left;
        const x0 = x.invert(xCoord);
        const i = bisectDate(aggregated, x0, 1);
        const d0 = aggregated[i - 1];
        const d1 = aggregated[i];
        const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
        const xPos = x(d.Date);
        const yPos = y(d.value);

        // UpDate the circle position
        circle.attr("cx", xPos).attr("cy", yPos);

        // Add transition for the circle radius
        circle.transition()
            .duration(50)
            .attr("r", 5);

        // Update the position of the red lines
        tooltipLineX.style("display", "block").attr("x1", xPos).attr("x2", xPos).attr("y1", 0).attr("y2", height);
        tooltipLineY.style("display", "block").attr("y1", yPos).attr("y2", yPos).attr("x1", 0).attr("x2", width);


        /*
        <div class="" id="test">
        <div data-bs-container="#test" data-bs-placement="right"  data-bs-toggle="tooltip" title="Example popover - title" data-bs-html="true" >a</div>
        </div>
        */
        // add in our tooltip
        tooltip
            .style("display", "block")
            .style("left", `${width + 90}px`)
            .style("top", `${yPos + 68}px`)
            .html(`${d.value !== undefined ? d.value.toFixed(2) : 'N/A'}`);

        tooltipRawDate
            .style("display", "block")
            .style("left", `${xPos + 60}px`)
            .style("top", `${height + 53}px`)
            .html(`${d.Date !== undefined ? d.Date.toISOString().slice(0, 10) : 'N/A'}`);
    });

    listeningRect.on("mouseleave", function () {
        circle.transition().duration(50).attr("r", 0);
        tooltip.style("display", "none");
        tooltipRawDate.style("display", "none");
        tooltipLineX.attr("x1", 0).attr("x2", 0);
        tooltipLineY.attr("y1", 0).attr("y2", 0);
        tooltipLineX.style("display", "none");
        tooltipLineY.style("display", "none");
    });

    return { id, svg, x, y, aggregated, line, area };
}

function createTableData(data) {
    return Object.keys(data).map(key => {
        const value = data[key]
        return {
            key,
            value
        }
    })
}

function loadTable(data) {
    console.log(data)

    const table = $('#details_table')
    table.bootstrapTable('load', createTableData(data))
    //table.bootstrapTable('hideLoading')
}


function loadData(dataUrl) {
    $("[data-bs-toggle=tooltip").tooltip();
    $("[data-bs-toggle=popover]").popover();

    const charts = []
    const overview = []
    const parseDate = d3.timeParse("%Y-%m-%d");

    // create tooltip div
    d3.json(dataUrl).then(data1 => {
        // Load and process the data    
        const trades = data1
        const grouped = groupTradesByDay(trades)
        const aggregatedTrades = aggregateTrades(trades)
        loadTable(aggregatedTrades)
        overview.push(trades)

        console.log(grouped)
        const aggregated = Object.keys(grouped).map(key => {
            const trades = grouped[key]
            return {
                Date: key,
                ...aggregateTrades(trades)
            }
        })
        console.log(aggregated)

        const dateRange = [];
        aggregated.forEach(d => {
            const item = { Date: parseDate(d.Date) };
            dateRange.push(item);
        });
        console.log(dateRange)

        // Define the slider
        const sliderRange = d3
            .sliderBottom()
            .min(d3.min(dateRange, d => d.Date))
            .max(d3.max(dateRange, d => d.Date))
            .width(600)
            .tickFormat(d3.timeFormat('%Y-%m-%d'))
            .ticks(3)
            .default([d3.min(dateRange, d => d.Date), d3.max(dateRange, d => d.Date)])
            .fill('#85bb65');

        // Add the slider to the DOM
        const gRange = d3
            .select('#slider-range')
            .append('svg')
            .attr('width', 800)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(90,30)');

        gRange.call(sliderRange);


        // buys
        const buys = [];
        aggregated.forEach(d => {
            const item = { Date: parseDate(d.Date), value: d.numBuys };
            buys.push(item);
        });
        charts.push(drawChart("charts", "trades1", buys, "Number of buys each day", "Show buy events per day"))

        // accumulated buys
        const accbuys = [];
        let buysValue = 0;
        aggregated.forEach(d => {
            buysValue += d.numBuys;
            const item = { Date: parseDate(d.Date), value: buysValue };
            accbuys.push(item);
        });
        charts.push(drawChart("charts", "trades2", accbuys, "Accumulated buys", "Show accumulated buy events per day"))

        // sells
        const sells = [];
        aggregated.forEach(d => {
            const item = { Date: parseDate(d.Date), value: d.numSells };
            sells.push(item);
        });
        charts.push(drawChart("charts", "trades3", sells, "Number of sells each day", "Show sell events per day"))

        // accumulated sells
        const accsells = [];
        let sellsValue = 0;
        aggregated.forEach(d => {
            sellsValue += d.numSells;
            const item = { Date: parseDate(d.Date), value: sellsValue };
            accsells.push(item);
        });
        charts.push(drawChart("charts", "trades4", accsells, "Accumulated sells", "Show accumulated sell events per day"))

        // profit
        const profit = [];
        let profitValue = 0;
        aggregated.forEach(d => {
            profitValue += d.profit;
            const item = { Date: parseDate(d.Date), value: profitValue };
            profit.push(item);
        });
        charts.push(drawChart("charts", "trades5", profit, "Accumulated profits", "Show accumulated profits by day"))

        console.log(charts)

        sliderRange.on('onchange', val => {
            console.log(val)
            console.log(overview[0])

            // can't filter on an object
            /*const filteredTrades = overview[0].filter(d => parseDate(d.Date) >= val[0] && parseDate(d.Date) <= val[1]);
            const filteredGrouped = groupTradesByDay(filteredTrades)
            console.log(filteredGrouped)
            const newAggregatedTrades = aggregateTrades(filteredGrouped)
            console.log(newAggregatedTrades)
            loadTable(newAggregatedTrades)*/
    
            charts.forEach(chart => {
                const { svg, x, y, aggregated, line, area } = chart;

                // Set new domain for x scale
                x.domain(val);

                // Filter data based on slider values
                const filteredData = aggregated.filter(d => d.Date >= val[0] && d.Date <= val[1]);

                // Update the line and area to new domain
                svg.select(".line").attr("d", line(filteredData));
                svg.select(".area").attr("d", area(filteredData));
                // Set new domain for y scale based on new data
                if (d3.max(filteredData, d => d.value) >= 0) {
                    y.domain([0, d3.max(aggregated, d => d.value)]);
                    colour = "#85bb65";
                } else {
                    y.domain([d3.min(aggregated, d => d.value), 0]);
                    colour = "#d62728";
                }

                // Update the x-axis with new domain
                svg.select(".x-axis")
                    .transition()
                    .duration(300) // transition duration in ms
                    .call(d3.axisBottom(x)
                        .tickValues(x.ticks(d3.timeMonth.every(1)))
                        .tickFormat(d3.timeFormat("%Y-%m")));

                // Update the y-axis with new domain
                svg.select(".y-axis")
                    .transition()
                    .duration(300) // transition duration in ms
                    .call(d3.axisRight(y)
                        .ticks(10)
                        .tickFormat(d => {
                            if (d <= 0) return "";
                            return `$${d.toFixed(2)}`;
                        }));
            });
        });
    })
}

const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

// Create a second tooltip div for raw date
const tooltipRawDate = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

