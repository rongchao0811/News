import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Button,
    Menu,
    Icon,
    Input,
    message,
    Form,
    Checkbox,
    Modal
} from 'antd';
import '../../css/pc.css';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuGroup = Menu.ItemGroup;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class PCHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current:'top',
            modalVisible:false,
            action:'login',
            hasLogined:false,
            userName:'',
            userId:0
        }
    };
    handleSubmit(e){
        //阻止事件冒泡
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData= this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
        then(response=>response.json()).then(json=>{
            this.setState({userNickName:json.NickUserName,userid:json.UserId});
        });
        message.success("请求成功！");
        this.setModalVisible(false);
    };
    handleClick(e){
        console.log(e.key);
        if(e.key=='register'){
            this.setState({
                current:'register'
            });
            this.setModalVisible(true);
        }else {
            this.setState({
                current:e.key
            })
        }
    }
    setModalVisible(v){
        this.setState({
            modalVisible : v,
        });
    }
    render(){
        let {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const userNameError = isFieldTouched('r_userName') && getFieldError('r_userName');
        const passwordError = isFieldTouched('r_password') && getFieldError('r_password');

        //是否登录
        const userShow = this.state.hasLogined
            ?<Menu.Item class="register" key="logout">
                <Button type="primary" htmlType='button'>{this.state.userName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type='dashed' htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key='register' class='register'>
                <Icon type="appstore"></Icon>注册／登录
            </Menu.Item>;
        //设置弹出层显示

        //弹出层
        const userCenter = <Modal title='用户中心' wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
        onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false) }>
            <Tabs type='card'>
                <TabPane tab="注册" key="2">
                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item label="账户"
                                   validateStatus={userNameError?"error":""}
                                   help={userNameError || ''}>
                            {getFieldDecorator('r_userName', {
                                rules: [{ required: true, message: '请输入您的账号!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                        <Form.Item label="密码" validateStatus={passwordError ? 'error' : ''}
                                   help={passwordError || ''}>
                            {getFieldDecorator('r_password', {
                                rules: [{ required: true, message: '请输入您的密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                        <Form.Item label="确认密码" validateStatus={passwordError ? 'error' : ''}
                                   help={passwordError || ''}>
                            {getFieldDecorator('r_confirmPassword', {
                                rules: [{ required: true, message: '请输入您的密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>注册</Button>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
        return(
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src={require('../../imgs/logo.png')} alt="logo"/>
                            <span>React News</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key='top'>
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="society">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="inland">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="internal">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="recreation">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="sports">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="technology">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="fashion">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        {userCenter}
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
};
export default PCHeader = Form.create({})(PCHeader);