import React from 'react';
import { FlatList, View, StyleSheet, Text, FlatListProps } from 'react-native';
import LoadingCard from './LoadingCard';
import Typography from './Typography';

type InfiniteScrollListProps<T> = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
} & FlatListProps<T>;

export default function InfiniteScrollList<T>({
  data,
  isLoading = false,
  isError = false,
  errorMessage = 'Something went wrong',
  onEndReached,
  ...props
}: InfiniteScrollListProps<T>) {
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      ListFooterComponent={
        isLoading ? (
          <View style={styles.footer}>
            {[1, 2, 3].map(idx => (
              <LoadingCard key={idx} />
            ))}
          </View>
        ) : null
      }
      ListEmptyComponent={
        !isLoading && (!data || data.length === 0) ? (
          <View style={styles.errorContainer}>
            <Typography>{errorMessage}</Typography>
          </View>
        ) : null
      }
      refreshing={false}
      onEndReached={info => {
        if (isLoading || isError) return;
        onEndReached && onEndReached(info);
      }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
});
