import React from 'react';
import {Provider} from 'react-redux';
import {store} from "@store";

interface State {
}

interface Props {
}

export const AppComponent: React.FunctionComponent<Props> = props => {
    return (
        <Provider store={store}>
            <div>
                qwe
            </div>
        </Provider>
    );
};

export const App = AppComponent;
