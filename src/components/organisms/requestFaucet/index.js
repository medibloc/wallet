import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import RequestFaucet from './requestFaucet';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
)(translate()(RequestFaucet));
