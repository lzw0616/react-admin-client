import React, { Component } from "react";
import { Form, Input } from "antd";
export default class UpdateForm extends Component {
  formRef = React.createRef();
  componentDidUpdate() {
    //实时更新
    this.formRef.current.setFieldsValue({
      categoryName: this.props.categoryName,
    });
  }
  componentWillMount(){
    this.props.setForm(this.formRef)
    
  }
  render() {
    return (
      <Form ref={this.formRef}>
        <Form.Item name="categoryName" initialValue={this.props.categoryName} rules={[
            { required: true,  message: "分类名称必须输入" },
          ]}>
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    );
  }
}
