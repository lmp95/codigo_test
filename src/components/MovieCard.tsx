import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from './Typography';
import { Movie } from '../types/movie';
import { useNavigation } from '@react-navigation/native';
import { Heart } from 'lucide-react-native';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { toggleLikedMovie, useLikedMoviesSelector } from '../redux/moviesSlice';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const likedMovies = useLikedMoviesSelector();

  const isLiked = likedMovies.includes(movie.id);

  const handleToggleFavorite = () => {
    dispatch(toggleLikedMovie(movie.id));
  };

  return (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() =>
        navigation.navigate('MovieDetail', {
          movieId: movie.id?.toString(),
        })
      }
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={{ width: 200, height: 120 }}
      />
      <View style={styles.movieInfo}>
        <Typography numberOfLines={1}>{movie.title}</Typography>
        <Rating rating={movie.vote_average} />
      </View>

      <TouchableOpacity style={styles.favorite} onPress={handleToggleFavorite}>
        <Heart
          size={20}
          fill={isLiked ? '#c62828' : 'transparent'}
          stroke={isLiked ? '#c62828' : '#c62828'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  movieCard: {
    width: 200,
    height: 180,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  movieInfo: {
    padding: 8,
  },
  favorite: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
