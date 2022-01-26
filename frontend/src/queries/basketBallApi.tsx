import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { PlayerStats } from '../graph/BarChart';

export type SeasonStats = {
  
}

export const nbaApi = createApi({
  reducerPath: 'nbaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https:localhost:5000'}),
  endpoints: (builder) => ({
    getStats: builder.query<PlayerStats[], PlayerStats>({
      query: (player) => `api/${player}`
    })
  })
});

export const { useGetStatsQuery } = nbaApi;