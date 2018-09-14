
import { connect } from 'react-redux';
import BandwidthBar from './bandwidthBar';

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps)(BandwidthBar);
