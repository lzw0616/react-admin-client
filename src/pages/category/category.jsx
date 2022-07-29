import React, { Component } from "react";
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqUpdateCategory, reqAddCategory } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./update-form";
export default class Category extends Component {
  state = {
    categorys: [], // 一级分类列表
    subCategorys: [], //二级分类列表
    loading: false,
    parentId: "0", //当前需要显示的分类列表的父分类Id
    parentName: "", //当前需要显示的分类列表的父分类名称
    showStatus: 0, // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新
  };
  /*
  初始化Table所有列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name", // 显示数据对应的属性名
      },
      {
        title: "操作",
        width: 300,
        render: (category) => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(category)}>
                修改分类
              </LinkButton>
              {this.state.parentId === "0" ? (
                <LinkButton onClick={() => this.showSubCategorys(category)}>
                  查看子分类
                </LinkButton>
              ) : null}
            </span>
          );
        },
      },
    ];
  };
  //获取一级/二级分类列表
  getCategorys = async () => {
    this.setState({ loading: true });
    const { parentId } = this.state;
    const result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        this.setState({
          categorys,
        });
      } else {
        this.setState({
          subCategorys: categorys,
        });
      }
    } else {
      message.error("获取分类列表失败");
    }
  };
  showCategorys = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };
  showSubCategorys = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        this.getCategorys();
      }
    );
  };
  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
  //响应点击取消，隐藏确定框
  handleCancel = () => {
    this.form.current.resetFields();
    this.setState({
      showStatus: 0,
    });
  };
  //   显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1,
    });
  };
  addCategory = () => {
    this.form.current.validateFields().then(async values => {
      this.setState({
        showStatus: 0
      })
      const { parentId, categoryName } = this.form.current.getFieldsValue();
      const result = await reqAddCategory(categoryName, parentId)
      this.form.current.resetFields();
      if (result.status === 0) {

        // 添加的分类就是当前分类列表下的分类
        if (parentId === this.state.parentId) {
          // 重新获取当前分类列表显示
          this.getCategorys()
        } else if (parentId === '0') { // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
          this.getCategorys('0')
        }
      }
    })

  }

  //   显示更新的确认框
  showUpdate = (category) => {

    // 保存分类对象
    this.category = category;
    this.setState({
      showStatus: 2,
    });
  };
  updateCategory = async () => {
    this.form.current.validateFields().then(async values => {
      this.setState({
        showStatus: 0
      })
      const categoryId = this.category._id;
      const categoryName = this.form.current.getFieldsValue().categoryName;
      const result = await reqUpdateCategory({ categoryId, categoryName })
      if (result.status === 0) {
        this.getCategorys()
      }
    })

  }
  render() {
    const {
      categorys,
      loading,
      parentId,
      subCategorys,
      parentName,
      showStatus,
    } = this.state;
    const category = this.category || {};

    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{ marginRight: "5px" }} />
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={parentId === "0" ? categorys : subCategorys}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm categorys={categorys} parentId={parentId}
            setForm={(form) => { this.form = form }}
          />
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => { this.form = form }}
          />
        </Modal>
      </Card>
    );
  }
}
