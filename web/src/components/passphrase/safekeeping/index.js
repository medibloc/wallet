import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Safekeeping from './safekeeping';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(
  mapStateToProps,
)(translate()(Safekeeping));
