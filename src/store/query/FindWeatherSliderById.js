
export default (storeHolder, id) => () => storeHolder.get().state.sliders.find(s => s.id === id);
