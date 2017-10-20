import React from 'react';
import { Row, Col } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router';

export default class MobileList extends React.Component{
    constructor(){
        super();
        this.state = {
            news: '',
        }
    }
    componentWillMount(){
        var myFetchOptions = {
            method:"GET"
        }
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count,myFetchOptions)
            .then(response=>response.json()).then(json=>{
            this.setState({news:json})
        });
    }
    render(){
        const { news } = this.state;
        console.log(news);
        const newsList = news.length
            ?news.map((item, index)=>(
                <section key={index} class="m_article list-item special_section clearfix">
                    <Link to={`details/${item.uniquekey}`}>
                        <div class="m_article_img">
                            <img src={item.thumbnail_pic_s} alt={item.uniquekey}/>
                        </div>
                        <div class="m_article_info">
                            <div class="m_article_title">
                                <span>{item.title}</span>
                            </div>
                            <div class="m_article_desc clearfix">
                                <div class="m_article_desc_l">
                                    <span class="m_article_channel">{item.realtype}</span>
                                    <span class="m_article_time">{item.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            :"没有数据";

        return(
            <div>
                {newsList}
            </div>
        )
    }
}