import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ElectronAPI from '../../utility/electronApi';
import { RootState } from '../../redux/store';
import styles from './TownToolbar.module.scss';

declare const electron: ElectronAPI;

export class TownToolbar extends Component {
  async openTownFile() {
    try {
      const res = await electron.openTownFile();
      if (res.status === 'ok') {
        const sim = JSON.parse(res.payload);
        console.log(sim);
        // this.props.loadTown(sim);
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
    <div className={styles.TownToolbar}>
      <div>
        No Town Loaded
      </div>
      <div>
        <Button variant="primary">Load Town</Button>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TownToolbar);
