import { Component } from "react";
import {Button, Card, Input, Select, Table} from 'antd'
import  { PlusOutlined } from '@ant-design/icons';
export default class ProductHome extends Component{
    state={
        products:[]
    }
   initColumns=()=>{
    this.columns=[
        {
            title:'商品名称',
            dataIndex:'name',
        },
        {
            title:'商品描述',
            dataIndex:'desc',
        },
        {
            title:'价格',
            dataIndex:'price',
            render:price=>'￥'+price//当前指定了对应的属性，传入的是对应的属性
        },
        {
            title:'状态',
            dataIndex:'status',
            render:status=>{
                return (
                    <span>
                        <Button type="primary">下架</Button>
                        <span>在售</span>
                    </span>
                )
            }
        }
    ]
   }
    componentWillMount(){
        this.initColumns()
    }
    render(){
        const {products}=this.state
        const {Option}=Select;
        const title=(
            <span>
                <Select value='1' style={{width:150}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{width:150,margin:'0 15px'}}/>
                <Button type="primary">搜索</Button>
            </span>
        )
        const extra=(
            <Button type="primary">
                <PlusOutlined />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                rowKey={'_id'}
                dataSource={products}
                columns={this.columns}
                >

                </Table>
            </Card>
        )
    }
       
    
}