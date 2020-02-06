
export default (property, stateHolder) => () => stateHolder.get().state[property];
