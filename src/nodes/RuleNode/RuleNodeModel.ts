import { NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { DeserializeEvent } from '@projectstorm/react-canvas-core';
import { TypedPortModel } from 'src/ports/TypedPort';

export const RULE_NODE_TYPE = 'rule-node';

export interface RuleNodeConfig {
    ruleName: string;
    ruleParams: string[];
}

export interface RuleNodeModelOptions extends RuleNodeConfig {
    type: typeof RULE_NODE_TYPE;
}

export interface RuleNodeModelGenerics {
    OPTIONS: RuleNodeModelOptions;
}

export class RuleNodeModel extends NodeModel<
    RuleNodeModelGenerics & NodeModelGenerics
> {
    protected parameterPorts: TypedPortModel[] = [];
    public outPort: TypedPortModel;

    constructor(options: RuleNodeConfig) {
        super({
            type: RULE_NODE_TYPE,
            ruleName: options.ruleName,
            ruleParams: options.ruleParams,
        });

        this.outPort = this.addPort(
            new TypedPortModel({
                in: false,
                name: 'out',
                maxLinks: 1,
                dataType: 'clause',
            })
        ) as TypedPortModel;

        for (const param of options.ruleParams) {
            const port = this.addPort(
                new TypedPortModel({
                    label: param,
                    dataType: 'ref',
                    name: param,
                    maxLinks: 1,
                    in: true,
                })
            ) as TypedPortModel;
            this.parameterPorts.push(port);
        }
    }

    getParameterPorts(): TypedPortModel[] {
        return this.parameterPorts;
    }

    serialize() {
        return {
            ...super.serialize(),
            ...this.options,
            parameterPorts: this.parameterPorts.map((port) => {
                return {
                    id: port.getID(),
                    name: port.getName(),
                };
            }),
        };
    }

    deserialize(event: DeserializeEvent<this>): void {
        super.deserialize(event);
        this.parameterPorts = event.data.parameterPorts.map((port) => {
            return this.getPort(port.name) as TypedPortModel;
        });
    }
}
