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

 class MobileHeader extends React.Component{
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
        if(e.key='register'){
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
    login(){
        this.setModalVisible(true);
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

        const userShow = this.state.hasLogined
            ?<Link><Icon type='inbox' /></Link>
            :<Icon type='setting' onClick={this.login.bind(this)}/>
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
            <div>
                <header class="mobile-header">
                    <img src={require('../../imgs/logo.png')} alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                {userCenter}
            </div>
        )
    }
};
export default MobileHeader = Form.create({})(MobileHeader);