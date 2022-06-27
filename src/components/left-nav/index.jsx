import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import {Menu} from 'antd'
import {
  FullscreenOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
/* 
左侧导航的组件
 */
const { SubMenu } = Menu;
 class LeftNav extends Component {
  // getMenuNodes = (menuList) => {
  //   return menuList.map(item => {
      
  //     if(!item.children) {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //           <PieChartOutlined />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       )
  //     } else {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //             <FullscreenOutlined />
  //             <span>{item.title}</span>
  //           </span>
  //           }
  //         >
  //           {this.getMenuNodes(item.children)}
  //         </SubMenu>
  //       )
  //     }

  //   })
  // }
  getMenuNodes = (menuList) => {
    return menuList.reduce((prev,item)=>{
      if(!item.children) {
        prev.push(
          (
                    <Menu.Item key={item.key}>
                      <Link to={item.key}>
                      <PieChartOutlined />
                        <span>{item.title}</span>
                      </Link>
                    </Menu.Item>
                  )
        )
      }else{
        prev.push(
          (
                    <SubMenu
                      key={item.key}
                      title={
                        <span>
                        <FullscreenOutlined />
                        <span>{item.title}</span>
                      </span>
                      }
                    >
                      {this.getMenuNodes(item.children)}
                    </SubMenu>
                  )
        )
      }
      return prev
    },[])
  }
  render() {
    const path=this.props.location.pathname
    return (
      <div className="left-nav">
        <div>

        </div>
        <Link to='/' className="left-nav-header">

          <img src={logo} alt="" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          onClick={this.handleClick}
          style={{ width: 200 }}
          selectedKeys={[path]}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {this.getMenuNodes(menuList)}
          [
            (
                    <Menu.Item key={1}>
                      <Link to={1}>
                      <PieChartOutlined />
                        <span>{1}</span>
                      </Link>
                    </Menu.Item>
                  )
          ]
        </Menu>

      </div>

    )
  }
}
export default withRouter(LeftNav)