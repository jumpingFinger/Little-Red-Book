import React from 'react';
import {connect} from 'react-redux';
import Zhanglei from "../../component/zhanglei/Zhanglei"
import {Link} from "react-router-dom";
import md5 from "blueimp-md5";
import {loginEnterAPI} from "../../api/login";

//less
import "../../static/css/Land.less";
//1
import {Form, Icon, Input, Button, Checkbox ,Modal} from 'antd';
//2
const FormItem = Form.Item;

//弹出框
function loginFail() {
    const modal = Modal.error({
        title: '登陆失败',
        content: '请稍后重新尝试',
    });
    setTimeout(() => modal.destroy(), 2000);
}


class Land extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = ev => {
        ev.preventDefault(); //阻止按钮点击的默认行为
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {userName, userPass} = values;
                userPass = md5(userPass);
                let result = await loginEnterAPI({
                    /*loginEnterAPI返回一个promise，成功做什么，失败做什么*/
                    name: userName,
                    password: userPass
                });
                /*.then(result => { //走到result中 不一定成功 但是说明了服务器一定给了返回结果

                 }).catch(err => { //走道catch 说明服务器未正常返回结果

                 });*/
                if (result.state=== true) {
                    this.props.history.push("/HOME");//等于 goback  从哪里来的跳回到哪里去
                    return;
                }
                loginFail();

            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className="personLoginBox">
            <Link to="/login">
                <Icon type="left" className="return"/>
            </Link>
            <h4>用户名登录</h4>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {/*用户名验证*/}
                    {getFieldDecorator('userName', {})(<Input prefix={<Icon type="user"/>} placeholder="用户名"/>)}
                </FormItem>
                <FormItem>
                    {/*密码验证*/}
                    {getFieldDecorator('userPass', {})(<Input prefix={<Icon type="lock"/>} placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    <Link to="/login/register" className="register">注册</Link>
                </FormItem>
            </Form>
        </div>;
    }
}

export default Form.create()(connect()(Land));
