import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './TownToolbar.module.scss';

export class TownToolbar extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TownToolbar);
