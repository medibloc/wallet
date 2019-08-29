import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import ResultBox from './resultBox';
import { resetProcess } from '../../../../../actions/process';

const mapStateToProps = state => ({
  process: state.process,
});

const mapDispatchToProps = dispatch => ({
  resetProcess: () => dispatch(resetProcess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(ResultBox));
