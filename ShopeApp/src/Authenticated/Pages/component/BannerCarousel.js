import React, { useRef, useEffect } from 'react';
import { ScrollView, Image, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

import banner from "../Data/Banners"

function BannerCarousel() {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const newOffset =
          (scrollViewRef.current.contentOffset?.x || 0 + width) % (width * banner.length);
        scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
      }
    }, 3000); // Change the interval as needed (e.g., 3000ms = 3 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    >
      {banner.map((item, index) => (
        <View key={item.id} style={{ width, height: 200 }}>
          <Image
            source={item.url}
            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default BannerCarousel;
