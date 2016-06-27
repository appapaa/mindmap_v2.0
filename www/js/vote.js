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
// javascript-код голосования из примера
function vote() {
	// (1) создать объект для запроса к серверу
	var req = getXmlHttp(); 
    var get_send = '';
	req.onreadystatechange = function() {  
        // onreadystatechange активируется при получении ответа сервера

		if (req.readyState == 4) { 
            // если запрос закончил выполняться

			if(req.status == 200) { 
                 // если статус 200 (ОК) - выдать ответ пользователю
				last_upd = (new Date()).getTime();
				get_send = req.responseText;
				if(get_send == 'wrong') {location.href = 'project.html';vote_=false;}
			//	console.log(req.responseText);
				if(get_send != '') {
			send_mass = get_send.split('`');
			for(var i in send_mass) {
				if(send_mass[i] =='')break;
				var s_m_b = send_mass[i].split('~');
				var b = [];
				b = get_ball();
				b.num = s_m_b[0];
				b.color = s_m_b[1];
				if((b.num!= 0)&&(s_m_b[10] != 3)&&(s_m_b[10] != 4))	b.x = s_m_b[2]*zoom +balls[0].x;
				else if((s_m_b[10] == 3)||(s_m_b[10] == 4)) b.x = s_m_b[2]*zoom;
				else b.x = balls[0].x;
				if((b.num!= 0)&&(s_m_b[10] != 3)&&(s_m_b[10] != 4)) b.y = s_m_b[3]*zoom +balls[0].y;
				else if((s_m_b[10] == 3)||(s_m_b[10] == 4)) b.y = s_m_b[3]*zoom;
				else b.y = balls[0].y;
				b.w = s_m_b[4]*1;
				b.h = s_m_b[5]*1;
				b.type = s_m_b[6]*1;
				b.time = time_now - s_m_b[7]-10000;
				b.per_id = s_m_b[8]*1;
				b.com = s_m_b[9];
				if(b.com == '') b.com = null;
				b.vis = s_m_b[10]*1;
				b.vis_chld = s_m_b[11]*1;
				b.l_color = s_m_b[12];
				b.l_w = s_m_b[13]*1;
				b.t_color = s_m_b[14];
				b.text = s_m_b[15];
				b.t_size = s_m_b[16]*1;
				b.img = get_img(s_m_b[17]);
				b.mod_num = s_m_b[18]*1;
				upd_ball.push(b);
			}
			for(var i in upd_ball) {
			//alert(upd_ball[i].num);
			if((upd_ball[i].num == balls.length)){
					balls.push(get_ball());
					balls[balls.length-1].time=0;
			}
			//console.log(upd_ball[i].num);
			if((upd_ball[i].time)&&(upd_ball[i].time >  balls[upd_ball[i].num].time)) {
				for(var j in balls[upd_ball[i].num]){
					//alert(balls[upd_ball[i].num][j]+' '+upd_ball[i][j]);
					balls[upd_ball[i].num][j] = upd_ball[i][j];
					}
				}
			}
			}
			}
			// тут можно добавить else с обработкой ошибок запроса
		}

	}

       // (3) задать адрес подключения
	//req.open('GET', 'http://192.168.1.34/balls.php?balls='+encodeURIComponent(to_send)+'&map=1&dt='+dt, false);  
	req.open('POST', server_adr+'balls.php?rand'+Math.random(), true);  
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	
	// объект запроса подготовлен: указан адрес и создана функция onreadystatechange
	// для обработки ответа сервера
	 
        // (4)
	req.send('balls='+to_send+'&map='+map_+'&dt='+dt);  // отослать запрос
	//console.log('balls='+to_send+'&map=1&dt='+dt);
        // (5)
	return get_send;
}

	upload_img = function(input) {
    var file = input.files[0];
    if (file) {
      upload(file);
    }
    return false;
	}
  function upload(file) {

  var xhr = getXmlHttp();
  
  // обработчик для закачки
  xhr.upload.onprogress = function(event) {
    //console.log(event.loaded + ' / ' + event.total);
	document.getElementById('load_img').style.width = event.loaded/event.total*100+'%';
	if(event.loaded/event.total == 1) 
		setTimeout(function(){
						document.getElementById('load_img').style.width = '0%';
						document.getElementById('img1').style.display = 'none';
						document.getElementById('img2').style.display = 'block';},300);
  }

  // обработчики успеха и ошибки
  // если status == 200, то это успех, иначе ошибка
  xhr.onload = xhr.onerror = function() {
	 var res32 = [];
    if (this.status == 200) {
		console.log(xhr.responseText);
		res32 = xhr.responseText.replace(/["]|[{]|[}]/g,'').split(':');
      console.log(res32);
	  if(res32[0] == 'files') {
			balls[target].img = get_img(res32[1]);
			balls[target].time = (new Date()).getTime();
			set_img(balls[target]);
	}else {
		alert('Картинка не подходит');
	}

    } else {
      console.log("error " + this.status);
    }
  };


  xhr.open("POST", server_adr+"upload.php?uploadfiles=1", true);
  var formData = new FormData();
	formData.append("thefile", file);
	xhr.send(formData);

}
function set_img(apapa) {
	var apapa = apapa;
	if(apapa.img.width > 0){
		//console.log(apapa.img.width);
		ima = 1;
		ball_upd();
	}else setTimeout(function(){set_img(apapa);}, 0);

}