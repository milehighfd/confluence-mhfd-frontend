import { connect } from 'react-redux';

import LoginView from './LoginView';
import { replaceAppUser } from '../../store/actions/appUser';
import { User } from '../../Classes/TypeList';

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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
