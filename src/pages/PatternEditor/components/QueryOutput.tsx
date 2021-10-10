import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { connect, ConnectedProps } from 'react-redux';
import { toQueryString, toRuleString } from 'src/PatternCompiler/syntaxTree';
import { RootState } from '../../../redux/store';
import styles from './QueryOutput.module.scss';

type QueryOutputProps = PropsFromRedux;

interface State {
    queryText: string;
    ruleText: string;
}

const QueryOutput: React.FC<QueryOutputProps> = (props) => {
    const [state, setState] = useState<State>({ queryText: '', ruleText: '' });

    const compilePatternsAndRules = () => {
        let query = '';
        const rules: string[] = [];

        const [activeEditorFilepath] = props.editors
            .filter((editor) => editor.id == props.activeEditor)
            .map((editor) => editor.filepath);

        if (activeEditorFilepath) {
            for (const pattern of props.patterns) {
                if (pattern.filepath === activeEditorFilepath) {
                    query = toQueryString(pattern.pattern);
                } else {
                    rules.push(toRuleString(pattern.pattern));
                }
            }
        }

        setState({
            queryText: query,
            ruleText: rules.join('\n\n\n'),
        });
    };

    return (
        <div className={styles.Container}>
            <Button
                variant="success"
                onClick={() => compilePatternsAndRules()}
                className={styles.CompileBtn}
            >
                <span>
                    {'Compile '}
                    <FaPlay />
                </span>
            </Button>
            <h3 className={`mx-1 mb-3`}>Query</h3>
            <textarea
                value={state.queryText}
                readOnly
                rows={6}
                style={{ width: '100%', height: '100%', resize: 'none' }}
            ></textarea>
            <h3 className={`m-1`}>Rules</h3>
            <textarea
                value={state.ruleText}
                readOnly
                rows={6}
                style={{ width: '100%', height: '100%', resize: 'none' }}
            ></textarea>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    patterns: state.patternCache.patterns,
    activeEditor: state.editors.activeEditor,
    editors: state.editors.editors,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(QueryOutput);
