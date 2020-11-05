import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import AppContextProvider from "./context/AppContext";
import Layout from './components/Layout';

function App() {

  const store = generateStore();
 

  return (
    <AppContextProvider>
      <Provider store={store}>
        <Layout />
      </Provider>
    </AppContextProvider>
  );
}

export default App;