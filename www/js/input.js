  function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    }
    else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    }
    else alert("Обработчик не поддерживается");
  }
  // Добавляем обработчики для разных браузеров
  addHandler(window, 'DOMMouseScroll', wheel);
  addHandler(window, 'mousewheel', wheel);
  addHandler(document, 'mousewheel', wheel);
  // Функция, обрабатывающая событие
  function wheel(event) {
    var delta; // Направление колёсика мыши
    event = event || window.event;
    // Opera и IE работают со свойством wheelDelta
    if (event.wheelDelta) { // В Opera и IE
      delta = event.wheelDelta / 120;
      // В Опере значение wheelDelta такое же, но с противоположным знаком
      if (window.opera) delta = -delta; // Дополнительно для Opera
    }
    else if (event.detail) { // Для Gecko
      delta = -event.detail / 3;
    }
    // Запрещаем обработку события браузером по умолчанию
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
	zoom_mouse(event.pageX,event.pageY,delta);
	// Выводим направление колёсика мыши
  }
  
  	function zoom_mouse(c_x,c_y,delta){
		//alert((x_1-x_0)*(x_1-x_0) + (y_1-y_0)*(y_1-y_0));
		if((zoom + 0.1*delta < 4)&&(zoom + 0.1*delta > 0.2)) {
			zoom += 0.1*delta;
			for(var i in balls){
				if((balls[i].vis != 3)&&(balls[i].vis != 4)){
					balls[i].x = c_x -(c_x-balls[i].x)*zoom/(zoom - 0.1*delta);
					balls[i].y = c_y -(c_y-balls[i].y)*zoom/(zoom - 0.1*delta);
				}else{
					balls[i].x *= zoom/(zoom - 0.1*delta);
					balls[i].y *= zoom/(zoom - 0.1*delta);
				}
			}
		}
		draw();
	}