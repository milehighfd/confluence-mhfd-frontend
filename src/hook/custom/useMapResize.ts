import { useEffect, useState } from 'react';

const useMapResize = (leftWidth: number, map: any) => {
  const [, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (map) {
        setCount(count => {
          if (count === 5) {
            if (count === 5) {
              clearInterval(intervalId);
            }
            return 0;
          } else {
            map.resize();
            return count + 1;
          }
        });
      }
    }, 250);
    return () => {
      clearInterval(intervalId)
    };
  }, [leftWidth, map]);
};

export default useMapResize;
