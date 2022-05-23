=============== Работа сf DOM ============

let div = document.createElement('div'); - создаст элемент
div.remove(); - удалить элемент

document.createTextNode("hey"); - создаст текстовый узел

document.getElementByID('block'); - вернет element
document.getElementsByClassName('test'); - вернет HTMLCollection
document.getElementsByTagName('test'); - вернет HTMLCollection
document.guerySelector('.test'); - вернет первый element подходящий под селектор
document.guerySelectorAll('.test'); - вернет NodeList

document.body.insertAdjacentHTML('beforeend ', '<div id="two">two</div>'); - вставит содержимое перед концом body
    'beforebegin': до самого element (до открывающего тега).
    'afterbegin': сразу после открывающего тега  element (перед первым потомком).
    'beforeend': сразу перед закрывающим тегом element (после последнего потомка).
    'afterend': после element (после закрывающего тега).

parentElement.insertBefore(newElement, referenceElement); - добавляет элемент в  список дочерних элементов родителя перед указанным элементом.

node.cloneNode(true); - склонировать узел node и его детей (false - без дочерних элементов)

let block = document.getElementByID('block');
block.parentElement - получить родителя элемента
block.parentElement.children - получить детей элемента (получим NodeList)
block.parentElement.children[1] - получить первый дочерний элемент

let div = document.createElement('div');
document.body.appendChild(div) - вставит div в конец body
let text = document.createTextNode("hey"); - создаст текстовый узел
div.appendChild(text) - вставит текст из переменной "text" в тег div

document.body.innerHTML = ""; - заменяет содержимое body пустой строкой
document.body.innerHTML = "<p>Это просто текст</p>"; - содержимое body заменится абзацем с текстом (не безопасно, подвержен XSS), теги распознаются
document.body.innerHTML; - получить содержимое element body включая дочерние

document.body.textContent; - получить текс из элемента и его потомков
document.body.textContent = "<p>Это просто текст</p>"; - задать текс элемена, теги вставит как текст (не подвержен XSS), заменяет содержимое

document.body.innerText; - получить текс из элемента и его потомков
document.body.innerText = "<p>Это просто текст</p>"; - задаст текст элемента, теги распознаются

document.body.style.backgroundColor('red'); - задает css свойство backgroundColor тега body

elem.classList.add("ok", "understand"); - добавляет классы "ok", "understand" элементу elem
console.log(elem.classList.contains("lol")); - вернет true или false
elem.classList.remove("example", "for", "understand", "he"); - удалим классы
elem.classList - получаем псевдомассив классов элемента elem

let num = setInterval(function, time); - запускает function с переодичностью time, возвращает число
clearInterval(num) - остановит выполнение setInterval вернувшего num

element.id = 'idElement' - добавить id элементу

======== Работа с объектами ==========

const obj1 = {
};
const obj2 = {
	newProperty: "asfasdf",
};
Object.assign(obj1, obj2); - скопирует все свойства одного объекта в другой (делают клон объекта)

========= События ===========

Добавить обработчик на событие click
let div = document.getElementByID('block');
div.onclick = function () {
	alert('asdfasfj');
}
Добавить обработчик на событие click
div.addEventListener('click', function(event){
	console.log(this) - объект (тег) на который осуществили клик
	console.log(event) - объект с параметрами события (передается по умолчанию)
	alert('sfasdfasdf');
});

div.removeEventListener('clicl', sayHallo); - удалить обработчик у элемента

Обработка события загрузки картинки (успешная загрузка или ошибка)
let img = new Image();
img.src = 1.jpg; // Изображение начинает грузится после добавления свойства src 
img.onload = () => img.src = success.jpg; // обработка успешной загрузки картинки
img.onerror = () => img.src = error.jpg; // обработка ошибки при загрузки

Event.preventDefault() - остановить стандартное выполнение события
Event.stopPropagation() - Прекращает дальнейшую передачу (всплытие) текущего события
Event.stopImmediatePropagation() - Если несколько обработчиков прикреплены к одному и тому же элементу с 
одинаковым типом события, тогда они будут вызваны в порядке своего добавления. 
Если один из этих обработчиков вызовет event.stopImmediatePropagation() 
тогда события оставшихся обработчиков вызваны не будут.

============== JS This (стрелочная функция this, bing, call, apply) ==============
8й урок

"use strict"
console.log(this); - в this бедут лежать объект window


"use strict"
function myFunc() {
	console.log(this);
}
myFunc();
В данном случает this возвращает undefind.
Если убрать "use strict" this примет занчение глобального объекта window


"use strict"
const game = {
	run() {
		console.log(this);
	},
};
game.run(); - в данном случает this примет значение obj game
В this лежит объект в котором записан метод, в котором этот this используется (но не всегда *)
const myRun = game.run;
myRun(); - в данном случает this примет значение undefind
На самом деле значение this зависет от того как вызывается метод.
В this будет лежать то, что было слева от точки в момент вызова метода


'use strict'
const user = {
	name: "Павел",
	sayName () {
		console.log(this);
	},
};
setTimeout(user.sayName, 1000); - setTimtout насильно ставит в this объект window, 
поэтому после выполнения setTimeout console.log(this) выведет объект window
setTimeout(() => user.sayName(), 1000); - стрелочная функция не принемает насильно 
ничей контекст для this (bind, call и apply работать не будут),
метод sayName() выведет объект user


'use strict'
fucntion sayName(a, b) {
	console.log(this);
	console.log(this.name);
	console.log(a, b);
}
const user = {
	nsme: "Павел",
}
const myFunc = sayName.bid(user); - bind создает и возвращает новую функцию и устанавливает новый контекст (нампертво, больше его не изменить) для this
myFunc();
sayName.call(user, 1, 2); - вызывает и выполняет на месте функцию sayName и задает контекст объект user для this
sayName.apply(user, [1, 2]); - вызывает и выполняет на месте функцию sayName и задает контекст объект user для this
Разница между call и apply только в способе передачи дополнительных входных параметров функции


"use strict"
cosnt sayName = (a, b) => {
	console.log(this);
	console.log(a, b);
}
const user = {
	name: "Павел",
}
sayName(); 
В this внутри стрелочной функции будет лежать то, 
что было в this вокруг стрелочной функции в момент ее создания,
другими словами this стрелочной функции принемает контест окружения
Стрелочная функция сохраняет значение this лексического окружения, в котором была создана
В стрелочных функциях, this привязан к окружению, в котором была создана функция. 
В глобальной области видимости this будет указывать на глобальный объект.


<button id="asd"> Кнопка </button>
'use strict'
const obj = {
	prop: 'hello',
	init() {
		const btn = document.getElementByID('asd');
		//Цель по нажатию на кнопку вывести объект obj
		btn.addEventListener('click', this.method()); - НЕПРАВИЛЬНО, this.method() выполнится, выведет объект obj, и вернет underfind,
		в обработчик события повесится underfind
		btn.addEventListener('click', this.method); - НЕПРАВИЛЬНО, поле нажатия на кнопку btn console.log(this) выведет объект btn (тег button),
		это произошло из-за того что addEventListener задает свой контекст this (элемент на который повесили обработчик)
		btn.addEventListener('click, function() {
			this.method(); - НЕПРАВИЛЬНО, funсtion примет в контекст this объект btn на который вешается обработчик события,
			поэтому метод method() будет искаться у объекта btn (тег button), т.к. такого не сужествует получим ошибку
		});
		btn.addEventListener('click', () => this.method()); - ВЕРНО, у стрелочной функции this примет контекст, того что находитмя вокруг нее
		в момент ее созданся, в момент создания она находится в методе init объекта obj, в котором this является obj, соответственно выполнится obj.method(),
		а далее console.log(obj), чего мы и добивались
		btn.addEventListener('click', this.method.bind(this)); - ВЕРНО, жестко устанавливаем методу method контекст this, при вызове функции
		addEventListener не сможет его переопределить
		btn.addEventListener('click, (function() {
			this.method(); - ВЕРНО, жестко устанавливаем методу method контекст this, при вызове функции addEventListener
		не сможет его переопределить
		}).bind(this);
		
		var that = this
		btn.addEventListener('click, function() {
			that.method(); - старый способ сохранения контекста this через переменну that 
		});
	},
	method() {
		console.log(this)
	},
};
odj.init();



function a() {
	console.log(arguments); - выведет итерируемый объект со всеми входными параметрами функции a
	[].incudes.call(arguments, 11); - у объекта arguments нет метода includes, он имеется только у массивов, но мы может
	выдернуть этот метод c помощью call и передать в качестве this объект argumnts и значение которое нам необходимо найти
	но быстрее будет использовать конструкцию
	Array.prototype.incudes.call(arguments, 11); 
}
a(1, 3423, 11);


============ JS замыкания =============
8й урок

"use strict"
function myFunc() {
	let name = 'Павел';
	function sayName() {
		console.log(name);
	}
	return sayName;
}
const mySayNameFun = muFync();
mySayNameFun();
C помощью данного приема (замыкания) мы получаем доступ к переменным функции myFunc из функции sayName,
после выполнения функции muFync() переменная name не удалится, т.к. имеется функция sayName которая ссылается на нее.
Замыканик помогает нам получить изоляцию иди один из принципов ООП - инкапсуляцию (мы не имеем доступ из вне к переменным функции,
а толькочерез функции этой же функции (родителя))

============== JS каррирование =============
Каррирование – это трансформация функций таким образом, чтобы они принимали аргументы не как f(a, b, c), а как f(a)(b)(c).
Создадим вспомогательную функцию curry(f), которая выполняет каррирование функции f с двумя аргументами. 
Другими словами, curry(f) для функции f(a, b) трансформирует её в f(a)(b).
function curry(f) { // curry(f) выполняет каррирование
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// использование
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
Результат curry(func) – обёртка function(a).
Когда она вызывается как sum(1), аргумент сохраняется в лексическом окружении и возвращается новая обёртка function(b).
Далее уже эта обёртка вызывается с аргументом 2 и передаёт вызов к оригинальной функции sum.


========== Нативные и хост объекты ========

Нативные объекты определены документацией (String, Math, Object, Array)
Хост объекты определены средой выполнения js (window, document)

============ ... Spread operator (оператор расширения), остаточные параметы функции =========

https://learn.javascript.ru/rest-parameters-spread-operator - Остаточные параметры и оператор расширени


(...array) Spread operator (оператор расширения)

function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// expected output: 6

----

"use strict"
function a (...args) {
	console.log(args); - выведет все переданные аргументы в виде массива
	//args - просто переменная
}
a(22, 233, 3, 4);

-----

let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, затем arr, затем 2, в конце arr

-----

Копирование массива

var arr = [1, 2, 3];
var arr2 = [...arr]; // like arr.slice()

============ Реструктуризация (деструктуризация) ==========

https://learn.javascript.ru/destructuring-assignment - деструкторизация массива и объекта 

const foo = ['one', 'two', 'three'];
const [one, two, tree] = foo;
это равнозначно записи 
const one = foo[0];
const two = foo[1];
const three = foo[2];


let a = 1;
let b = 2;
[a, b] = [b, a]; - переприсвоит переменные, b примет значени равное 2, а примет значение равное 1

------

let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200

-----

let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200

-----

let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// деструктуризация разбита на несколько строк для ясности
let {
  size: { // положим size сюда
    width,
    height
  },
  items: [item1, item2], // добавим элементы к items
  title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut

------

============ ООП (Классы, прототипы, конструкрторыы) ==========

'use strict';

// Создаем класс Person 
function Person(name, yearOfBirth) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
}
//   Записываем функцмю calcAge в протип класса. 
//   Данная операция необходима, для того что бы при создании эксземпляров класса (новых объектов) 
//   данная функция не дублировалась в каждый объект, а находилась в прототипе функции конструктора (классе)
Person.prototype.calcAge = function () {
    console.log(new Date().getFullYear() - this.yearOfBirth);
};

function Teacher(name, yearOfBirth, subject) {
// Вызываем функцию конструктор Person в контексте создаваемого экземпляра класса Teacher 
    Person.call(this, name, yearOfBirth);
    this.subject = subject;
}
// Создаем новый объект на основе прототипа класса Person и присваеваем его
// в прототип класса Teacher
Teacher.prototype = Object.create(Person.prototype);
// После присвыевания выше потерялся конструктор прототопа класса Teacher
Teacher.prototype.constructor = Teacher;

var john = new Person('John', 1990);
var ann = new Teacher('Ann', 1998, 'Math');

  //ES6

// Создаем класс Person
class Person {
// Указываем свойства класса которые будут находится в конструкторе
// и будут сохранятся в каждом объекте (экземпляре класса)
	constructor(name, yearOfBirth) {
    	this.name = name;
    	this.yearOfBirth = yearOfBirth;
    }
// Создаем функции, которые будут находится в прототипе класса Person
    calcAge() {
    	console.log(new Date().getFullYear() - this.yearOfBirth);
    }

    sayHi() {
    	return `${this.name} says "Hi"!`;
    }
}

// Через ключевое слово extends происходит наследование от класаа Person
class Teacher extends Person {
    constructor(name, yearOfBirth, subject) {
// Через ключевое слово super происходит передача параметров в функцию коструктор Person
    	super(name, yearOfBirth);
    	this.subject = subject;
    }
// Через ключевое слово static происходит создание статических методов функции конструктора
// Teacher, для вызова даннх методов необходимо обращаться напрямую к классу (функции конструктор)
// Teacher.triple(3)
    static triple(x) {
    	if (x === undefined) {
    		x = 2;
    	}

      return x * 3;
    }
    sayHi() {

    	return `${super.sayHi()} to students`;
    }
}
// Создаем экземпляры классов Person и Teacher
const john = new Person('John', 1990);
const ann = new Teacher('Ann', 1998, 'Math');
// Выполняем статический метод triple, доступный только 
console.log(Teacher.triple(4));

============ Для выполнения когда после загрузки страницы ==========

Атрибуты тега script - defer и async
<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
Скрипты с defer никогда не блокируют страницу.
Скрипты с defer всегда выполняются, когда дерево DOM готово, но до события DOMContentLoaded.

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
Атрибут async означает, что скрипт абсолютно независим:
Страница не ждёт асинхронных скриптов, содержимое обрабатывается и отображается.
Событие DOMContentLoaded и асинхронные скрипты не ждут друг друга:
DOMContentLoaded может произойти как до асинхронного скрипта (если асинхронный скрипт завершит загрузку после того, как страница будет готова),
…так и после асинхронного скрипта (если он короткий или уже содержится в HTTP-кеше)
Остальные скрипты не ждут async, и скрипты casync не ждут другие скрипты.


document.addEventListener('DOMContentLoaded', () => {
    Любой код на JS 
});

============== Асинхронные запросы (AJAX) - fetch, HTTPXMLrequest ==========

Коды ответа HTTP

Код ответа (состояния) HTTP показывает, был ли успешно выполнен определённый HTTP запрос. Коды сгруппированы в 5 классов:

    Информационные 100 - 199
    Успешные 200 - 299
    Перенаправления 300 - 399
    Клиентские ошибки 400 - 499
    Серверные ошибки 500 - 599
  
    
    Ошибка 400 - «Bad Request»
    Ошибка 403 - «Доступ запрещен»
    Ошибка 404 – файл не найден
    Ошибка 500 – ошибка сервера
    Ошибка 502 – Bad Gateaway
    Ошибка 503 – Service Temporarily Unavailable

    xhr.readyState
    0 - запрос не инициализирован
    1 - загрузка данных
    2 - запрос принят сервером
    3 - идет обмен данными
    4 - запрос выполнен

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ajax-get').addEventListener('click', () => {
      // ES5
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'tel.json', true); // true - асинхронный запрос
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          console.log(`Error ${xhr.status} ${xhr.statusText}`);
        } else {
          console.log(`Ok! ${xhr.responseText}`);
          let data = JSON.parse(xhr.responseText);
          let block = document.getElementById('ajax-block');
          block.insertAdjacentHTML('beforeend', `<p>${data.name} - <strong>${data.tel}</strong></p>`);
        }
      };
      xhr.send();

      // ES6
      fetch('tel.json')
        .then(result => result.json())
        .then(data => {
          console.log(data);
          let block = document.getElementById('ajax-block');
          block.insertAdjacentHTML('beforeend', `<p>${data.name} - <strong>${data.tel}</strong></p>`);
        });
    });
  });


  // Получение товаров через fetch
  
  // [
  //   { id: 1, title: 'Notebook', price: 1000 },
  //   { id: 2, title: 'Mouse', price: 100 },
  //   { id: 3, title: 'Keyboard', price: 250 },
  //   { id: 4, title: 'Gamepad', price: 150 },
  // ]
  _fetchProducts() {
    const url = 'https://raw.githubusercontent.com/MisyurinDaniil/learn_js/main/products.json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.products = [...data];
        this._renderProducts();
      });
  }

  // Получение товаров через XMLHttpRequest

  _fetchProducts(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/MisyurinDaniil/learn_js/main/products.json', true)
    xhr.responseType = 'json';
    let promiseGetProducts = new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
          else {
            if (xhr.status === 200) {
              resolve(xhr.response);
            }
            else {
              reject(xhr.status);
            }
          }
      };
    })
    .then((response) => {
      this.products = [...response]; 
      this._renderProducts();
    });
    xhr.send();
  }



