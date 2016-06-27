		var place = location.href.replace(/(.*\/).*?$/g,'$1');
		var result = false;
		var key = document.cookie.replace(/.*key=(.*?)(([;]{0,1}.*?)|(.{0}))/g,'$1');
		var mass = [];
		var balls = [];
		var balls_m = [];
		var balls_f = [];
		var target = -1;
		var new_name = '';
		var target_pre = target;
		var str_num = 0;
			test_reg(['','',0],0);
			test_reg(['','',0],1);
			balls = balls_m;
			
	function getXmlHttp(){
			  var xmlhttp;
			  try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			  } catch (e) {
				try {
				  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (E) {
				  xmlhttp = false;
				}
			  }
			  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
				xmlhttp = new XMLHttpRequest();
			  }
			  return xmlhttp;
	}
	function test_reg(meme,str_) {
		// (1) создать объект для запроса к серверу
			var req = getXmlHttp(); 
			var get_send = '';
			req.onreadystatechange = function() {
				// onreadystatechange активируется при получении ответа сервера

				if (req.readyState == 4) { 
					// если запрос закончил выполняться

					if(req.status == 200) {
						 // если статус 200 (ОК) - выдать ответ пользователю
						get_send = req.responseText;
						console.log(get_send);
							if(key == '') {
								mass = get_send.split(';');
								document.cookie = "key="+mass[0]+"; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";
								if(!str_) balls_m.push({'url':mass[1],'name':mass[2]});
							} else {
								mass = get_send.split('~');
								for(var i = 0; i<mass.length-1;i++){
									var ball = mass[i].split(';');
									if(str_) balls_f.push({'url':ball[0],'name':ball[1]}); else balls_m.push({'url':ball[0],'name':ball[1]});
								}
							}
							if(!str_) draw_balls(balls_m,0);
							if(str_){document.getElementById('loading').style.display = 'none';}
					}
					// тут можно добавить else с обработкой ошибок запроса
				}
			}
		   // (3) задать адрес подключения
		//req.open('GET', 'http://192.168.1.34/balls.php?balls='+encodeURIComponent(to_send)+'&map=1&dt='+dt, false);  
		req.open('POST', place+'reg.php?rand='+Math.random(), true);  
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		// объект запроса подготовлен: указан адрес и создана функция onreadystatechange
		// для обработки ответа сервера
		 
			// (4)
		req.send('user='+meme[0]+'&pass='+meme[1]+'&tip='+meme[2]+'&key='+key+'&tabl='+str_);  // отослать запрос
		//console.log('balls='+to_send+'&map=1&dt='+dt);
			// (5)
	}
	function draw_balls(bo,ti) {
		var list = document.getElementById('pr_body')
			for(var i=0;i<bo.length;i++){
			if(ti==1) i = bo.length-1;
				var li = document.createElement('div');
				li.className = 'project_d0';
				var li1 = document.createElement('div');
				li1.className = 'project_d1';
				li1.id = 'm_'+i;
				li.appendChild(li1);
				var li2 = document.createElement('img');
				li2.className = 'project_d2';
				//li2.type="image";
				li2.src="images/go.png";
				li2.id = 'b_'+i;
				li.appendChild(li2);
				list.appendChild(li);
				li1.innerHTML = bo[i].name;

			}
		}
	function go_url(f){
		if(f.split('_')[0] == 'm'){
			if(f.split('_')[1]!= target){
				if(target>=0) {
					//document.getElementById('m_'+target).style.background = 'white';
					document.getElementById('b_'+target).style.display = 'none';
				}
				target = f.split('_')[1]*1;
				if(target>=0) {
					//document.getElementById('m_'+target).style.background = 'gray';
					document.getElementById('b_'+target).style.display = 'block';
				}
			}
		}else if(f.split('_')[0] == 'b'){
			document.getElementById('loading').style.display = 'block';
			location.href = 'index.html?map='+balls[target].url;
		}else if(f.split('_')[0] == 'k'){
			if((f=='k_0')&&(str_num == 1)) next_div();
			if((f=='k_1')&&(str_num == 0)) next_div();
		}
	}
	function update_info(mimi,momo,tip) {
		// (1) создать объект для запроса к серверу
			var req = getXmlHttp(); 

			var get_send = '';
			req.onreadystatechange = function() {
				// onreadystatechange активируется при получении ответа сервера

				if (req.readyState == 4) { 
					// если запрос закончил выполняться

					if(req.status == 200) {
						get_send = req.responseText;
						console.log(get_send);
						if(get_send == 'del') {
							balls.splice(target,1);
							//go_url('m_'+(target-1));
							clear_body();
							draw_balls(balls,0);
							target_pre = target;
							target = -1;
							go_url('m_'+(target_pre-1));
						}else if(get_send == 'rename') {
							document.getElementById('m_'+target).innerHTML = balls[target].name;
						}else if(get_send.substr(-1) == '~') {
							var ball = get_send.slice(0,-1).split(';');
								balls.push({'url':ball[0],'name':ball[1]});
								draw_balls(balls,1);
								go_url('m_'+(balls.length-1));
						}else if(get_send.substr(0,6) == 'error:') {
							alert(get_send.split(':')[1]);
						}
					}
					
					// тут можно добавить else с обработкой ошибок запроса
				}
			}
		   // (3) задать адрес подключения
		//req.open('GET', 'http://192.168.1.34/balls.php?balls='+encodeURIComponent(to_send)+'&map=1&dt='+dt, false);  
		req.open('POST', place+'update_info.php?rand='+Math.random(), true);  
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		// объект запроса подготовлен: указан адрес и создана функция onreadystatechange
		// для обработки ответа сервера
		 
			// (4)
		req.send('name='+mimi+'&tip='+tip+'&key='+key+'&map='+momo+'&tabl='+str_num);  // отослать запрос
	}
	function new_pro(){
		if(str_num==0){
			new_name = prompt("Введите название проекта","",null);
			if(new_name!=null) update_info(new_name,"",1);
		}else{
			new_name = prompt("Введите ссылку на проект","",null);
			if(new_name!=null) update_info('',new_name.replace(/.*=/g,''),4);
		}
		
	}
	function del_pro() {
		if(target>=0) {
			if(confirm('Удалить проект '+balls[target].name+'?')){
				if(target>=0) update_info("",balls[target].url,2);
				else alert("Проект не выбран");
			}
		}else alert("Проект не выбран");
	}
	function rename_pro() {
		if(target>=0) {
			new_name = prompt("Введите новое название",balls[target].name,null);
			if(new_name!=null) {
				balls[target].name = new_name;
				update_info(balls[target].name,balls[target].url,3);
			}
		}else alert("Проект не выбран");
	}
	function url_pro() {
		if(target>=0) prompt("Ссылка на проект",place+"index.html?map="+balls[target].url);
		else alert("Проект не выбран");
	}
	function clear_body(){
		var list = document.getElementById('pr_body');
		if(list.innerHTML !=''){
		for(var i=list.children.length-1; i>=0 ;i--)
			list.removeChild(list.children[i]);
		}
	}
	function next_div(){
		str_num++;
		str_num %=2;
		target = -1;
		if(str_num) balls = balls_f; else balls = balls_m;
		clear_body();
		draw_balls(balls);
		document.getElementById('pr_head').children[(str_num+1)%2].children[0].style['background'] ='#808080';
		document.getElementById('pr_head').children[str_num].children[0].style['background'] ='#2fabab';

	}
  document.addEventListener('touchmove', function(event) {event.preventDefault();},false);
	money_flag= true;
	width = window.innerWidth;
	document.body.style.height = window.innerHeight+'px';
	if(money_flag) money_ = 50;
	var sensor = false;
	document.getElementById('pr_body').style.height = window.innerHeight-120-money_+'px';
	if('ontouchstart' in document.documentElement) sensor = true;
	if((width<400)||(sensor)) {
		document.body.style.width = width+'px';
		document.body.style.left = '0px';
		document.body.style.margin = '0px';			
	}
	if(!sensor){
		document.getElementById('pr_body').onclick = function(event) {t=event.target||event.srcElement; go_url(t.id);};
		document.getElementById('pr_head').onclick = function(event) {t=event.target||event.srcElement; go_url(t.id);};
		
	}else{
		document.getElementById('pr_body').addEventListener('touchstart',function(event) {t=event.target||event.srcElement; go_url(t.id);},false);
		document.getElementById('pr_head').addEventListener('touchstart',function(event) {t=event.target||event.srcElement; go_url(t.id);},false);
	}
	window.addEventListener("orientationchange", function() {
		// Меняем ориентацию
		setTimeout(function(){
			document.body.style.width = window.innerWidth+'px';
			document.getElementById('pr_body').style.height = window.innerHeight-120-money_+'px';
		},500);
	}, false);