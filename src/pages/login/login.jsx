import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"
import './login.less'
import logo from '../../assets/images/login.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'
/* 
登录的路由组件 
*/

class Login extends Component {
  formRef = React.createRef();

  getFormData = (value) => {
    const form = this.formRef.current
    console.log(form.getFieldsValue())

  }
  validatePwd = (rule, value) => {
    if (!value) {
      return Promise.reject(new Error('请输入密码'));
    } else if (value.length < 4) {
      return Promise.reject(new Error('密码长度不能小于4位'));
    } else if (value.length > 12) {
      return Promise.reject(new Error('密码长度不能大于12位'));
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject(new Error('密码必须是英文、数字下划线组成'));
    } else {
      return Promise.resolve();
    }
  }
  onFinish = async (values) => {
    const { username, password } = values;
    const resonse = await reqLogin(username, password)
    const result = resonse
    if (result.status === 0) {
      message.success('登录成功')
      //保存user
      const user = result.data
      memoryUtils.user = user//保存在内存中
      storageUtils.saveUser(user)
      //跳转到管理界面
      console.log(this.props)
      this.props.history.replace('/')
    } else {
      message.error(result.msg)
    }
    // try {
    //   await reqLogin(username,password)
    // } catch (err) {
    //   console.log('err:',err)
    // }

  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    //如果用户已经登录，自动跳转到管理界面
    const user=memoryUtils.user
    if(user._id){
     return <Redirect to='/' />
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, whitespace: true, message: '用户名必须输入' },
                { min: 4, message: '用户名至少4位' },
                { max: 12, message: '用户名至多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字下划线组成' }

              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { validator: this.validatePwd }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.getFormData}>
                Log in
        </Button>
            </Form.Item>
          </Form>

        </section>
      </div>
    )
  }
}
export default Login