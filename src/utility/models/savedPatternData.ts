import { SerializedDiagram } from '../serialization';

export default interface SavedPatternData {
    name: string;
    diagram: SerializedDiagram;
}
