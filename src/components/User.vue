<template>
  <div class="user container">
    <h2>用户管理</h2>

    <div class="btns">
    	<button class="btn btn-sm btn-primary" @click='toAdderUser'>新增</button>
    	<button class="btn btn-sm btn-primary" @click='_batchDeleteUser'>批量删除</button>
    	{{ids}}
    </div>
    <table class="table table-bordered table-hover text-center">
	    <thead>
	        <tr>
	          	<th class="text-center">编号</th>
	          	<th class="text-center">姓名</th>
	          	<th class="text-center">性别</th>
	          	<th class="text-center">出生日期</th>
	          	<th class="text-center">入职时间</th>
	          	<th class="text-center">身份</th>
	          	<th class="text-center">操作</th>
	        </tr>
      	</thead>
		<tbody>
			<tr v-for='user in users'>
				<td>
			      <input type="checkbox" :value='user.id' v-model='ids'>
			    </td>
			    <td>{{user.name}}</td>
			    <td>{{user.gender}}</td>
			    <td>{{user.birth}}</td>
			    <td>{{user.hiredate}}</td>
			    <td>{{user.type}}</td>
			    <td>
			  		<button class="btn btn-sm btn-primary" @click="updateUser(user)">修改</button>
			    	<button class="btn btn-sm btn-danger" @click="_deleteUserById(user.id)">删除</button>&nbsp
			    </td>
			</tr>
		</tbody>
    </table>
    <!-- 模态框 -->
    <div id="userModal" class="modal fade" tabindex="-1" role="dialog">
    	<div class="modal-dialog" role="document">
    		<div class="modal-content">
    			<div class="modal-header text-center">
    				<button type="button" class="close" data-dismiss="modal" aria-label='close'><span aria-hidden="true">&times;</span></button>
    				<h4 class="modal-title">{{title}}</h4>
    			</div>
    			<div class="modal-body">
    				<!-- {{this.user}} -->
    				<form>
    					<div class="form-group">
    						<label for="name">姓名</label>
    						<input type="text" id="name" class="form-control" placeholder="UserName" v-model="user.name">
    					</div>
    					<div class="form-group">
    						<label for="gender">性别</label><br/>
    							<input type="radio" value='男' v-model='user.gender'>男
								<input type="radio" value='女' v-model='user.gender'>女
    					</div>
    					<div class="form-group">
    						<label for="birth">出生年月</label>
    						<input type="date" id="birth" class="form-control" placeholder="Your Birthday" v-model="user.birth">
    					</div>
    					<div class="form-group">
    						<label for="hiredate">入职时间</label>
    						<input type="date" id="hiredate" class="form-control" placeholder="Your Birthday" v-model="user.hiredate">
    					</div>
    					<div class="form-group">
    						<label for="type">身份</label>
    						<input type="text" id="type" class="form-control" placeholder="Your Job" v-model="user.type">
    					</div>
    					<button class="btn btn-sm" type="reset">重置</button>
    					<span>{{tip_message}}</span>
    				</form>
    			</div>
    			<div class="modal-footer">
    				<!-- <button type="reset" value="reset" class="btn btn-sm btn-default">重置</button> -->
		        	<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
    				<button type="button" class="btn btn-sm btn-primary" @click="_saveOrUpdateUser(user)">保存</button>
    			</div>
    		</div>
    	</div>
    </div>
  </div>
</template>
<script>
	// import {baseUrl} from '@/config/url'
	// 导入文件User.js里面的deleteUserById和loadUsers方法
	import {
		deleteUserById,
		loadUsers,
		saveOrUpdateUser,
		batchDeleteUser
	} from '@/http/User'
	export default {
		data(){
			return {
				ids:[],
				title:'',
				tip_message:'',
				users:[],
				user:{}
			}
		},
		methods:{
			// 通过id删除用户
			_deleteUserById(id){
				deleteUserById(id,{
					success:(msg)=>{
						// 打印信息
						alert(msg);
						// 刷新数据
						loadUsers((data)=>{
							this.users = data;
							console.log("刷新");
						});
					},
					error:function(msg){
						alert(msg);
					}
				});
			},
			// 批量删除
			_batchDeleteUser(ids){
				batchDeleteUser(ids,{
					success:(msg)=>{
						// 打印信息
						alert(msg);
						// 刷新数据
						loadUsers((data)=>{
							this.users = data;
							console.log("已更新...");
						});
					},
					error:function(msg){
						alert(msg);
					}
				});
			},
			// 添加
			toAdderUser(){
				this.title = '添加用户';
				this.user = {};
				$("#userModal").modal("show");
			},
			// 保存
			_saveOrUpdateUser(user){
				// this.user = {};
				//  如果校验通过就是 true  如果校验不通过 false
				let flag = true;
				if(!this.user.name){
					alert("用户名不能为空");
					flag = false;
					return;
				}
				if(!this.user.gender){
					alert("请选择你的性别");
					flag = false;
					return;
				}
				if(!this.user.birth){
					alert("请选择你的生日");
					flag = false;
					return;
				}
				if(!this.user.hiredate){
					alert("请选择你的入职时间");
					flag = false;
					return;
				}
				if(!this.user.type){
					alert("请选择你的职业");
					flag = false;
					return;
				}
				saveOrUpdateUser(user,{
						success:(msg)=>{
						// 打印信息
						alert(msg);
						// 刷新数据
						loadUsers((data)=>{
							this.users = data;
							console.log("已更新...");
						});
					},
					error:function(msg){
						alert(msg);
					}
				});
			},
			/*_saveOrUpdateUser(user){
				var obj ={
					id:user.id,
					name:this.user.name,
				}
				$.post(baseUrl+'/user/saveOrUpdate',obj,({stauts,data})=>{
					if(stauts == 200){
						alert('添加成功');
						$('.close').trigger('click');
					} else{
						alert('添加异常');
					}
				})
			},*/
			// 修改
			updateUser(user){
				this.user = user;
				this.title = "修改用户"
				$('#userModal').modal('show');
			}
		},
		// 在生命周期beforeMount加载数据
		beforeMount(){
			loadUsers((data)=>{
				this.users = data;
			});
		}
	}
</script>
<style>
 	html {
 		margin: 0 auto;
	} 
	.btns {
		margin: 1em 0;

	}
	.btn {

	}
	.table {
		width: 90%;
		border-collapse: collapse;
	}
	.table td, .table th {
		border:1px solid #ededed;
		line-height: 1.6em;
	}

</style>