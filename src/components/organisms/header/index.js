import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Header from './header';

const mapStateToProps = state => ({
  account: state.account,
});

export default withRouter(connect(
  mapStateToProps,
)(translate()(Header)));
