import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ElectronAPI from '../../utility/electronApi';
import { RootState } from '../../redux/store';
import styles from './TownToolbar.module.scss';
import { Simulation } from '../../utility/models/talktown';
import { loadData } from '../../redux/database/databaseActions';

declare const electron: ElectronAPI;

interface TownToolbarProps {
  loadTown: typeof loadData;
}

export class TownToolbar extends Component<TownToolbarProps> {
  async openTownFile() {
    try {
      const res = await electron.openTownFile();
      if (res.status === 'ok') {
        const sim = JSON.parse(res.payload.data);
        console.log(sim);
        this.props.loadTown(sim);
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
        <Button variant="primary" onClick={() => this.openTownFile().catch(console.error)}>Load Town</Button>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = {
  loadTown: (town: Simulation) => loadData(town),
};

export default connect(mapStateToProps, mapDispatchToProps)(TownToolbar);
