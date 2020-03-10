import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = (state: any): any => {
  return {
    appUser: state.appUser
  };
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
