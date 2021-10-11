import { configureStore } from '@reduxjs/toolkit';
import { PatternCacheSlice } from './patternSlice';
import { FileTreeSlice } from './fileTreeSclice';
import { AlertSlice } from './alertSlice';
import { EditorSlice } from './editorSlice';

const store = configureStore({
    reducer: {
        editors: EditorSlice.reducer,
        alerts: AlertSlice.reducer,
        fileTree: FileTreeSlice.reducer,
        patternCache: PatternCacheSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
