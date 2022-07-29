import React, { Component } from "react";
import { Form, Select, Input } from "antd";
export default class AddForm extends Component {
  formRef = React.createRef();
  componentDidUpdate() {
    //实时更新
    this.formRef.current.setFieldsValue({
      parentId: this.props.parentId,
    });
  }
  componentWillMount(){
    this.props.setForm(this.formRef)
    
  }
  render() {
    const {categorys,parentId}=this.props
    return (
      <Form
        initialValues={{
          parentId: parentId,
          categoryName: "",
        }}
        ref={this.formRef}
      >
        <Form.Item name="parentId">
          <Select>
            <Select.Option value="0">一级分类</Select.Option>
            {categorys.map(c=><Select.Option value={c._id} key={c._id}>{c.name}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          name="categoryName"
          rules={[
            { required: true,  message: "分类名称必须输入" },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    );
  }
}
