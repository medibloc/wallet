import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import CandidateSearch from './candidateSearch';

const mapStateToProps = state => ({
  candidates: state.candidates,
});

export default connect(mapStateToProps)(translate(CandidateSearch));
