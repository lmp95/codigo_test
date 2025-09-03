import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_TAGS } from './apiTags';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.themoviedb.org/3/',
  prepareHeaders: headers => {
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzBhMTAyOWQyODA1ZGYwM2ZmZGQ0NDg4MTdiZWMyYyIsIm5iZiI6MTc1NjgxMTgxNS44ODYwMDAyLCJzdWIiOiI2OGI2ZDIyN2QwOGFhZGJjMGY5ZTI3NjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.djeKdOIRvS1XgTBaPawHVXfZ-oKJU56Qqq0IBPntLPE';
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  timeout: 10000,
});

export const appApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export const apiWithTag = appApi.enhanceEndpoints({
  addTagTypes: API_TAGS,
});
