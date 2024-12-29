import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './AppNavigator'; // Adjust the import path as necessary
import store from './stores/store';

const App = () => {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
};

export default App;