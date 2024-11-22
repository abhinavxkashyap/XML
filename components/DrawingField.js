// components/DrawingField.js
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

const DrawingField = () => {
  const paths = useRef([]);
  const currentPath = useRef('');

  const pan = Gesture.Pan()
    .onStart((event) => {
      const newPath = `M ${event.x} ${event.y}`;
      currentPath.current = newPath;
    })
    .onUpdate((event) => {
      const updatedPath = `${currentPath.current} L ${event.x} ${event.y}`;
      currentPath.current = updatedPath;
      paths.current = [...paths.current.slice(0, -1), updatedPath];
    })
    .onEnd(() => {
      paths.current = [...paths.current, currentPath.current];
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Svg style={styles.canvas}>
          {paths.current.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          ))}
        </Svg>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  canvas: {
    flex: 1,
  },
});

export default DrawingField;