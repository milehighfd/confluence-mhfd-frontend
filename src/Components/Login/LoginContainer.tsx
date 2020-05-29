import { connect } from 'react-redux';

import { User } from '../../Classes/TypeList';
import LoginView from './LoginView';

import { replaceAppUser, resetAppUser } from '../../store/actions/appUser';
import { saveUserInformation, resetProfile } from '../../store/actions/ProfileActions';
import { resetMap } from '../../store/actions/mapActions';

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
    saveUserInformation(user: User) {
      dispatch(saveUserInformation(user))
    },
    resetAppUser() {
      dispatch(resetAppUser())
    },
    resetProfile() {
      dispatch(resetProfile())
    },
    resetMap() {
      dispatch(resetMap())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
