import { useDispatch, useSelector } from 'react-redux';
import { getCarouselImages } from '../store/actions/carouselImagesActions';

export const useCarouselImagesState = () => useSelector(
  (rootState: { carouselImages: any }) => rootState.carouselImages
);

export const useCarouselImagesDispatch = () => {
  const dispatch = useDispatch();
  return {
    getCarouselImages: () => {
      dispatch(getCarouselImages());
    }
  };
};
