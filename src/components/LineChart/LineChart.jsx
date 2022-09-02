import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart({ coinPriceInterval, loadingCoinHistory }) {
  const svgRef = useRef();

  const createGraph = () => {
    let margin = { top: 40, right: 50, bottom: 50, left: 50 },
      width = 1400 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    let svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
      )
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    let x = d3.scaleTime().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    x.domain(
      d3.extent(coinPriceInterval, (d) => {
        return d.time;
      }),
    );
    y.domain([
      d3.min(coinPriceInterval, (d) => {
        return +d.priceUsd - +d.priceUsd / 100;
      }),
      d3.max(coinPriceInterval, (d) => {
        return +d.priceUsd + +d.priceUsd / 100;
      }),
    ]);

    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    let valueLine = d3
      .line()
      .x((d) => {
        return x(d.time);
      })
      .y((d) => {
        return y(d.priceUsd);
      });

    svg
      .append('path')
      .data([coinPriceInterval])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', valueLine);
  };

  useEffect(() => {
    if (!loadingCoinHistory) {
      createGraph();
    }
  }, [coinPriceInterval]);

  if (loadingCoinHistory) return <h1>Loading...</h1>;

  return (
    <div>
      <div ref={svgRef}></div>
    </div>
  );
}

export default LineChart;
