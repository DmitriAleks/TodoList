import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {store} from "../state/store";

export const ReduxStoreProviderDecorator = (storeFn: ()=> ReactNode) => <Provider store={store}>
    {storeFn()}
</Provider>

