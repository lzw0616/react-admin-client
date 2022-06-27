import React,{Component} from 'react'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
import menuList from '../../config/menuConfig'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api'
import LinkButton from '../link-button'
class Header extends Component{
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',//天气图片URL
        weather:'',//天气的文本
        
    }
    getTime=()=>{
        setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    logout=()=>{
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content:'确定退出吗?',
            onOk:()=>{
                storageUtils.removeUser()
                memoryUtils.user = {}
                // 跳转到login
                this.props.history.replace('/login')
            }
          });
       
    }
    getWeather=async ()=>{
        const {dayPictureUrl,weather}=await reqWeather();
        this.setState({dayPictureUrl,weather})
    }
    getTitle=()=>{
        const path=this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if(item.key===path){
                title=item.title
            }else if(item.children){
              const cItem=item.children.find(cItem=>cItem.key===path)
              if(cItem){
                  title=cItem.title
              }

            }
        });
        return title
    }
    componentDidMount(){
        this.getTime();
    }
    render(){
        const username=memoryUtils.user.username
        const title=this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={this.state.dayPictureUrl} alt="weather"/>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)