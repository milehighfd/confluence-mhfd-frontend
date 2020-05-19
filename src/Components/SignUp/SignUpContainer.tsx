import { connect } from 'react-redux';

import SignUpView from './SignUpView';
import { replaceAppUser } from '../../store/actions/appUser';
import { User } from '../../Classes/TypeList';
import { getCarouselImages } from '../../store/actions/carouselImagesActions';

const mapStateToProps = (state: any): any => {
  return {
    sample: state.sample,
    images: state.carouselImages.images
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    replaceAppUser(appUser: User) {
      dispatch(replaceAppUser(appUser))
    },
    getCarouselImages() {
      dispatch(getCarouselImages())
    }
  };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
