export function StoreHolder() {

    let store = {};

    return {
        set,
        get
    };

    function set(newStore) {
        store = newStore;
    }

    function get() {
        return store;
    }
}
