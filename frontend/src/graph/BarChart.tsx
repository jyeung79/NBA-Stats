import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
// import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom } from '@visx/axis';
import { useGetStatsQuery } from '../queries/basketBallApi';

const playerStats: PlayerStats[] = [
  { category: 'pts', amount: 29.34 },
  { category: 'rbds', amount: 8.9 },
  { category: 'asts', amount: 10.12 },
  { category: 'stls', amount: 3.4 },
  { category: 'blks', amount: 0.8 },
]
// const data = letterFrequency.slice(5);
const data = playerStats;
const verticalMargin = 120;

// accessors
const getCategory = (d: PlayerStats) => d.category;
const getCategoryAmount = (d: PlayerStats) => d.amount;

export type PlayerStats = {
  category: string,
  amount: number,
}

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};


export default function BarChart({ width, height, events = false }: BarsProps) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getCategory),
        padding: 0.4,
      }),
    [xMax],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getCategoryAmount))],
      }),
    [yMax],
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getCategory(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getCategoryAmount(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
      <AxisBottom
        top={yMax + 75}
        scale={xScale}
        label={'Stats'}
      // tickFormat={getCategory(d)}
      />
    </svg>
  );
}