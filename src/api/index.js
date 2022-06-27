/*
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import axios from 'axios'
//登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
// const baseUrl='http://127.0.0.1:5000';

export const reqLogin=(username,password)=>ajax('/login',{username,password},'POST')
//添加用户
export const reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')
//获取一级/二级分类的列表
export const reqCategorys=(parentId)=>ajax('/manage/category/list',{parentId})
//添加分类
export const reqAddCategory=(categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},'POST')
//更新分类
export const reqUpdateCategory=({categoryId,categoryName})=>ajax('/manage/category/update',{categoryId,categoryName},'POST')
//json请求的接口函数
// export const reqWeather=(city)=>{
//    const url=`https://api.map.baidu.com/weather/v1/?district_id=222405&data_type=all&ak=nLXOSwH01Py9umDg9KPzj4X5l3FvGD9R`
//    jsonp(url,{},(err,data)=>{
//     console.log(err,data)
//    })
// }
export const reqWeather=()=>axios('http://localhost:3001?district_id=222405&data_type=all&ak=nLXOSwH01Py9umDg9KPzj4X5l3FvGD9R')
