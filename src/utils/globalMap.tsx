let lastId = -1;
let cc = 0;
export let globalMap = {
  center: -1,
  bbox: [-1, -1, -1, -1],
} as any;

export const saveMap = () => {
  sessionStorage.setItem('globalMap', JSON.stringify(globalMap));
}

export const getMap = () => {
  globalMap = JSON.parse(sessionStorage.getItem('globalMap') || `{'center': -1, 'bbox': [-1, -1, -1, -1]}`);
  return globalMap;
};

export const addNewMap = (center: any, bbox: any) => {
  const currentId = cc;
  lastId = cc++;
  setTimeout(() => {
    console.log('after 5 sec current ', currentId, ' last ', lastId);
    if (lastId === currentId) {
      globalMap.center = center;
      globalMap.bbox = bbox;
      addHistoric(globalMap);
      saveMap();
    }
  }, 5000);
}

export const getMoreMaps = (map: any) => {
  map.on('idle', () => {
    console.log('idle');
    const currentId = cc;
    lastId = cc++;
    const center = map.getCenter();
    const bbox = map.getBounds();
    setTimeout(() => {
      if (lastId === currentId) {
        globalMap.center = center;
        globalMap.bbox = bbox;
        saveMap();
      }
    }, 5000);
  });
}

const lastMaps = [] as any;
let currentPosition = -1;

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
}

export const addHistoric = (location: any) => {
  if (!location.id) {
    location.id = generateId();
  }
  console.log(location);
  const currentId = cc;
  lastId = cc++;
  setTimeout(() => {
    const findLocation = lastMaps.find((l: any) => l.id === location.id);
    console.log('findLocation', findLocation);
    if (!findLocation) {
      lastMaps.push(location);
    } else {
      const locationPosition = lastMaps.indexOf(findLocation);
      while (locationPosition != lastMaps.length - 1) {
        if (locationPosition + 1 < lastMaps.length) {
          const aux = lastMaps[locationPosition];
          lastMaps[locationPosition] = lastMaps[locationPosition + 1];
          lastMaps[locationPosition + 1] = aux;
        }
      }
    }
    if (lastMaps.length > 5) {
      lastMaps.shift();
    }
    currentPosition = lastMaps.length - 1;
    console.log(currentPosition, lastMaps);
  }, 2500);
}

export const getHistoric = () => {
  return lastMaps;
}

export const getPrevious = () => {
  if (currentPosition > 0) {
    currentPosition--;
  }
  console.log(currentPosition, getPercentage());
  return lastMaps[currentPosition]; 
}

export const getNext = () => {
  if (currentPosition < lastMaps.length - 1) {
    currentPosition++;
  }
  console.log(currentPosition, getPercentage());
  return lastMaps[currentPosition];
}

export const getCurrent = () => {
  if (currentPosition === -1) {
    return null;
  }
  return lastMaps[currentPosition];
}

export const hasPrevious = () => {
  return currentPosition > 0;
}

export const hasNext = () => {
  return currentPosition < lastMaps.length - 1;
}

// 0 1   2  3   4   5
// 0 20  40 60  80  100
export const getPercentage = () => {
  if (lastMaps.length === 0) {
    return 0;
  }
  const percentage = (currentPosition / (lastMaps.length - 1)) * 100;
  return percentage;
}
