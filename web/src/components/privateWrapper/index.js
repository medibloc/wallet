import React from 'react';
import { connect } from 'react-redux';

export const PrivateWrapperComponent = ({ isAuthenticated, children }) => (
  isAuthenticated && <span>{ children }</ span>
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.account.address,
});

export default connect(mapStateToProps)(PrivateWrapperComponent);
