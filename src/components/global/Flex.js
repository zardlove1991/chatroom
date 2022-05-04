import styled from 'vue-styled-components';
const flexProps = {
    display: {
        default: 'flex',
        type: String
    },
    direction: {
        default: 'row',
        type: String
    },
    alignItem: {
        default: 'initial',
        type: String
    },
    justifyContent: {
        default: 'initial',
        type: String
    },
    flexWrap: {
        default: 'nowrap',
        type: String
    },
    flex: {
        default: '',
        type: String
    }
};
const Flex = styled('div', flexProps)`
    display: ${props => props.display};
    flex-direction: ${props => props.direction}
    align-items: ${props => props.alignItem};
    justify-content: ${props => props.justifyContent};
    flex-wrap: ${props => props.flexWrap};
    flex: ${props => props.flex};
`;

export {
    Flex
};