import React, {Component} from 'react';
import Navbar from './component/navbar/Navbar';
import { Provider } from "react-redux";
import store from './store/store';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
      </Provider>
    )
  }
}