import { StyleSheet, View } from 'react-native';
import {
  useGetPopularMoviesInfiniteQuery,
  useGetUpcomingMoviesInfiniteQuery,
} from '../../../apis/movies';
import Typography from '../../../components/Typography';
import InfiniteScrollList from '../../../components/InfiniteScroll';
import MovieCard from '../../../components/MovieCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const {
    data: upcomingMovies,
    isFetching: upcomingFetching,
    hasNextPage,
    isError: upcomingError,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetUpcomingMoviesInfiniteQuery(
    {
      language: 'en-Us',
    },
    {
      initialPageParam: 1,
    },
  );

  const {
    data: popularMovies,
    isFetching: popularFetching,
    hasNextPage: popularHasNextPage,
    isError: popularError,
    fetchNextPage: popularFetchNextPage,
    isFetchingNextPage: popularIsFetchingNextPage,
  } = useGetPopularMoviesInfiniteQuery(
    {
      language: 'en-Us',
    },
    {
      initialPageParam: 1,
    },
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.section}>
        <Typography size="lg" weight="bold">
          Upcoming
        </Typography>
        <InfiniteScrollList
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          horizontal
          contentContainerStyle={styles.popularMovieList}
          errorMessage="Fail to load movies"
          isError={upcomingError}
          isLoading={upcomingFetching || isFetchingNextPage}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={upcomingMovies?.pages.flatMap(page => page.results) ?? []}
          renderItem={({ item }) => {
            return <MovieCard key={item.id} movie={item} />;
          }}
        />
      </View>
      <View style={styles.section}>
        <Typography size="lg" weight="bold">
          Popular
        </Typography>
        <InfiniteScrollList
          onEndReached={() => {
            if (popularHasNextPage && !popularIsFetchingNextPage)
              popularFetchNextPage();
          }}
          horizontal
          contentContainerStyle={styles.popularMovieList}
          errorMessage="Fail to load movies"
          isError={popularError}
          isLoading={popularFetching || popularIsFetchingNextPage}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={popularMovies?.pages.flatMap(page => page.results) ?? []}
          renderItem={({ item }) => {
            return <MovieCard key={item.id} movie={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  section: {
    gap: 8,
    paddingHorizontal: 12,
  },
  popularMovieList: {
    gap: 12,
  },
  movieCard: {
    width: 200,
    height: 180,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  movieInfo: {
    padding: 8,
  },
});
