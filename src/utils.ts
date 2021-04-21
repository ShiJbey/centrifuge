import { PortModelAlignment } from "@projectstorm/react-diagrams-core";

export interface SerializedNodeModel {
  ports: {
    name: string;
    alignment: string | PortModelAlignment;
    parentNode: string;
    links: string[];
    x: number;
    y: number;
    type: string;
    selected: boolean;
    extras: any;
    id: string;
    locked: boolean;
  }[];
  x: number;
  y: number;
  type: string;
  selected: boolean;
  extras: any;
  id: string;
  locked: boolean;
}

export interface SerializedLinkModel {
  id: string;
  type: string;
  selected?: boolean;
  source?: string;
  sourcePort?: string;
  target?: string;
  targetPort?: string;
  points: {
    id: string;
    type: string;
    x: number;
    y: number;
  }[];
}

export interface SerializedModelLayer {
  id: string;
  type: string;
  isSvg: boolean;
  transformed: boolean;
  models: {
    [id: string]: (SerializedNodeModel | SerializedLinkModel) & {
      [key: string]: any;
    };
  };
}

export interface SerializedDiagram {
  id: string;
  offsetX: number;
  offsetY: number;
  zoom: number;
  gridSize: number;
  layers: SerializedModelLayer[];
}
