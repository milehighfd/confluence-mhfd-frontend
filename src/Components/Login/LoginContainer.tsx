import { connect } from 'react-redux';

import { User } from '../../Classes/TypeList';
import LoginView from './LoginView';

import { replaceAppUser } from '../../store/actions/appUser';
import { saveUserInformation } from '../../store/actions/ProfileActions';

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
