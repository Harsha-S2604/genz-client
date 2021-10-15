import React, {Component} from 'react';
import Navbar from './component/navbar/Navbar';
import { Provider } from "react-redux";
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <ToastContainer 
            position="bottom-center" 
          />
        <Navbar />
      </Provider>
    )
  }
}