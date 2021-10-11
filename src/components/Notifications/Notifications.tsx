import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';
import { AlertInfo } from '../../utility/models/AlertInfo';
import { removeAlert } from '../../redux/alertSlice';
import { Dispatch } from '@reduxjs/toolkit';

const Notification: React.FC<{ alert: AlertInfo; onClose: () => void }> = (
    props
) => {
    let colorVariant = 'primary';

    switch (props.alert.type) {
        case 'error':
            colorVariant = 'danger';
            break;
        case 'success':
            colorVariant = 'success';
            break;
        case 'warning':
            colorVariant = 'warning';
            break;
    }

    return (
        <Toast
            bg={colorVariant}
            style={{ zIndex: 200 }}
            onClose={() => props.onClose()}
        >
            <Toast.Header>
                <strong className="me-auto">Centrifuge</strong>
            </Toast.Header>
            <Toast.Body>{props.alert.message}</Toast.Body>
        </Toast>
    );
};

type NotificationsProps = PropsFromRedux;

/**
 * Displays notifications in the gui for error and success messages
 */
const Notifications: React.FC<NotificationsProps> = (props) => {
    return (
        <ToastContainer position={'top-end'} style={{ padding: '6px' }}>
            {props.alerts.map((alert, index) => {
                return (
                    <Notification
                        key={`Notification_${index}`}
                        alert={alert}
                        onClose={() => {
                            props.onRemove(index);
                        }}
                    />
                );
            })}
        </ToastContainer>
    );
};

const mapStateToProps = (state: RootState) => ({
    alerts: state.alerts.alerts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onRemove: (index: number) => dispatch(removeAlert(index)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Notifications);
