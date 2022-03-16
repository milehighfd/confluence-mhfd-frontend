import { useState } from 'react';

let lastId = -1;
let cc = 0;

export const GlobalMapHook = () => {
  
  const [lastMaps, setLastMaps] = useState(JSON.parse(sessionStorage.getItem('globalMap') || '[]') as any);
  let [currentPosition, setCurrentPosition] = useState(JSON.parse(sessionStorage.getItem('globalMap') || '[]').length -1);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  }

  const addHistoric = (location: any) => {
    if (!location.id) {
      location.id = generateId();
    }
    // console.log(location);
    // console.log('my array is ', lastMaps);
    const currentId = cc;
    lastId = cc++;
    const copy = lastMaps;
    setTimeout(() => {
      if (currentId === lastId) {
        const findLocation = copy.find((l: any) => l.id === location.id);
        // console.log('findLocation', findLocation);
        if (!findLocation) {
          copy.push(location);
        } else {
          const locationPosition = copy.indexOf(findLocation);
          while (locationPosition != copy.length - 1) {
            if (locationPosition + 1 < copy.length) {
              const aux = copy[locationPosition];
              copy[locationPosition] = copy[locationPosition + 1];
              copy[locationPosition + 1] = aux;
            }
          }
        }
        if (copy.length > 5) {
          copy.shift();
        }
        setCurrentPosition(copy.length - 1);
        setLastMaps(copy);
        sessionStorage.setItem('globalMap', JSON.stringify(copy));
      }
    }, 2500);
  }

  const getHistoric = () => {
    return lastMaps;
  }

  const getPrevious = () => {
    let position = currentPosition;
    if (position > 0) {
      position--;
    }
    setCurrentPosition(position);
    // console.log(position, getPercentage());
    return lastMaps[position]; 
  }

  const getNext = () => {
    let position = currentPosition;
    if (position < lastMaps.length - 1) {
      position++;
    }
    setCurrentPosition(position);
    // console.log(position, getPercentage());
    return lastMaps[position];
  }

  const getCurrent = () => {
    if (currentPosition === -1) {
      return null;
    }
    return lastMaps[currentPosition];
  }

  const hasPrevious = () => {
    return currentPosition > 0;
  }

  const hasNext = () => {
    return currentPosition < lastMaps.length - 1;
  }

  // 0 1   2  3   4   5
  // 0 20  40 60  80  100
  const getPercentage = () => {
    if (lastMaps.length === 0) {
      return 0;
    }
    const percentage = (currentPosition / (lastMaps.length - 1)) * 100;
    return percentage;
  }

  return {hasNext, hasPrevious, getCurrent, getNext, getPrevious, getHistoric, addHistoric, getPercentage};
};