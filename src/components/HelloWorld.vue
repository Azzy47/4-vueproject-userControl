<template>
	  <div class="condition">
	  	<div :class="dyClass" v-show='false'>
	  		{{age}}
		  	<div v-if='age<18'> 未成年</div>
		  	<div v-else-if='age>=18 && age<=30'>青年人</div>
		  	<div v-else>老年人</div>
	  	</div>
	  	<table class="table">
	  		<thead>
	  			<tr>
	  				<th>编号</th>
	  				<th>姓名</th>
	  				<th>年龄</th>
	  				<th>操作</th>
	  			</tr>
	  		</thead>
	  		<tbody>
	  			<tr v-for='user in users'>
	  				<td><input type="checkbox" :value='user.id' v-model='ids'></td>
	  				<td>{{user.name}}</td>
	  				<td>{{user.age}}</td>
	  				<td>
	  					<a href="javascript:void(0);" @click='deleteUser(user)'>删除</a>
	  					<a href="javascript:void(0);" @click='updateUser(user)'>修改</a>
	  				</td>
	  			</tr>
	  		</tbody>
	  	</table>
	  	<button class="btn btn-primary" @click='batchDeleteUser'>批量删除</button>
	  		{{ids}}
	  </div>
</template>
<script>
	export default {
		data(){ 
			return {
				age:0,
				ids:[],
				users:[{
					id:1,
					name:"A",
					age:12
				},{
					id:2,
					name:"B",
					age:12
				},{
					id:3,
					name:"C",
					age:12
				},{
					id:4,
					name:"D",
					age:12
				}]
			}
		},
		computed:{
			dyClass(){
				let result = '';
				if(this.age<18){
					result = 'young';
				}else if(this.age >= 18 && this.age < 30){
					result = 'strong';
				}else{
					result = 'old';
				}
				return result;
			}
		},
		methods:{
			deleteUser(user){
				alert(user.id);
			},
			updateUser(user){
				alert(JSON.stringify(user));
			},
			batchDeleteUser(ids){
				alert(this.ids);
			}
		},
		mounted() {
			let a =setInterval(()=>{
				this.age++;
				if(this.age>=100){
					clearInterval(a);
				}
			},100);
		}
	}
</script>
<style>
	.yooung{
		font-size: 10px;
	}
	.strong{
		font-size: 18px;
	}
	.old{
		font-size: 26px;
	}
</style>