import configureStore from './configureStore';

const getStore = (config) => {
    const store = configureStore(config);
    return store;
}

export default getStore;
