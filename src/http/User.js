// 导入配置文件，获取数据传输的地址
import {baseUrl} from '@/config/url'
// 保存
export function saveOrUpdateUser(user,{success,error}){
	var obj ={
		id:user.id,
		name:user.name,
		gender:user.gender,
		birth:user.birth,
		hiredate:user.hiredate,
		type:user.type
	}
	$.post(baseUrl+'/user/saveOrUpdate',obj,({stauts,message})=>{
		if(stauts == 200){
			$('.close').trigger('click');
			success('添加成功');
		} else{
			error('添加异常');
		}
	})
}
// 批量删除
export function batchDeleteUser(ids,{success,error}){
	$.post(baseUrl+'/user/batchDelete',{ids:ids},({status,message})=>{
		if(status == 200){
			success('删除成功');
		} else{
			error('删除异常');
		}
	})
}
// 删除
export function deleteUserById(id,{success,error}){
	$.get(baseUrl+'/user/deleteById',{id:id},({stauts,message})=>{
		if(stauts == 200){
			success('删除成功');
		} else{
			error('删除异常');
		}
	})
}
// 加载数据
export function loadUsers(successHandler){
	$.get(baseUrl+'/user/findAll',({stauts,data})=>{
		if(stauts == 200){
			successHandler(data);
		}else{
			alert('加载失败');
		}
	})
}
// 添加