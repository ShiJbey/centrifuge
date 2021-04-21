import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import ToastData from '../toast-data';
import Application from '../Application';
import BodyWidget from './BodyWidget';
import EditorTabTitle from './EditorTabTitle';


export interface EditorTabProps {
  title?: string;
  onClose?: () => void;
  onNodeAlert?: (data: ToastData) => void;
  onShowCode?: (code: string) => void;
}

const EditorTab: React.FC<EditorTabProps> = ({
  title,
  onClose,
  onNodeAlert,
  onShowCode,
}) => {
  const app = new Application();

  return (
        <BodyWidget app={app} onNodeAlert={onNodeAlert} onShowCode={onShowCode} />
  );
};

export default EditorTab;
