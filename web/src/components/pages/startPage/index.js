import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import StartPage from './startPage';

const mapStateToProps = state => ({
  savedAccounts: state.savedAccounts,
});

export default connect(
  mapStateToProps,
)(translate()(StartPage));
