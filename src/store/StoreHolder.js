export function StoreHolder() {

    let store = undefined;

    return {
        set,
        get
    };

    function set(newStore) {
        store = newStore;
    }

    function get() {
        if (!store) throw new Error('Getting store from StoreHolder before any store has been set');
        return store;
    }
}
