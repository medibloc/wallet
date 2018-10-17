import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
// import App from './app';
import App from './app';

const mapStateToProps = state => ({
  savedAccounts: state.savedAccounts,
});

export default connect(
  mapStateToProps,
)(withRouter(translate()(App)));
