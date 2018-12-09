require(['./js/config.js'],function(){
	require(['mui'],function(mui){
		var pagenum=0,
			pagesize=2,
			total;
		mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
		function pullupRefresh(){
			setTimeout(function(){
				pagenum++;
				getlist();
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((total==pagenum));
			},1000)
		}
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 
		});
		function getlist(){
			mui.ajax('/users',{
				dataType:'json',
                data: {
                    pagenum: pagenum,
                    pagesize: pagesize
                },
				success:function(res){
					if(res.code===1){
						console.log(res)
						renderlist(res.data);
					}
				}
			})
		}
		var baseurl='http://localhost:3000/images/';
		function renderlist(data){
			var html='';
			data.forEach(function(ele){
				html+=`<li class="mui-table-view-cell">
							<img src="${baseurl}${ele.url}" alt="">
						</li>`;
			});
			document.querySelector('.list').innerHTML+=html;
		}
	})
})