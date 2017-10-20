import React from 'react';
import '../../css/mobile.css';
import MobileHeader from './MobileHeader';
import Footer from './pc_footer';
import {Tabs,Icon,Carousel} from 'antd';
import MobileList from './Mobile_list';
const TabPane = Tabs.TabPane;



export default class MobileIndex extends React.Component{
    render(){
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        }
        return(
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="头条" key='top'>
                        <Carousel {...settings}>
                            <div><img src={require('../../imgs/carousel_1.jpg')} alt=""/></div>
                            <div><img src={require('../../imgs/carousel_2.jpg')} alt=""/></div>
                            <div><img src={require('../../imgs/carousel_3.jpg')} alt=""/></div>
                            <div><img src={require('../../imgs/carousel_4.jpg')} alt=""/></div>
                        </Carousel>
                        <MobileList count={20} type="top"/>
                    </TabPane>
                    <TabPane tab="社会" key="society">
                        <MobileList count={20} type="shehui"/>
                    </TabPane>
                    <TabPane tab="国内" key="inland">
                        <MobileList count={20} type="guonei"/>
                    </TabPane>
                    <TabPane tab="国际" key="internal">
                        <MobileList count={20} type="guoji"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="yule">
                        <MobileList count={20} type="top"/>
                    </TabPane>
                </Tabs>
                <Footer/>
            </div>
        )
    }
};