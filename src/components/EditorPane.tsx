import React from 'react';

const EditorPane = () => {
  const editors = useSelector((state: RootState) => state.editor.editors);
  const activeEditor = useSelector((state: RootState) => state.editor.activeEditor);

  const  dispatch = useDispatch();



  const handleSaveFile = useCallback((path: string) => {
    console.log('Saving file to path:', path);
    console.log('Active Editors:', editors);
  }, [editors, activeEditor]);

  useEffect(() => {
    console.log("stting up electron handlers");
    electron.receive(SAVE_DIAGRAM, handleSaveFile);

    return () => {
      console.log("Deconstructing electron handlers");
      electron.removeListener(SAVE_DIAGRAM, handleSaveFile);
    }
  }, [editors, activeEditor]);

  useEffect(() => {

    console.log("Constructing");

    if (Object.keys(editors).length === 0) {
      // If this application was started from double-clicking
      // an associated filetype then we need to load it.
      // Otherwise or on error, open a blank editor tab.
      electron.send(GET_INIT_DATA);
    }

    return () => {
      console.log("Deconstructing");
    }
    // registerElectronApi(saveFile);
  }, []);

  const setActiveTab = (id: string) => {
    dispatch(selectEditor(id));
  };

  /** Create a new tab and set it as active */
  const createNewTab = (model?: any) => {
    let id = uuidv4();

    while (Object.keys(editors).includes(id)) {
      console.warn('Conflicting UUIDs');
      id = uuidv4();
    }

    dispatch(addEditor(id, 'New Diagram', null, model));
  };

  const closeTab = (id: string) => {
    dispatch(deleteEditor(id));
  };
  return (
    <div className={styles.PatternEditor}>
      <Nav
        className={styles.EditorTabNav}
        activeKey={activeEditor}
        onSelect={(tabID: string) => setActiveTab(tabID)}
      >
        {Object.keys(editors).map((editorID) => {
          const editor = editors[editorID];
          return (
            <Nav.Item
              key={editor.id}
              className={classnames(styles.EditorTab, {
                [styles.ActiveTab]: editor.active,
              })}
            >
              <Nav.Link eventKey={editor.id}>
                <EditorTab
                  isDirty={editor.dirty}
                  title={editor.title}
                  onClose={(event) => {
                    event.stopPropagation();
                    closeTab(editor.id);
                  }}
                />
              </Nav.Link>
            </Nav.Item>
          );
        })}
        <div>
          <Button
            variant="outline-light"
            onClick={() => createNewTab()}
            style={{ width: '5rem', margin: '0 6px' }}
          >
            <span>
              {'New '}
              <FaPlus />
            </span>
          </Button>
        </div>
      </Nav>

      <div
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Tab.Container
          transition={false}
          id="editor-tab-container"
          activeKey={activeEditor}
        >
          <Tab.Content as="div" style={{ height: '100%', width: '100%' }}>
            {Object.keys(editors).map((editorID) => {
              const editor = editors[editorID];
              return (
                <Tab.Pane
                  as="div"
                  style={{ height: '100%', width: '100%' }}
                  key={editorID}
                  eventKey={editorID}
                >
                  <EditorWidget
                    onUpdate={(data: any) => {
                      console.log('Editor updated');
                      dispatch(
                        updateEditor({
                          ...editor,
                          model: data,
                          dirty: true,
                        })
                      );
                    }}
                    onShowCode={() => setShowCode(true)}
                  />
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default EditorPane;
