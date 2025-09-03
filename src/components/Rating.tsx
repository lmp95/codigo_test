import { StyleSheet, View } from 'react-native';
import Typography from './Typography';
import { Star } from 'lucide-react-native';

type RatingProps = {
  rating: number;
};
export default function Rating({ rating }: RatingProps) {
  return (
    <View style={styles.rating}>
      <Typography size="sm">{rating.toFixed(1)}</Typography>
      <Star size={14} fill="#c80404ff" stroke="#c80404ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
