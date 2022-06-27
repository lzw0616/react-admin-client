import React, { Component } from "react";
import { Form, Select, Input } from "antd";
export default class AddForm extends Component {
  render() {
    return (
      <Form
        initialValues={{
          parentId: this.props.parentId,
          categoryName: "",
        }}
      >
        <Form.Item name="parentId">
          <Select>
            <Select.Option value="0">一级分类</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="categoryName"
          rules={[
            { required: true, whitespace: true, message: "分类名称必须输入" },
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    );
  }
}
