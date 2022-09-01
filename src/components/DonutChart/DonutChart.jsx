import { useMemo, useRef } from 'react';
import * as d3 from 'd3';

export const DonutChart = ({ width, height, data }) => {
  const refRect = useRef(null);

  const MARGIN_X = 75;
  const MARGIN_Y = 25;

  const colors = d3.scaleOrdinal(d3.schemeSet2);

  const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;

  const format = d3.format('.2f');

  const pie = useMemo(() => {
    const pieGenerator = d3.pie().value((d) => format(+d.price * d.count));
    return pieGenerator(data);
  }, [data]);

  const arcGenerator = d3.arc();

  const shapes = pie.map((grp, i) => {
    const sliceInfo = {
      innerRadius: 40,
      outerRadius: radius,
      startAngle: grp.startAngle,
      endAngle: grp.endAngle,
    };

    const slicePath = arcGenerator(sliceInfo);

    return (
      <g key={i}>
        <path d={slicePath} fill={colors(i)} />
      </g>
    );
  });

  const sumInPercents = pie.map((el, i) => {
    const coinsSum = pie.map((el) => el.value).reduce((a, b) => a + b, 0);

    const coinPercent = (el.value * 100) / coinsSum;

    const formatLow = d3.format('.4f');

    const formattedValue = () => {
      if (coinPercent >= 0.01) {
        return format(coinPercent);
      } else {
        return formatLow(coinPercent);
      }
    };

    return (
      <div
        onMouseEnter={() => {
          if (refRect.current) {
            refRect.current.classList.add('hasHighlight');
          }
        }}
        onMouseLeave={() => {
          if (refRect.current) {
            refRect.current.classList.remove('hasHighlight');
          }
        }}
        className="graph-block__container slice">
        <div className="graph-block__content" key={i}>
          <div className="graph-block__content-rectangle" style={{ background: colors(i) }} />
          <div className="graph-block__content-title">{el.data.title}</div>
        </div>
        <div>{formattedValue()}%</div>
      </div>
    );
  });

  return (
    <>
      <div className="graph-block">
        <svg width={width} height={height}>
          <g className="graph-block__shape" transform={`translate(${width / 2}, ${height / 2})`}>
            {shapes}
          </g>
        </svg>
        <div ref={refRect} className="graph-block__wrapper">
          {sumInPercents}
        </div>
      </div>
    </>
  );
};
