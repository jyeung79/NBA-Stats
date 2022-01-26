import React, { useState, useEffect, useMemo } from 'react';
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
const testData = playerStats;
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
  const [stats, setStats] = useState<PlayerStats[]>([]);
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  const { data, error, isLoading } = useGetStatsQuery('hi');
  console.log('data:', data);

  useEffect(() => {
    if (data) {
      const newData: PlayerStats[] = [];
      Object.entries(data).forEach((entry) => {
        const [key, value] = entry;
        if (typeof (value) !== 'number' || key === 'id') return;
        newData.push({ category: key, amount: value });
      });
      setStats(newData);
      console.log('NewData:', newData)
    }
  }, [data])

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: stats.map(getCategory),
        padding: 0.4,
      }),
    [xMax, stats],
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...stats.map(getCategoryAmount))],
      }),
    [yMax, stats],
  );

  if (error) {
    console.error(error);
    return <div><p>{JSON.stringify(error)}</p></div>
  }

  if (isLoading) {
    return <div><p>Loading...</p></div>
  }

  return width < 10 ? null : (
    <div>
      <p style={{ color: 'white', fontSize: 48 }}>{data?.full_name}</p>
      <svg width={width} height={height}>
        <GradientTealBlue id="teal" />
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
          {stats.map((d) => {
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
    </div>
  );
}