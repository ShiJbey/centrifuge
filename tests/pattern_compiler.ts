import * as pst from '../src/PatternCompiler/syntaxTree';

const tree = new pst.PatternSyntaxTree();

const val_27 = new pst.PrimitiveValueNode('val_27', 27);

const occ_type = new pst.PrimitiveValueNode('occ_type', 'Comedian');

const occupation_0 = new pst.EntitySyntaxNode(
    'occupation_0',
    'occupation',
    'occupation_0',
    {
        type: [{ node: occ_type, port: 'out' }],
    },
    ['ref']
);

const person_0 = new pst.EntitySyntaxNode(
    'person_0',
    'person',
    'person_0',
    {
        age: [{ node: val_27, port: 'out' }],
        occupation: [{ node: occupation_0, port: 'ref' }],
    },
    []
);

const business_0 = new pst.EntitySyntaxNode(
    'business_0',
    'business',
    'business_0',
    {},
    ['owner']
);

const owner_equals = new pst.RangePredicateSyntaxNode(
    'owner_equals',
    '=',
    {
        node: occupation_0,
        port: 'ref',
    },
    {
        node: business_0,
        port: 'owner',
    }
);

const logical_0 = new pst.LogicalSyntaxNode('logical_0', 'not', [owner_equals]);

const not_join_0 = new pst.LogicalJoinSyntaxNode(
    'logical_join_0',
    'not-join',
    [occupation_0],
    [business_0],
    [logical_0]
);

tree.addLeafNode(not_join_0);

const var_0 = new pst.VariableSyntaxNode('var_0', person_0);

tree.addVariableNode(var_0);

console.log(pst.toQueryString(tree.compile('test_pattern')));
