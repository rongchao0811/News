import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PC_Container from './pc_container';

export default class PCIndex extends React.Component{
    render(){
        return(
            <div>
                <PCHeader/>
                <PC_Container/>
                <PCFooter/>
            </div>
        )
    }
};