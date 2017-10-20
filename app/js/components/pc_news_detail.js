import React from 'react';
import {Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PC_Img_block from './pc_news_img_block';
export default class PC_News_Detail extends React.Component{
    constructor(){
        super();
        this.state={
            newsItem:''
        }
    }
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+this.props.params.uniquekey,myFetchOptions)
             .then(response=>response.json()).then(json=>{
                this.setState({newsItem:json})
            document.title = this.state.newsItem.title + "- ReactNews";
            console.log(json);
        });
    }
    createMarkUp(){
        return {__html: this.state.newsItem.pagecontent};
    }
    render(){

        return(
            <div>
                <PCHeader/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} class='container'>
                        <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkUp()}></div>
                    </Col>
                    <Col span={6}>
                        <PC_Img_block count={20} type="yule" width="100%" cartTitle="相关" imgWidth='136px'/>
                    </Col>
                    <Col span={2}></Col>
                    <BackTop/>
                </Row>
                <PCFooter/>
            </div>
        )
    }
}