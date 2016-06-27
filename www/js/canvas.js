	var width = 100;
	var height = 100;
	var fps = 20;
	var zoom = 1;
	var target_ball = 0;
	var f_tr = 0.01;
	var t = false;
	var ball_arr = [];
	var balls = [];
	var lines = [];
	var target = 0;
	var target2 = -1;
	var t_dx=0;
	var t_dy=0;
	var to_send = '';
	var text = '';
	var time = [];
	var time_m = [];
	var del_rect = [];
	var del_line = [];
	var time_now = (new Date()).getTime();
	var send_mass = [];
	var upd_ball = [];
	time_m.o = 0;
	time_m.n = 10000;
	var l_0 = 0;
	var l_1 = 0;
	time.o = 0;
	time.n = 10000;
	var x_touch = 0;
	var y_touch = 0;
	var target_pre = 0;
	var sensor = false;
	var com_w = 20;
	var imgs = [];
	var temp = 0;
	var last_upd = 0;
	var dt = 0;
	var ima = 0;
	var num_click = 0;
	var last_upd_pre = -1;
	var map_ = location.href.replace(/.*map[=](.*?)((&.*)|.{0}$)/g,'$1');
	var server_adr = location.href.replace(/index[.].*/g,'');
	var vote_ = true;
	if('ontouchstart' in document.documentElement) sensor = true;
	var ball_color = ['#ff9934','#989933','#996533','#2fabab','#990100'];
	//var login = prompt('Введите логин', 'test');
	function get_ball(){
	return {'color':'#ff9934', 'x':0, 'y':0,'w':70, 'h':40, 'type':0,'time': (new Date()).getTime(),'per_id':null, 'com':null, 'vis':1,'vis_chld':0, //1-видно,0-скрыт,2-удален,3-коммент,4 - коммент скрыт, vis_chld 1- скрыт, 0 показалть
			'l_color':'#ff9934','l_w':4,
			't_color':'white','text':'','t_size':18,
			'img':'','mod_num':0,'vis_per_id':null}; //type - квадрат, круг,квадрат со скруглениями
	}
	function get_img(url_img) {
	if(url_img !=''){ 
		imgs = new Image();
		imgs.src = 'file/' + url_img;
	}else imgs = '';
		return imgs;//if()
		
	}
		/*	s = new ball();
			s.color = 'blue';
			ball_arr.push(s);
			new_ball();*/
	function w_h(){
			//alert(window.innerWidth + ' '+window.innerHeight);
			canvas = document.getElementById("myCanvas");
			canvas.width = window.innerWidth;
			width = canvas.width;
			canvas.height = window.innerHeight-50;
			height = canvas.height;
			if((width<400)||(sensor)) {
				document.getElementById('comment_0').style.width = width+'px';
				document.getElementById('comment_0').style['margin-left'] = -width/2+'px';
				document.getElementById('editor').style['width'] = width-94+'px';
				
			}

			draw();
	}
	function canvasSpaceGame() {
			canvas = document.getElementById("myCanvas");
			w_h();
			if(!sensor) document.getElementById('comment_0').style.bottom = '50%';
			// Get the canvas element.
			setTimeout(function(){if((width!=window.innerWidth)||(height!=window.innerHeight))w_h();},1000);
			window.addEventListener("orientationchange", function() {
				// Меняем ориентацию
				document.getElementById('loading').style.display = 'block';
				setTimeout(function(){if((width!=window.innerWidth)||(height!=window.innerHeight))w_h();document.getElementById('loading').style.display = 'none';},1000);
			}, false);
			// Make sure you got it.
			if (canvas.getContext)

			// If you have it, create a canvas user inteface element.
			{
			  // Specify 2d canvas type.
			  ctx = canvas.getContext("2d");
			  ctx.fillStyle = "rgba(255, 255, 255, 1)";
			  //ctx.drawImage(fon, 0, 0, 1, 1, 0,0, width, height);

	 canvas.addEventListener('mousedown', function(event) {
		 	if(!sensor){
			t = true;
			x2 = event.pageX;
			y2 = event.pageY;
			x_touch = x2;
			y_touch = y2;
			t_dx=x2;
			t_dy=y2;
			time.o = time.n;
			time.n = new Date().getTime();
			get_target();
		}
	},false); 
	 canvas.addEventListener('touchstart', function(event) {
		if(event.targetTouches.length == 1) {
			t = true;
			x2 = event.targetTouches[0].pageX;
			y2 = event.targetTouches[0].pageY;
			t_dx=x2;
			t_dy=y2;
			x_touch = x2;
			y_touch = y2;
			time.o = time.n;
			time.n = new Date().getTime();
			get_target();
		}else {
			x_0 = event.targetTouches[0].pageX;
			y_0 = event.targetTouches[0].pageY;
			x_1 = event.targetTouches[1].pageX;
			y_1 = event.targetTouches[1].pageY;
			l_0 = Math.sqrt((x_1-x_0)*(x_1-x_0) + (y_1-y_0)*(y_1-y_0));//расстояние между точками
			t = false;
		}
	},false); 
	canvas.addEventListener('mouseup', function(event) {if(!sensor){click_ball(event.pageX,event.pageY); }},false);
	canvas.addEventListener('touchend', function(event) {click_ball(x2,y2);event.preventDefault();},false);
	
	canvas.addEventListener('mousemove', function(event) {if(t&&(!sensor)) move_target(event.pageX,event.pageY);},false);
	canvas.addEventListener('touchmove', 
			function(event) {
				x2 = event.targetTouches[0].pageX;
				y2 = event.targetTouches[0].pageY;
				if(event.targetTouches.length == 2){
					zoom_map(x2,y2,event.targetTouches[1].pageX,event.targetTouches[1].pageY);
				}
				if(t){
					move_target(x2,y2);
				}
				event.preventDefault();
			},false);
	document.addEventListener('touchmove', function(event) {event.preventDefault();},false);
	//document.getElementById('money').addEventListener('touchmove', function(event) {event.preventDefault();},false);
	start_ball();
	//get_comment();
	//balls[0].img =get_img('ka.png');
	balls[0].time = 0;
	//ball_upd();
	update_info();
	setInterval(function(){if(vote_)update_info();},2000);
	draw();
	document.getElementById('loading').style.display = 'none';
	/*
		ctx.save();
		ctx.translate(c1.x, c1.y);
		ctx.rotate(Math.PI);
		ctx.restore();			
	*/
			  //canvas.requestFullScreen();
	 /* canvas.addEventListener('mousedown', function(event) {get_target(event);},false);
	  canvas.addEventListener('mouseup', function(event) {knopka = false;document.getElementById('ball_move').style.color = 'grey'; get_target(event);},false);
	  canvas.addEventListener('touchstart', function(event) {get_target(event.targetTouches[0]);},false);
	  canvas.addEventListener('touchend', function(event) {knopka = false;document.getElementById('ball_move').style.color = 'grey';get_target(event.targetTouches[0]); },false);
	  canvas.addEventListener('mousemove', function(event) {move_target(event);},false);
	  canvas.addEventListener('touchmove', function(event) {move_target(event.targetTouches[0]); event.preventDefault();},false);*/
			}
	}
	
	function draw() {
	if(balls.length>0){
	//зачистка
	for(var i in del_rect){
		var eu = del_rect[i];
		ctx.clearRect(eu[0],eu[1], eu[2], eu[3]);
	}
	del_rect = [];
	for(var i in del_line){
		var eu = del_line[i];
		ctx.strokeStyle = 'white';
		ctx.lineWidth = eu[4];
		ctx.beginPath();
		ctx.moveTo(eu[0],eu[1]);
		ctx.lineTo(eu[2], eu[3]);
		ctx.stroke();
	}
	del_line = [];
	
	
	//линии, затем фигуры, затем текст
		//ctx.drawImage(fon, 0, 0, 1, 1, 0,0, width, height);
		ctx.save();
		for(var i in balls){
			if(balls[i].vis == 1) {
				ctx.beginPath();
				var li = balls[i];
				var li0 = balls[li.per_id];
				if(temp) ctx.strokeStyle = get_color(li.time);
				else ctx.strokeStyle = li.l_color;
				ctx.lineWidth = li.l_w*zoom;
				ctx.moveTo(li0.x, li0.y);
				/*
				var dx = (li.x-li0.x)/2;
				ctx.bezierCurveTo(li0.x+dx, li0.y, li.x-dx, li.y, li.x, li.y);
				*/
				var x_ = li.x;
				var y_ = li.y;
				if(x_-li0.x > (50+li.w/2)*zoom) x_ -= li.w/2*zoom;
				else if(x_-li0.x < -(50+li.w/2)*zoom) x_ += li.w/2*zoom;
				else if(y_-li0.y >= 0) y_ -= li.h/2*zoom;
				else y_ += li.h/2*zoom;
				var dx = (x_-li0.x);
				var dy = (y_-li0.y);
				var l_l = Math.sqrt(dx*dx+dy*dy)/(2*ctx.lineWidth);
				dx = dx/l_l;
				dy = dy/l_l;
				ctx.beginPath();
				for(var j = 0; j < l_l;j++)
				{	
					ctx.moveTo(li0.x + dx*j-dx/2, li0.y + dy*j-dy/2);
					ctx.lineTo(li0.x + dx*j, li0.y + dy*j);			
				}
				ctx.stroke();
				//ctx.stroke();
				del_line.push([li0.x,li0.y,x_,y_,ctx.lineWidth+2]);
			}
		}
		ctx.restore();
	//формы
		for(var i in balls){
			if((balls[i].vis == 1)&&(in_map(balls[i]))) {
				ctx.save();
				var li = balls[i];
				var dR = 10*zoom;//скругление форм
				var s_w = li.w/2*zoom;
				var s_h = li.h/2*zoom;	
				if(temp) ctx.fillStyle = get_color(li.time);				
				else ctx.fillStyle = li.color;
				  ctx.strokeStyle = '#32329C';
				  ctx.lineWidth = 3;
				  //выделенный объект
				  if(i == target) ctx.strokeStyle = 'black';
				  
				ctx.beginPath();
				ctx.translate(li.x, li.y);
				ctx.moveTo(-s_w, -s_h+dR);
				ctx.arc(-s_w+dR, -s_h+dR, dR, Math.PI, 1.5*Math.PI);
				ctx.arc(s_w-dR, -s_h+dR, dR, 1.5*Math.PI, 2*Math.PI);
				ctx.arc(s_w-dR, s_h-dR, dR, 0, 0.5*Math.PI);
				ctx.arc(-s_w+dR, s_h-dR, dR, 0.5*Math.PI, Math.PI);
				ctx.lineTo(-s_w, -s_h+dR);	
				ctx.fill();
				if(i==target) {
					ctx.stroke();
				}
				ctx.restore();	
								//удаление
				del_rect.push([li.x-s_w-4,li.y-s_h-4,2*s_w+8,2*s_h+8]);
				//console.log(li.x,li.y,li.h,li.w);
				//коммент иконка
				if((li.com !=null)||(li.com == target)) {
					if((balls[li.com].text!='')||(balls[li.com].img!='')){
						ctx.save();
						s_w = com_w/2*zoom;
						s_h = s_w;
						dR = s_h*0.5;//скругление форм
						ctx.fillStyle = li.color;
						ctx.translate(li.x+li.w/2*zoom+1.5*s_h+s_w*0.10, li.y+li.h/2*zoom-1*s_h-s_h*0.15);
						ctx.beginPath();

								s_h = 0.4*s_w;
								s_w = 0.5*s_w;
								dR = s_h*0.4;
								//ctx.moveTo(-s_w/2, -s_h/2+10*zoom);
								ctx.arc(-s_w+dR, -s_h+dR, dR, Math.PI, 1.5*Math.PI);
								ctx.arc(s_w-dR, -s_h+dR, dR, 1.5*Math.PI, 2*Math.PI);
								ctx.arc(s_w-dR, s_h-dR, dR, 0, 0.5*Math.PI);
								ctx.arc(-s_w+dR, s_h-dR, dR, 0.5*Math.PI, Math.PI);
								ctx.moveTo(0.5*s_w, 0.7*s_w);
								ctx.quadraticCurveTo(0, 1.2*s_w,-0.9*s_w, 1.3*s_w);
								//ctx.lineTo(-s_w, 1.3*s_w);
								ctx.lineTo(0, 0.3*s_w);
						ctx.fill();
						//ctx.stroke();
						ctx.restore();
						del_rect.push([li.x+li.w/2*zoom,li.y-li.h/2*zoom,3*com_w*zoom,li.h*zoom]);
					}
				}
				if(li.vis_chld) {
						ctx.save();
						s_w = com_w/2*zoom;
						s_h = s_w;
						dR = s_h*0.5;//скругление форм
						ctx.strokeStyle = li.color;
						ctx.lineWidth = 3*zoom;
						ctx.translate(li.x+li.w/2*zoom+1.5*s_h+s_w*0.15, li.y-li.h/2*zoom+0.5*s_h);
						ctx.beginPath();
						ctx.arc(0, 0, 0.65*s_w, 0, -Math.PI);
						ctx.stroke();
						ctx.restore();
						del_rect.push([li.x+li.w/2*zoom,li.y-li.h/2*zoom-2,4*s_w,4*s_w]);
				}
			}
		}
	//комменты
		for(var i in balls){
			if((balls[i].vis == 3)&&(in_map(balls[i]))&&(balls[i].per_id == target)&&((balls[i].text!='')||(balls[i].img!=''))) {
				ctx.save();
				var li = balls[i];
				var dR = 10*zoom;//скругление форм
				var s_w = li.w/2*zoom;
				var s_h = li.h/2*zoom;		
				  //ctx.fillStyle = li.color;
				  ctx.strokeStyle = balls[li.per_id].color;
				  ctx.lineWidth = 2*zoom;
				  //выделенный объект
				  
				  
				ctx.beginPath();
				ctx.translate(li.x+balls[li.per_id].x, li.y+balls[li.per_id].y);
				ctx.moveTo(-s_w, -s_h+dR);
				ctx.arc(-s_w+dR, -s_h+dR, dR, Math.PI, 1.5*Math.PI);
				ctx.arc(s_w-dR, -s_h+dR, dR, 1.5*Math.PI, 2*Math.PI);
				ctx.arc(s_w-dR, s_h-dR, dR, 0, 0.5*Math.PI);
				ctx.arc(-s_w+dR, s_h-dR, dR, 0.5*Math.PI, Math.PI);
				ctx.lineTo(-s_w, -s_h+2*dR);
				ctx.quadraticCurveTo(-s_w-dR, -s_h+dR, -s_w-dR, -s_h);
				ctx.lineTo(-s_w, -s_h+dR);
				ctx.stroke();
				//if(i==0) ctx.stroke();
				ctx.restore();	
				//console.log(li.x,li.y,li.h,li.w);
				
				//удаление
				del_rect.push([li.x+balls[li.per_id].x-s_w-dR-2*zoom-2,li.y+balls[li.per_id].y-s_h-2*zoom-2,2*s_w+dR+4*zoom+4,2*s_h+4*zoom+4]);
			}
		}
	//текст
		for(var i in balls){
			if(((balls[i].vis == 1)||((balls[i].vis == 3)&&(balls[i].per_id == target)))&&(in_map(balls[i]))) {
				ctx.save();
				var li = balls[i];
				var s_w = li.w/2*zoom;
				var s_h = li.h/2*zoom;
				var dh = (li.t_size+3)*zoom;//межстрочный	
				ctx.font = 'normal '+li.t_size*zoom+'px Arial';
				var mas_t = li.text.split('\n');
					ctx.translate(li.x, li.y);
				if(li.vis == 3) ctx.translate(balls[li.per_id].x, balls[li.per_id].y);
				if(li.text.length == 0) mas_t = '';
				else if((mas_t.length == 1)&&(li.img == '')) ctx.translate(0, 5*zoom);
				  ctx.fillStyle = li.t_color;
					 ctx.textAlign = "center";
					 ctx.textBaseline = "top";
				for(var j = 0;j < mas_t.length;j++){
					ctx.fillText(mas_t[j],0, j*dh-s_h+5*zoom);
				}
				if(li.img !=''){
					ctx.translate(0, mas_t.length*dh-s_h+5*zoom);//console.log(mas_t.length);
					ctx.drawImage(li.img, 0, 0, li.img.width, li.img.height, (- Math.min(s_w,(li.img.width*zoom+10*zoom)/2)+5*zoom),0, (Math.min(2*s_w,li.img.width*zoom+10*zoom)-10*zoom), (li.h*zoom-mas_t.length*dh-10*zoom));
					
				}
				ctx.restore();
			}
		}
	//выбранный чувак
	ctx.save();
				var s_w = com_w/2*zoom;
				var s_h = s_w;
				var dR = s_h*0.5;//скругление форм
				var bo = balls[target];
				if(bo.vis == 3) bo = balls[bo.per_id];
				if((bo.com !=null)||(bo.com == target)) {
					if((balls[bo.com].text!='')||(balls[bo.com].img!='')){
						ctx.beginPath();
								ctx.fillStyle = bo.color;
								ctx.translate(bo.x+bo.w/2*zoom+1.5*s_h, bo.y+bo.h/2*zoom-1*s_h);
					
								ctx.moveTo(-s_w, -s_h+dR);
								ctx.arc(-s_w+dR, -s_h+dR, dR, Math.PI, 1.5*Math.PI);
								ctx.arc(s_w-dR, -s_h+dR, dR, 1.5*Math.PI, 2*Math.PI);
								ctx.arc(s_w-dR, s_h-dR, dR, 0, 0.5*Math.PI);
								ctx.arc(-s_w+dR, s_h-dR, dR, 0.5*Math.PI, Math.PI);
								ctx.lineTo(-s_w, -s_h+dR);
								ctx.fill();
						//коммент иконка
						ctx.beginPath();
								ctx.translate(0, -s_h*0.1);
								s_h = 0.4*s_w;
								s_w = 0.5*s_w;
								dR = s_h*0.4;
								ctx.fillStyle = 'white';
								//ctx.moveTo(-s_w/2, -s_h/2+10*zoom);
								ctx.arc(-s_w+dR, -s_h+dR, dR, Math.PI, 1.5*Math.PI);
								ctx.arc(s_w-dR, -s_h+dR, dR, 1.5*Math.PI, 2*Math.PI);
								ctx.arc(s_w-dR, s_h-dR, dR, 0, 0.5*Math.PI);
								ctx.arc(-s_w+dR, s_h-dR, dR, 0.5*Math.PI, Math.PI);
								ctx.moveTo(0.5*s_w, 0.7*s_w);
								ctx.quadraticCurveTo(0, 1.2*s_w,-0.9*s_w, 1.3*s_w);
								//ctx.lineTo(-s_w, 1.3*s_w);
								ctx.lineTo(0, 0.3*s_w);
								//ctx.lineTo(-s_w, -s_h+2*dR);
								//ctx.quadraticCurveTo(-s_w-dR, -s_h+dR, -s_w-dR, -s_h);
								//ctx.lineTo(-s_w, -s_h+dR);
								ctx.fill();
								//ctx.stroke();
						ctx.restore();	
						//ctx.fillStyle = 'black';
								del_rect.push([bo.x+bo.w/2*zoom,bo.y+bo.h/2*zoom+2,4*s_w,-4*s_w]);
					}
				}
	}}
	
	function ball_upd(){
		var bo = balls[target];
		var mas_t = text.split('\n');
		var h_b = 0;
		var w_b = 0;
		ctx.font = 'normal '+bo.t_size+'px Arial';
		bo.time = (new Date()).getTime();
		ima = 0;
		if(bo.vis == 3) balls[bo.per_id].time = bo.time;
		if(bo.com != null) balls[bo.com].time = bo.time;
		bo.text = text;
		ctx.save();
		var dh = bo.t_size*1+3;//межстрочный
		h_b = dh*mas_t.length+10;//по 5 сверху и снизу
		if(bo.text.length == 0) h_b = 10;
		for(var i = 0;i < mas_t.length;i++){
			if(w_b < ctx.measureText(mas_t[i]).width) w_b = ctx.measureText(mas_t[i]).width+40;//отступ по 5
		}
		ctx.restore();
		if(bo.img !=''){
			bo.w = Math.min(300,bo.img.width+10);
			bo.w = Math.max(bo.w,w_b);
			if(bo.w < bo.img.width+10){
				bo.h = bo.img.height*(bo.w-10)/bo.img.width + h_b;
			}else bo.h = bo.img.height + h_b;
		}else{
			bo.h = Math.max(40,h_b);//минимальная высота
			bo.w = Math.max(70,w_b);//минимальная ширина
		}
		if(bo.com != null) {
			var li = balls[bo.com];
			li.x = (bo.w/2+li.w/2+20)*zoom;
			li.y = (bo.h/2+li.h/2)*zoom;
		}
		if(bo.vis == 3) {
			target = bo.per_id;
			text = balls[bo.per_id].text;
			ball_upd();
		}
		draw();
		//console.log(bo.x,bo.y,bo.h,bo.w);
	}
	
	function new_ball(){
		var b = [];
		var b_col = 0;
		b = get_ball();
		b.per_id = target;
		if(target == 0){
			for(var i in balls) {
				if(balls[i].per_id == 0) b_col = (b_col+1)%ball_color.length;
			}
			b.color = ball_color[b_col];
			b.l_color = ball_color[b_col];
		}else {
			b.color = balls[target].color;
			b.l_color = balls[target].l_color;
		}
		
		b.x = x2;
		b.y = y2;
		balls.push(b);
		target = balls.length-1;
		draw();
	}
	
	function del_ball(de){
		if(de > 0){
			balls[de].vis = 2;
			balls[de].time = (new Date()).getTime();
			for(var i in balls)
				if((balls[i].per_id == de)&&(balls[i].vis != 3)&&(balls[i].vis != 4)&&(balls[i].vis != 2)) {
					balls[i].vis = 2;
					balls[i].time = (new Date()).getTime();
					del_ball(i);
				}
		}
		if(de == target) {
			target = balls[target].per_id;
			draw();
		}
	}
	
	function vis_ball(de,vis_old,vis_new,de1){
			for(var i in balls)
				if((balls[i].per_id == de)&&(i!= 0)&&(balls[i].vis == vis_old)&&((balls[i].vis_per_id == null)||(balls[i].vis_per_id == de1))) {
					balls[i].vis = vis_new;
					if(vis_old != 0) balls[i].vis_per_id = de1; else balls[i].vis_per_id = null;
					//balls[i].time = (new Date()).getTime();
					vis_ball(i,vis_old,vis_new,de1);
				}
		if(de == target) {
			draw();
		}
	}
	
	function rev_del_ball(){
			var del_time = 0;
			for(var i in balls)
				if((balls[i].vis == 2)&&(balls[i].time > del_time)) del_time = balls[i].time;
			del_time = del_time-100;
			for(var i in balls)
				if((balls[i].vis == 2)&&(balls[i].time > del_time)) {
					balls[i].vis = 1;
					balls[i].time = (new Date()).getTime();
				}
		draw();
		
	}
	
	function get_target(){
		var m_t = false;
		target2 = -1;
		target_pre = target;
		var bo = balls[target];
		li = balls[bo.com];
		
		if((li!=null)&&	(x2>bo.x+li.x-li.w/2*zoom)&&	(x2<bo.x+li.x+li.w/2*zoom)&&	(y2>bo.y+li.y-li.h/2*zoom)&&	(y2<bo.y+li.y+li.h/2*zoom)) {
			t=false;
			target2 = -2;
			target = bo.com;
			show_elem('gray');
		}else 
			for(var i in balls){
				li = balls[i];
				if((li.vis == 1)&&	(x2>li.x-li.w/2*zoom)&&	(x2<li.x+li.w/2*zoom)&&	(y2>li.y-li.h/2*zoom)&&	(y2<li.y+li.h/2*zoom)) {
					//console.log(li.x,li.y,li.h,li.w,x2,y2);
					if(target != i) time.o =0;
					target = i;
					//console.log(target);
					document.getElementsByTagName("textarea")[0].value='';
					target2 = i;
					t_dx = li.x - x2;
					t_dy = li.y - y2;
					if(target == 0){t_dx = x2;t_dy = y2;}
					m_t = true;
				}
			}
		if(target2 ==-1) num_click++;
		else num_click = 0;
		num_click %=3;
		//console.log(num_click)
		show_vetka();
		draw();
	}
	
	function click_ball(x_to,y_to) {
		t = false;
		if(((target_pre == target)||(target2 == -1))&&(x_to == x_touch)&&(y_to == y_touch)) {
			if(target2>=0)  {show_elem('gray');}
			else if(target2 ==-1) {
				if(num_click == 2) {
					new_ball();
					show_elem('gray');
					num_click =0;
				}
			}
		}
		draw();
	}
	
	function show_elem(ele){
		if(ele == 'gray') {
			document.getElementsByTagName("textarea")[0].value = balls[target].text;
		}
		var elemen = document.getElementById(ele);
	if(elemen.style.display == 'block') {document.getElementById('comment_0').style.display = elemen.style.display = 'none';window.scrollTo(0,0);}
		else {
			document.getElementById('comment_0').style.display = elemen.style.display = 'block';
			window.scrollTo(0,0);
			if(balls[target].img!='') {
				document.getElementById('img1').style.display = 'none';
				document.getElementById('img2').style.display = 'block';
				
			}else{
				document.getElementById('img1').style.display = 'block';
				document.getElementById('img2').style.display = 'none';
			}
			get_width_com();
			if(ele == 'gray') document.getElementById("editor").select();
		}
	}
	
	function move_target(t_x,t_y){
		time_m.n = new Date().getTime();//50 мс задержка между кадрами
		if(time_m.n - time_m.o > fps){
			time_m.o = time_m.n;
			if((target2>=0)&&(target>0)){
				balls[target2].x=t_x+t_dx;
				balls[target2].y=t_y+t_dy;
				balls[target2].time = (new Date()).getTime();
			}
			else if((target2 ==-1)||(target == 0)){
				
				for(var i in balls){
					if((balls[i].vis != 3)&&(balls[i].vis != 4)){
						balls[i].x += t_x - t_dx;
						balls[i].y += t_y - t_dy;	
					}
				}
				t_dx = t_x;
				t_dy = t_y;
				num_click = 0;
			}
			draw();
			}
	}
	
	function zoom_map(x_0,y_0,x_1,y_1){
		time_m.n = new Date().getTime();//50 мс задержка между кадрами
		if(time_m.n - time_m.o > fps){
			time_m.o = time_m.n;
			c_x = (x_0+x_1)/2;
			c_y = (y_0+y_1)/2;
			l_1 = Math.sqrt((x_1-x_0)*(x_1-x_0) + (y_1-y_0)*(y_1-y_0));//расстояние между точками
			//alert((x_1-x_0)*(x_1-x_0) + (y_1-y_0)*(y_1-y_0));
			if((zoom *l_1/l_0<4)&&(zoom *l_1/l_0>0.2)) {
				zoom *= l_1/l_0;
				for(var i in balls){
					if((balls[i].vis != 3)&&(balls[i].vis != 4)){
						balls[i].x = c_x -(c_x-balls[i].x)*l_1/l_0;
						balls[i].y = c_y -(c_y-balls[i].y)*l_1/l_0;
					}else{
						balls[i].x *= l_1/l_0;
						balls[i].y *= l_1/l_0;
					}
				}
			}
			l_0 = l_1;
			draw();
		}
	}
	
	function in_map(elem){
		if((elem.x - elem.w/2*zoom < width)&&
			(elem.x + elem.w/2*zoom > 0)&&
			(elem.y - elem.h/2*zoom < height)&&
			(elem.y + elem.h/2*zoom > 0))
		return true;
	}

	function start_ball() {
		x2 = width/2;
		y2 = height/2;
		new_ball();
	}
	
	function get_comment() {
		var b = [];
		var bo = balls[target];
		if(bo.com == null) {
			b = get_ball();
			b.per_id = target;
			bo.com = balls.length;
			b.color = bo.color;
			b.l_color = bo.l_color;
			b.t_color = 'black';
			b.x = (bo.w/2+b.w/2+20)*zoom;
			b.y = (bo.h/2+b.h/2)*zoom;
			b.vis = 3;
			balls.push(b);
			bo.time = (new Date()).getTime();
			target = balls.length-1;
			show_elem('gray');
			draw();	
		}
	}
	
	function get_color(ii) {
		var R0=255;
		var G0=102;
		var B0 = 0;
		var ret_i = 'rgb(';
		var Y0 = 136.119;//0.299*R+0.587*G+0.114*B
		var n = 255/(Y0*15);//двадцать первых
		var cnt_time = 3;
		for (var i in balls){
			if((balls[i].time > ii)&&(balls[i].vis ==1)) cnt_time++;
		}
		if(cnt_time) ret_i += Math.round(Y0*(n*cnt_time-1)+R0) + ',' + Math.round(Y0*(n*cnt_time+0.703)-0.509*R0-0.194*B0) +',' + Math.round(Y0*(n*cnt_time-1)+B0) + ')';
		else ret_i += '255,255,255)';
		/*var min_i = (new Date()).getTime();
		//min_i .= getTime();
		var max_i = 0;
		var res_i = 0;
		var ret_i = 'rgba(';
		for (var i in balls){
			if((balls[i].time < min_i)&&(balls[i].vis ==1)) min_i = balls[i].time;
			if((balls[i].time > max_i)&&(balls[i].vis ==1)) max_i = balls[i].time;
		}
		
		res_i = Math.floor((max_i-ii)*1020/(max_i - min_i));
		if(res_i <=255) ret_i += '255,'+res_i+',0)';//желтый
		else if(res_i <=510) ret_i += (510-res_i)+',255,0)';//зеленый
		else if(res_i <=765) ret_i += '0,255,'+(res_i-510)+')';//голубой
		else  ret_i += '0,'+(1020-res_i)+',255)';//синий
		(255,102,0,01)*/
		//console.log(ret_i);
		return ret_i;
	}
	function update_info() {
		to_send = '';
		time_now = (new Date()).getTime();
		dt = time_now - last_upd;
		//if(last_upd == 0) dt=0;
		send_mass = [];
		upd_ball = [];
		//console.log(location.href.replace(/(^.*\/).*?$/g,'$1'));
		if(last_upd_pre!=last_upd){
			for(var i in balls) {

				if(balls[i].time > last_upd){
					var li = balls[i];
					li.mod_num++;
					to_send += i + '~';
					for(var j in li){
						if(j == 'x') {
							if((i!= 0)&&(li.vis != 3)&&(li.vis != 4))
								to_send += Math.round((li.x - balls[0].x)/zoom)+ '~';
							else if((li.vis == 3)||(li.vis == 4))
								to_send += Math.round(li.x/zoom) + '~';
							else 
								to_send += 0+ '~';
						}else if(j == 'y') {
							if((i!= 0)&&(li.vis != 3)&&(li.vis != 4))
								to_send += Math.round((li.y - balls[0].y)/zoom)+ '~';
							else if((li.vis == 3)||(li.vis == 4))
								to_send += Math.round(li.y/zoom) + '~';
							else 
								to_send += 0+ '~';
						}else if(j == 'w') to_send += Math.round(li.w)+ '~';
						else if(j == 'h') to_send += Math.round(li.h)+ '~';
						else if(j == 'time') to_send += (time_now - li.time) + '~';
						
						else if((j == 'img')&&(li[j] !='')) to_send += li.img.src.replace(/^.*\/(.*?$)/g,'$1') + '~';
						else to_send += balls[i][j] + '~';
					}
					to_send = to_send.replace(/~$/g,'');
					to_send += '`';
				}
			}
			to_send = to_send.replace(/`$/g,'');
			//last_upd = (new Date()).getTime();
			vote();
			draw();
		}
		last_upd_pre=last_upd;
	}
	
	function del_img(){
		if(confirm("Удалить изображение?")){
			bo= balls[target];
			bo.img = '';
			bo.time = (new Date()).getTime();
			ball_upd();
			document.getElementById('img1').style.display = 'block';
			document.getElementById('img2').style.display = 'none';
			
		}
	}
	function show_vetka(){
				if(balls[target].vis_chld){
				document.getElementById("vis1").style.display = 'none';
				document.getElementById("vis2").style.display = 'block';
			}else{
				document.getElementById("vis1").style.display = 'block';
				document.getElementById("vis2").style.display = 'none';
			}
	}
	function chld_balls(){
		var cnt_chld = 0;
		for(var i in balls)
			if((balls[i].per_id == target)&&(balls[i].vis == 1)) cnt_chld++;
		if((balls[target].vis_chld)||(cnt_chld)){
			balls[target].vis_chld =(balls[target].vis_chld+1)%2;
			//balls[target].time = (new Date()).getTime();
			vis_ball(target,balls[target].vis_chld,(balls[target].vis_chld+1)%2,target);
			show_vetka();
		}
	}
	function set_color() {
		var bo = balls[target];
		var set_c = true;
		for(var i in ball_color){
			if(bo.color == ball_color[i]) {
				i++;
				bo.color = ball_color[i%(ball_color.length)];
				bo.l_color = bo.color;
				bo.time = (new Date()).getTime();
				set_c = false;
				draw();
				break;
			}
		}
		if(set_c){
			bo.color = ball_color[0];
			bo.l_color = bo.color;
			bo.time = (new Date()).getTime();
			draw();
		}
	}