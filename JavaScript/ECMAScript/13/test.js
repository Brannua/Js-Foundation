var name = "222";
var a = {
  name: "111",
  say: function () {
    console.log(this.name);
  }
}
var fun = a.say;
fun();// "222"
a.say();// "111"

var b = {
  name: "333",
  say: function (fun) {
    fun();
  }
}
b.say(a.say);// "333" is Wrong, the right answer is "222"

b.say = a.say;
b.say();// "333"

// -------------------------------------------------------------------

var a = {
  say: function() {
    console.log(this);
  }
}

function test() {
  console.log(this);
}

var b = {
  name: 'b',
  say: function (fun) {
    console.log(this);
    test();
    fun();
  }
}

b.say(a.say);

// --------------------------------------------------------

var a = {
  name: 'asd',
  say: function () {
    console.log(this);
  }
}
var b = {
  say: function (func) {
    var fun  = a.say;
    fun();
    func();
  }
}

b.say();
b.say(a.say);
