export interface EntityNodeModelOptions {
    entityType: string;
    entityName: string;
}

export interface LogicalNodeModelOptions {
    op: 'and' | 'or' | 'not';
}

export interface PrimitiveNodeModelOptions {
    value: number | string | boolean;
}
