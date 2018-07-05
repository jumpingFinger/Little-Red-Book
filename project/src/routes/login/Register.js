import React from 'react';
import {connect} from 'react-redux';
import Zhanglei from "../../component/zhanglei/Zhanglei"
import {Link} from "react-router-dom";
import md5 from "blueimp-md5";
import {loginRegister} from "../../api/login";


import {Form, Icon, Input, Button, Checkbox, Modal, Row, Col,} from 'antd';
//less
import"../../static/css/Land.less"
const FormItem = Form.Item;

//弹出框
function loginFail() {
    const modal = Modal.error({
        title: '注册失败',
        content: '请稍后重新尝试',
    });
    setTimeout(() => modal.destroy(), 2000);
}

function RegisterFail() {
    const modal = Modal.error({
        title: '手机号码已存在',
        content: '请稍后重新尝试',
    });
    setTimeout(() => modal.destroy(), 2000);
}

class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = ev => {
        ev.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                values.password = md5(values.password);
                let result = await loginRegister(values);
                console.log(result);
                if (parseFloat(result.state) === 0) {
                    this.props.history.push("/login/Land");
                    return;
                } else if (parseFloat(result.state) === 1) {
                    loginFail();
                    return;
                } else if (parseFloat(result.state) === 2) {
                    RegisterFail();
                    return;
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return <section className="personLoginBox">
            <Link to="/login">
                <Icon type="left" className="return"/>
            </Link>

            <h4>填写用户信息</h4>
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="用户名">
                    {getFieldDecorator("name", {
                        rules: [
                            {required: true, message: '请输入用户名',}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="密码">
                    {getFieldDecorator("password", {
                        rules: [
                            {required: true, message: '请输入密码',},
                        ]
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="手机号">
                    {getFieldDecorator("phone", {
                        rules: [
                            {required: true, message: '请输入手机号',}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="邮箱">
                    {getFieldDecorator("email", {
                        rules: [
                            {required: true, message: '请输入邮箱地址',},
                            {type: "email", message: "您输入的邮箱地址格式不正确"}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">立即注册</Button>
                </FormItem>
            </Form>

        </section>
    }
}

export default Form.create()(connect()(Register));
