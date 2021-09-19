import React, {Component} from 'react';
import Navbar from './component/navbar/Navbar';
import { Provider } from "react-redux";
import store from './store/store';
import { Toaster } from 'react-hot-toast';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Toaster 
          toastOptions={{
            error: {
              style: {
                background: "#FFCCCC",
                color: "#D8000C",
                fontSize: "14px",
                marginTop: "5%"
              },
            },
          }}/>
        <Navbar />
      </Provider>
    )
  }
}