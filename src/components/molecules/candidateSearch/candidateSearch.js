import React from 'react';
import InlineSVG from 'svg-inline-react';
import { translate } from 'react-i18next';
import Clear from '../../../assets/images/icons/clear.svg';
import Search from '../../../assets/images/icons/search.svg';
import styles from './candidateSearch.css';

class CandidateSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
      searchWord: '',
      selectedCandidateId: null,
    };
  }

  clearCandidate() {
    this.props.clearSearchedCandidate();
    this.setState({
      isSelected: false,
      searchWord: '',
      selectedCandidateId: null,
    });
  }

  getSearchedCandidates() {
    const result = [];
    const maxResult = 5;
    if (!this.props.candidates || this.props.candidates.length === 0 ||
      !this.state.searchWord || this.state.searchWord.length === 0) return result;

    this.props.candidates.some((c) => {
      if (result.length === maxResult) return true;
      if (c.alias.startsWith(this.state.searchWord)) {
        result.push({
          candidateId: c.candidateId,
          type: 'Alias',
          value: c.alias,
        });
      }
      return false;
    });

    this.props.candidates.some((c) => {
      if (result.length === maxResult) return true;
      if (c.address.startsWith(this.state.searchWord)) {
        result.push({
          candidateId: c.candidateId,
          type: 'Address',
          value: c.address,
        });
      }
      return false;
    });

    return result;
  }

  handleSearchWordChange(searchWord) {
    this.props.clearSearchedCandidate();
    this.setState({
      isSelected: false,
      searchWord,
      selectedCandidateId: null,
    });
  }

  selectCandidate(candidateId, searchWord) {
    this.props.setSearchedCandidate(candidateId);
    this.setState({
      isSelected: true,
      searchWord,
      selectedCandidateId: candidateId,
    });
  }

  render() {
    const { t } = this.props;
    const searchedCandidates = this.getSearchedCandidates();

    return <div className={styles.wrapper}>
      <div className={`${styles.searchWrapper}`}>
        <input
          className={`${styles.candidateSearchInput}
            ${this.state.searchWord ? styles.filled : null}`}
          onChange={event => this.handleSearchWordChange(event.target.value)}
          placeholder={t('Enter alias or address')}
          type='text'
          value={this.state.searchWord} />
        <div className={`${styles.iconWrapper}`}>
          {this.state.isSelected ?
            <InlineSVG className={`${styles.clearIcon}`}
              src={Clear}
              onClick={() => this.clearCandidate()}/> :
            <InlineSVG className={`${styles.searchIcon}`}
              src={Search}/>
          }
        </div>
      </div>
      {!this.state.isSelected && searchedCandidates.length > 0 ?
        <div className={`${styles.resultWrapper}`}>
          <ul className={`${styles.candidateList}`}>
            {searchedCandidates.map(({ candidateId, type, value }, index) =>
              <li className={`${styles.row}`}
                onClick={() => this.selectCandidate(candidateId, value)}
                key={`${index}-${candidateId}`}>
                <div className={`${styles.candidateWrapper}`}>
                  <span className={`${styles.candidate}`}>
                    {`${t(type)}${': '}${value}`}
                  </span>
                </div>
              </li>)}
          </ul>
        </div> : null}
    </div>;
  }
}

export default translate()(CandidateSearch);
