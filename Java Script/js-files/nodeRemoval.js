var element = document.getElementById('button1');
var p11 = document.getElementById('hello');
element.addEventListener("click", func1 );
element.addEventListener("click", func2 );
var parent = document.getElementById('parent');

function func1()  {
  p11.remove();
}

function func2()  {
  alert("Hey !! what you did ?");
}
