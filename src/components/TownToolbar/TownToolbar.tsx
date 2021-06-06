import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ElectronAPI from '../../utility/electronApi';
import styles from './TownToolbar.module.scss';
import { Simulation } from '../../utility/models/talktown';
import { loadData } from '../../redux/database/databaseActions';
import { OPEN_TOWN_FILE, QUERY_DATABASE } from '../../utility/electronChannels';

declare const electron: ElectronAPI;

interface TownToolbarProps {
	loadTown: typeof loadData;
}

interface TownToolbarState {
	townName?: string;
}

export class TownToolbar extends Component<TownToolbarProps, TownToolbarState> {
	constructor(props: TownToolbarProps) {
		super(props);
		this.state = {};
	}

	openTownFile() {
		electron.send(OPEN_TOWN_FILE);
		// try {
		//   const res = await electron.openTownFile();
		//   if (res.status === 'ok') {
		//     const sim = JSON.parse(res.payload.data);
		//     console.log(sim);
		//     this.props.loadTown(sim);
		//   }
		// } catch (error) {
		//   console.error(error);
		// }
	}

	loadTownFromServer(): void {
		electron
			.invoke(
				QUERY_DATABASE,
				`[
        :find
        ?startDate ?endDate ?currentDate ?townName ?foundingYear (count ?resident)
        :keys
        startDate endDate currentDate townName foundingYear population
        :in $ %
        :where
        [_ "sim/start_date" ?startDate]
        [_ "sim/end_date" ?endDate]
        [_ "sim/current_date" ?currentDate]
        [?town "town/name" ?townName]
        [?town "town/founding_year ?foundingYear]
        [?town "town/residents" ?resident]
      ]`
			)
			.then((res) => {
				console.log(res);
			});
	}

	render() {
		return (
			<div className={styles.TownToolbar}>
				<div>No Town Loaded</div>
				<div>
					<Button variant="primary" onClick={() => this.openTownFile()}>
						Load Town
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	loadTown: (town: Simulation) => loadData(town),
};

export default connect(mapStateToProps, mapDispatchToProps)(TownToolbar);
