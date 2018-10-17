import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Safekeeping from './safekeeping';

export default connect()(translate()(Safekeeping));
