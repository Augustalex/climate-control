
export default (storeHolder, id) => () => storeHolder.get().state.buttons.find(s => s.id === id);
