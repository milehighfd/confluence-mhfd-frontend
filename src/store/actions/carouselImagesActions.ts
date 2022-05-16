import * as types from '../types/carouselImagesTypes';
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

export const getCarouselImages = () => {
  return (dispatch: Function) => {
    datasets.getData(SERVER.GET_IMAGE_DRIVE, datasets.getToken()).then(images => {
      if(images) {
        dispatch({ type: types.GET_CAROUSEL_IMAGES, images });
      }
    });
  }
};
