import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { PlayerStats } from '../graph/BarChart';

export type SeasonStats = { "PTS": number, "REB": number, "AST": number, "STL": number, "BLK": number, "id": number, "full_name": string }

export type StatQueryProp = {
  player: string,
  season: string,
  mode: string,
}

export const nbaApi = createApi({
  reducerPath: 'nbaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/' }),
  endpoints: (builder) => ({
    getStats: builder.query<SeasonStats, string>({
      query: (hi) => ({ url: 'stats/Lebron/2018/avg' }),
    })
  })
});

export const { useGetStatsQuery } = nbaApi;