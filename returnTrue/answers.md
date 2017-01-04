`function id(x) {
    return x;
}`

	!0

`function reflexive(x) {
    return x != x;
}`

	NaN

`function infinity(x, y) {
    return x === y && 1/x < 1/y 
}`

	-0,0

`function transitive(x,y,z) {
    return x && x == y && y == z && x != z;
}`

	[],0,[]

`function counter(f) {
    var a = f(), b = f();
    return a() == 1 && a() == 2 && a() == 3
        && b() == 1 && b() == 2;
}`

	x=>_=>x=-~x

`function peano(x) {
    return (x++ !== x) && (x++ === x);
}`

	61**9

`function array(x,y) {
    return Array.isArray(x) && !(x instanceof Array) &&
          !Array.isArray(y) &&  (y instanceof Array);
}`

	[].__proto__,{__proto__:[]}

`function instance(x,y) {
  return x instanceof y && y instanceof x && x !== y;
}`

	Proxy,Object

`function instance2(a,b,c) {
  return a !== b && b !== c && a !== c
      && a instanceof b
      && b instanceof c 
      && c instanceof a;
}`

	Object,Function,{[Symbol.hasInstance]:_=>1}

`function proto1(x) {
    return x && !("__proto__" in x);
}`

	{__proto__:null}

`function undef(x) {
    return !{ undefined: { undefined: 1 } }[typeof x][x];
}`

	document.all

`function symmetric(x,y) {
    return x == y && y != x;
}`

	i=0,{valueOf:_=>i++}

`function ouroborobj(x) {
    return x in x;
}`
	[0]

`function truth(x) {
    return x.valueOf() && !x;
}`
	'',''.__proto__.valueOf=_=>1

`function wat(x) {
    return x('hello') == 'world:)' && !x;
}`
	d=document.all,d[0].id="hello",d[0].valueOf=_=>"world:)"

`var eval = window.eval;
function evil1(x) {
    return eval(x+'(x)') && !eval(x)(x);
}`
	
	x=>0

`var eval = window.eval;
function evil2(x) {
    return eval('('+x+')(x)') && !eval(x)(x);
}`

	_=>x=_=>0

`var eval = window.eval;
function evil3(parameter) {
    return eval('('+parameter+')(parameter)') && 
          !eval(parameter)(parameter);
}`

	_=>x--,x=1

`function random1(x) {
    return Math.random() in x;
}`

	[Math.random=_=>0]

`var rand = Math.random();
function random2(x) {
  return rand in x;
}`

	new Proxy({},{has:_=>1})

`var key = crypto.getRandomValues(new Uint32Array(4));
function random3(x) {
    var d = 0;
    for (var i=0; i<key.length; i++) {
        d |= key[i] ^ x[i];
    }
    return d === 0;
}`

	...?

`var rand = Math.random();
function random4(x) {
    return rand === x;
}`

	...?

`function letsgo(x) {
    let a = let `abc`;
    return `abc` === a;
}`

	let=x=>x+""

`function closure(x) {
    return x[x] == x;
}`

	[0]

`const toString = Function.prototype.toString;
function native(x) {
    return (x() === 1) && (x.toString() === 'function () { [native code] }') && (toString.call(x) === x.toString())
}`

	f=_=>1,x=0,f.toString=_=>x?'_=>1':(x++,(Map+"").replace("Map",""))
	...? (13)

`function stringable(s) {
    try {
      '' + s;
    } catch (e) {
      return String(s) == s.toString();
    }
}`

	Symbol()

`function thaw(unfreeze) {
    var obj = {x: 1};
    Object.freeze(obj);
    unfreeze(obj);
    return obj.x !== 1;
}`

	Object.freeze=a=>a.x=0

`function thaw2(unfreeze, k) {
    var obj = {};
    obj[k] = 1;
    freeze(obj);
    unfreeze(obj);
    return obj[k] !== 1;
}`

	_=>x=2,{toString:_=>x},x=1
	...? (16)

`var freeze = Object.freeze;
function thaw3(unfreeze, obj) {
    obj.x = 1;
    freeze(obj);
    unfreeze(obj);
    return 'x' in obj && obj.x !== 1;
}`

	a=Object.freeze,a({x:2})
	...? (16)

`// Input must be a string; no redefinition shenanigans this time.
verifyInput = JSON.parse;
// Reviewer didn't like eval(), so parse the expression by hand for safety.
// Use:
//    a = 1 + 1;
//    result = sqrt(a + PI);
function calc0(s) {
    var tokens = s.match(/(\w+|[+=();])/g);
    var vars = {
        // Expose only safe functions
        PI: Math.PI,
        sqrt: Math.sqrt,
        isNaN: isNaN,
    };
    var peek = _ => tokens[0];
    var eat = _ => tokens.shift();
    var ate = x => peek() === x && eat();
    var want = x => { if (!ate(x)) throw 'Expected "'+x+'" at '+JSON.stringify(tokens); }
    function statement() {
        vars[eat()] = [want('='), expr(), want(';')][1];
    }
    function expr() {
        for (var v = term(); ate('+'); v = v + term());
        return v;
    }
    function term() {
        for (var v = atom(); ate('('); v = v([expr(), want(')')][0]));
        return v;
    }
    function atom() {
        var p = eat(), n = parseInt(p);
        if (!isNaN(n)) return n;
        if (!(p in vars)) throw 'Undefined '+p;
        return vars[p];
    }
    while (peek()) statement();
    return vars.result;
}`

	"result=isNaN(sqrt);"

`// Input must be a string; no redefinition shenanigans this time.
verifyInput = JSON.parse;
// Reviewer didn't like eval(), so parse the expression by hand for safety.
// Use:
//    a = 1 + 1;
//    result = sqrt(a + PI);
function calc(s) {
    var tokens = s.match(/(\w+|[+=();])/g);
    var vars = {
        // Expose only safe functions
        PI: Math.PI,
        sqrt: Math.sqrt,
        isNaN: Math.isNaN
    };
    var peek = _ => tokens[0];
    var eat = _ => tokens.shift();
    var ate = x => peek() === x && eat();
    var want = x => { if (!ate(x)) throw 'Expected "'+x+'" at '+JSON.stringify(tokens); }
    function statement() {
        vars[eat()] = [want('='), expr(), want(';')][1];
    }
    function expr() {
        for (var v = term(); ate('+'); v = v + term());
        return v;
    }
    function term() {
        for (var v = atom(); ate('('); v = v([expr(), want(')')][0]));
        return v;
    }
    function atom() {
        var p = eat(), n = parseInt(p);
        if (!isNaN(n)) return n;
        if (!(p in vars)) throw 'Undefined '+p;
        return vars[p];
    }
    while (peek()) statement();
    return vars.result;
}`

	...?
	"undefined=isNaN; NaN=sqrt(sqrt); false=isPrototypeOf(0); result=hasOwnProperty(undefined);" ????

`// Input must be a string; no redefinition shenanigans this time.
verifyInput = JSON.parse;
// Reviewer didn't like eval(), so parse the expression by hand for safety.
// Use:
//    a = 1 + 1;
//    result = sqrt(a + PI);
function calc2(s) {
    var tokens = s.match(/(\w+|[+=();])/g);
    var vars = {
        // Expose only safe functions
        PI: Math.PI,
        sqrt: Math.sqrt
    };
    var peek = _ => tokens[0];
    var eat = _ => tokens.shift();
    var ate = x => peek() === x && eat();
    var want = x => { if (!ate(x)) throw 'Expected "'+x+'" at '+JSON.stringify(tokens); }
    function statement() {
        vars[eat()] = [want('='), expr(), want(';')][1];
    }
    function expr() {
        for (var v = term(); ate('+'); v = v + term());
        return v;
    }
    function term() {
        for (var v = atom(); ate('('); v = v([expr(), want(')')][0]));
        return v;
    }
    function atom() {
        var p = eat(), n = parseInt(p);
        if (!isNaN(n)) return n;
        if (!(p in vars)) throw 'Undefined '+p;
        return vars[p];
    }
    while (peek()) statement();
    return result;
}`

	...?

`function tweet(s) {
  return s == 'The Kolmogorov complexity of an object, such as '
    + 'a piece of text, is the length of the shortest computer '
    + 'program (in a predetermined programming language) that '
    + 'produces the object as output.';
}`

	'ditto'
	...? (139)

`function spread(f) {
  return f(...f([...f]))
}`

	f=_=>a++>1||f,f[Symbol.iterator]=function*(){},a=1
	...? (23)

`verifyInput = str => {
  if (/[{>\[\/\\]/.test(str)) throw new Error('Illegal use of characters {, >, [, /, or \\')
}
function defaults(arguments) {
  var fib = eval(`x = (${arguments}) => n`)
  return [0,1,1,2,3,5,8,13,21,34,55,89,144].every((v, i) => fib(i) === v)
}`

	"i,n=i<2?i:x(i-1)+x(i-2)"

`verifyInput = JSON.parse;
var ev = window.eval;
function quine(x) {
  const string = x.toString()
  return string === ev(string)
}`

	"$=_=>`$=${$};$()`;$()"
	"(_=$=>`(_=${_})()`)()"

`var eval = window.eval
function evil4(f) {
  return f !== eval(f) &&
         f !== eval(f) &&
         f !== eval(f) &&
         f === eval(f)
}`

	"$=_=>window.a--<0?`$=${$};$()`:'';$()",a=2
	...? (12)

`const snake = f => f()()()()()()()()()()()()
                                          ()
()()()()()()()()()()()()()()()()()()()()  ()
()                                    ()  ()
()  ()()()()()()()()()()()(`-`)       ()  ()
()  ()                                ()  ()
()  ()()()()()()()()()()()()()()()()()()  ()
()                                        ()
()()()()()()()()()()()()()()()()()()()()()()`

	f=_=>a++>99||f,a=1

`function count(f) {
  return f() === 1
      && f()() === 2
      && f()()() === 3
      && f()()()() === 4
      && f()()()()() === 5
}`

	f=_=>++a>b?(a=1,b++):f,b=a=1

`verifyInput = str => {
  if (/\//.test(str)) throw new Error('Illegal use of character "/"')
}
const mirror = {
 ')':'(', '(':')',
 '>':'<', '<':'>',
 '}':'{', '{':'}',
 ']':'[', '[':']'
}
const eval = window.eval
function reflection(s) {
 let flipped = ''
 for (let i = s.length - 1; i >= 0; i--) flipped += mirror[s[i]] || s[i]
 return s === flipped && eval(s)()
}`

	'x=>x!=!x<=x'

`delete window.confirm;
delete window.prompt;
verifyInput = s => {
    if (eval(`untrue(${s})`) === true)
        throw 'Input returns true.';
}
function untrue(x) {
    return x;
}`

	...? {valueOf:_=>!0}

`function without(k, v, x) {
  with ({ [k]: v, x: false }) return x
}`

	Symbol.unscopables,{x:!0},!0

`delete Proxy;
delete Reflect;
function biggest(x) {
  if ('toString' in x || 'valueOf' in x) throw 'Boo';
  return x > x;
}`

	{__proto__:a=null,[Symbol.toPrimitive]:_=>--a}


###### Preserve these perfect tenets, men; ever keep these precepts ten. 
