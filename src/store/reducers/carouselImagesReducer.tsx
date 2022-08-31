import * as types from '../types/carouselImagesTypes';

const init = {
    images: []
}


const carouselImages = (state = init, action : any) => {
    switch(action.type) {
        case types.GET_CAROUSEL_IMAGES: 
        return {
            ...state,
            images: action.images
        }
        default: 
            return state;
    }
}

export default carouselImages;