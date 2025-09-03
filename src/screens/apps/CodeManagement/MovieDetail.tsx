import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetMovieDetailQuery } from '../../../apis/movies';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigationTypes';
import Typography from '../../../components/Typography';
import { minutesToHoursMinutes } from '../../../utils/helpers';
import { Heart } from 'lucide-react-native';
import Rating from '../../../components/Rating';
import { useDispatch } from 'react-redux';
import {
  toggleLikedMovie,
  useLikedMoviesSelector,
} from '../../../redux/moviesSlice';

export default function MovieDetail() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>();
  const dispatch = useDispatch();
  const likedMovies = useLikedMoviesSelector();
  const isLiked = likedMovies.includes(parseInt(params.movieId));

  const {
    data: movieDetail,
    isFetching: movieFetching,
    isError,
  } = useGetMovieDetailQuery({
    movieId: params.movieId,
    language: 'en-US',
  });

  const handleToggleFavorite = () => {
    dispatch(toggleLikedMovie(parseInt(params.movieId)));
  };

  if (movieFetching)
    return (
      <View style={styles.fullscreen}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );

  if (isError || !movieDetail)
    return (
      <View style={styles.fullscreen}>
        <Typography>Fail to reload movie detail</Typography>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.movieInfo}>
          <Typography weight="semiBold">{movieDetail.title}</Typography>
          <Rating rating={movieDetail.vote_average} />
        </View>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Heart
            size={20}
            fill={isLiked ? '#c62828' : 'transparent'}
            stroke={isLiked ? '#c62828' : '#c62828'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.info}>
          <Typography size="sm">Release Date</Typography>
          <Typography size="sm">{movieDetail.release_date}</Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.info}>
          <Typography size="sm">Genre</Typography>
          <Typography size="sm">{movieDetail.genres[0].name}</Typography>
        </View>
        <View style={styles.divider} />
        <View style={styles.info}>
          <Typography size="sm">Duration</Typography>
          <Typography size="sm">
            {minutesToHoursMinutes(movieDetail.runtime)}
          </Typography>
        </View>
      </View>
      <Typography style={styles.movieOverview}>
        {movieDetail.overview}
      </Typography>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 12,
    gap: 12,
  },
  main: {
    flexDirection: 'row',
    gap: 12,
  },
  poster: {
    width: 120,
    height: 200,
    borderRadius: 5,
  },
  movieInfo: {
    flex: 1,
    gap: 4,
  },
  movieOverview: {
    textAlign: 'justify',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e0e0e0',
    padding: 12,
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#b3b3b3',
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
