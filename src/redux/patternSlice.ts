import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompiledPattern } from 'src/PatternCompiler/syntaxTree';

export interface PatternInfo {
    filepath: string;
    pattern: CompiledPattern;
}

export interface PatternCacheState {
    patterns: PatternInfo[];
}

const initialState: PatternCacheState = {
    patterns: [],
};

export const PatternCacheSlice = createSlice({
    name: 'patternCache',
    initialState,
    reducers: {
        addPattern: (
            state: PatternCacheState,
            action: PayloadAction<PatternInfo>
        ) => {
            const modifiedPatternArr = [...state.patterns];
            modifiedPatternArr.push(action.payload);
            state.patterns = modifiedPatternArr;
        },
        removePattern: (
            state: PatternCacheState,
            action: PayloadAction<string>
        ) => {
            const modifiedPatternArr = [...state.patterns].filter(
                (patternInfo) => patternInfo.filepath !== action.payload
            );
            state.patterns = modifiedPatternArr;
        },
        updatePattern: (
            state: PatternCacheState,
            action: PayloadAction<PatternInfo>
        ) => {
            let patternUpdated = false;
            const modifiedPatternArr = [...state.patterns].map(
                (patternInfo) => {
                    if (patternInfo.filepath === action.payload.filepath) {
                        patternInfo.pattern = action.payload.pattern;
                        patternUpdated = true;
                    }
                    return patternInfo;
                }
            );

            if (!patternUpdated) {
                modifiedPatternArr.push(action.payload);
            }

            state.patterns = modifiedPatternArr;
        },
        clearPatterns: () => {
            return { patterns: [] };
        },
    },
});

export const { addPattern, removePattern, updatePattern, clearPatterns } =
    PatternCacheSlice.actions;
