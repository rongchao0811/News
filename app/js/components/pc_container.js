import React from 'react';
import { Row, Col, Tabs, Icon, Carousel } from 'antd';
import PC_News_Block from './pc_news_block';
import PC_Img_block from './pc_news_img_block';
const TabPane = Tabs.TabPane;
export default class PC_Container extends React.Component{
    render(){
        // 设置轮播属性
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        }
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class='container'>
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src={require('../../imgs/carousel_1.jpg')} alt=""/></div>
                                    <div><img src={require('../../imgs/carousel_2.jpg')} alt=""/></div>
                                    <div><img src={require('../../imgs/carousel_3.jpg')} alt=""/></div>
                                    <div><img src={require('../../imgs/carousel_4.jpg')} alt=""/></div>
                                </Carousel>
                            </div>
                            <PC_Img_block count={6} type="guoji" width="400px" cartTitle="国际" imgWidth='105px'/>
                        </div>
                        <Tabs class="tabNews">
                            <TabPane tab="头条" key="1">
                                <PC_News_Block count={28} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PC_News_Block count={28} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                        <div>
                            <PC_Img_block count={7} type="guonei" width="100%" cartTitle="国内" imgWidth='146px'/>
                            <PC_Img_block count={14} type="yule" width="100%" cartTitle="娱乐" imgWidth='146px'/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}

