import { connect } from 'react-redux';

import SignUpView from './SignUpView';
import { replaceAppUser } from '../../store/actions/appUser';
import { User } from '../../Classes/TypeList';
import { getCarouselImages } from '../../store/actions/carouselImagesActions';
import { getUserInformation } from '../../store/actions/ProfileActions';

const mapStateToProps = (state: any): any => ({});

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    replaceAppUser(appUser: User) {
      dispatch(replaceAppUser(appUser))
    },
    getCarouselImages() {
      dispatch(getCarouselImages())
    },
    getUserInformation() {
      dispatch(getUserInformation())
    }
  };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
