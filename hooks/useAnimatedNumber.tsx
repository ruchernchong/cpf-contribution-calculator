"use client";

import { useEffect, useState } from "react";

const useAnimatedNumber = (targetValue: number, duration = 500) => {
  const [animatedValue, setAnimatedValue] = useState(targetValue);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const startValue = animatedValue;
    const diff = targetValue - startValue;
    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = startValue + diff * progress;
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [targetValue, duration]);

  return animatedValue;
};

export default useAnimatedNumber;
