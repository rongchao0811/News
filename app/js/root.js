import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import {Router,Route,hashHistory} from 'react-router';

import 'antd/dist/antd.css';
import '../css/pc.css';

import PCIndex from './components/pc_index';
import PCDetail from './components/pc_news_detail';
import MobileIndex from './components/MobileIndex';

export default class Root extends React.Component{
    render(){
        return(
           <div>
               <MediaQuery query='(min-device-width:1224px)'>
                   <Router history={hashHistory}>
                       <Route path="/" component={PCIndex}></Route>
                       <Route path="/details/:uniquekey" component={PCDetail}></Route>
                   </Router>
               </MediaQuery>
               <MediaQuery query='(max-device-width:1224px)'>
                   <MobileIndex/>
               </MediaQuery>
           </div>
        )
    }
};
ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);