import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useGetPopularMoviesInfiniteQuery,
  useGetUpcomingMoviesInfiniteQuery,
} from '../../../apis/movies';
import Typography from '../../../components/Typography';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const {
    data: upcomingMovies,
    isFetching: upcomingFetching,
    hasNextPage,
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
    <View style={styles.container}>
      <View style={styles.section}>
        <Typography size="lg" weight="bold">
          Upcoming
        </Typography>
        <FlatList
          data={upcomingMovies?.pages.flatMap(page => page.results) ?? []}
          contentContainerStyle={styles.popularMovieList}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.movieCard}
                onPress={() =>
                  navigation.navigate('MovieDetail', {
                    movieId: item.id?.toString(),
                  })
                }
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  width={200}
                  height={120}
                />
                <View style={styles.movieInfo}>
                  <Typography numberOfLines={1}>{item.title}</Typography>
                  <Typography size="xs">
                    {item.vote_average.toFixed(1)}
                  </Typography>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.section}>
        <Typography size="lg" weight="bold">
          Popular
        </Typography>
        <FlatList
          data={popularMovies?.pages.flatMap(page => page.results) ?? []}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularMovieList}
          horizontal
          keyExtractor={item => item.id.toString()}
          onEndReached={() => {
            if (popularHasNextPage && !popularIsFetchingNextPage)
              popularFetchNextPage();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.movieCard}
                onPress={() =>
                  navigation.navigate('MovieDetail', {
                    movieId: item.id?.toString(),
                  })
                }
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  width={200}
                  height={120}
                />
                <View style={styles.movieInfo}>
                  <Typography numberOfLines={1}>{item.title}</Typography>
                  <Typography size="xs">
                    {item.vote_average.toFixed(1)}
                  </Typography>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
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
