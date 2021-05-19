import { PortModelAlignment } from "@projectstorm/react-diagrams-core";
import { CentrifugeNodeTypesModelOptions } from "../nodes/nodeTypes";

export interface SerializedNodeModel {
  ports: {
    name: string;
    alignment: PortModelAlignment;
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
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  points: {
      x: number;
      y: number;
      type: string;
      selected: boolean;
      extras: any;
      id: string;
      locked: boolean;
  }[];
  labels: {
      offsetX: number;
      offsetY: number;
      type: string;
      selected: boolean;
      extras: any;
      id: string;
      locked: boolean;
  }[];
  type: string;
  selected: boolean;
  extras: any;
  id: string;
  locked: boolean;
}

export interface SerializedModelLayer<T = any> {
  isSvg: boolean;
  transformed: boolean;
  models: {
    [id: string]: T
  };
  type: string;
  selected: boolean;
  extras: any;
  id: string;
  locked: boolean;
}

export interface SerializedNodeLayer extends SerializedModelLayer<SerializedNodeModel & CentrifugeNodeTypesModelOptions> {
  type: 'diagram-nodes';
}

export interface SerializedLinkLayer extends SerializedModelLayer<SerializedLinkModel> {
  type: 'diagram-links';
}

export interface SerializedDiagram {
  offsetX: number;
  offsetY: number;
  zoom: number;
  gridSize: number;
  layers: (SerializedNodeLayer | SerializedLinkLayer | SerializedModelLayer)[];
  id: string;
  locked: boolean;
}
