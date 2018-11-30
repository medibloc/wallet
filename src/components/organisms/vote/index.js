import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Vote from './vote';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps)(translate()(Vote));
