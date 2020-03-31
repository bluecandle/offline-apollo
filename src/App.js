import React, {Component} from "react";
import {Query} from 'react-apollo'
import {GET_NOTES} from './queries.js'

class App extends Component {
    render() {
        return (
            <div className="App">
              {/* 역기다가 아무것도 안 채워넣으면 cache 가 작동 안하는 버그가 있다고 한다. */}
              <Query query = {GET_NOTES}>{()=>null}</Query>
            </div>
        );
    }
}

export default App;
