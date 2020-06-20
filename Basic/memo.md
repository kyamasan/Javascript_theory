### Javascriptエンジン
例
Google V8(Chromeで使用)
SpiderMonkey
JavaScriptCore


### 実行時に行われていること
Javascriptエンジンがコードを読み取る。
最初にParserで1行ずつ解析が行われる。
解析終了後、パーサーはデータ構造を生成(抽象構文木)
最終的に機械語に変換される。

### コードが実行される順序
execution context
全てのjavascriptを実行する環境の事。箱のようなもの。

global execution context
デフォルトで存在するexecution contextで、関数内にあるコード以外の全てはここで実行される。(重要！)
execution contextには、それに関連付けられたオブジェクトが存在する。

例えば、global execution contextにはグローバルオブジェクト(ブラウザでいう所のwindow object)が関連付けられている。
逆に言えば、グローバルオブジェクトで宣言された全てのものはWindowオブジェクトに紐づけられる。

var lastNameと、window.lastNameはまったく同じ。lastNameはウィンドウオブジェクトのプロパティのようなものと考えるとわかりやすい。プロパティはオブジェクトにアタッチされた単なる変数。(重要！)

関数の内部にあるコードはどこに紐づけられるのかというと、関数実行時に新たなexecution contextが生成される。関数が実行されている間、生成されたexecution contextがアクティブな状態になる。

Global execution contextが一番下にあり、その上に呼び出された順にExecution Contextが積まれていくので、Execution Stackと呼ばれる。(Order in which functions are called)

### execution contextに関連付けられたオブジェクトについて
このオブジェクトには3つのプロパティが存在する。
①variableオブジェクト(以下VO)→渡されてきた関数の引数も含む。
②スコープチェイン→現在の変数オブジェクトとその親を全て含む
③thisオブジェクト

復習:thisオブジェクトを使うことで、現在のオブジェクトに対して、プロパティの読み取りや書き込みができる。

### execution contextの生成について
①Creation Phase
最初にVOを生成し、次にスコープチェインを生成、最後にthisオブジェクトが決定される。

②Execution Phase
生成したコードを1行ずつ実行し、全ての変数が確定する。


### execution contextの生成について（詳細）
①Creation Phase

関数に渡された引数も含めた、引数オブジェクトの生成
関数宣言を照会するためのコードスキャンが行われる。この時、それぞれの関数を示すプロパティを生成する。
※プロパティはオブジェクトにアタッチされた単なる変数なので、すべての関数はそれ自身が実行される前に、変数オブジェクトの中に格納されているということになる。

変数宣言を照会するためのコードスキャンが行われる。この時、それぞれの変数を示すプロパティを生成する。(undefinedをセット。)

関数宣言と変数宣言を照会する為にコードスキャンが行われたことの最も重要なポイントは、関数や変数が実際に実行される前に、それらがjavascriptの巻き上げ(hoisting)機能によって使用可能になっているということ。

関数と変数のhoistingの違いは、関数が既に定義されているのに対し、変数はundefined、つまり実行時に値が決定するということ。

### hointing例

//methodの呼び出しを宣言より前に書いても問題なく実行される。

calculateAge(1990)

function calculateAge(year) {
    console.log(2020 -year)
}

//関数式は関数宣言でないため、前に書くことはできない。
retirement(1990)

const retirement = (year) => {
    console.log(65 - (2020 - year))
} 

変数宣言についても同様。

console.log(age) → undefined
var age = 23
console.log(age) → 23

もしvar age = 23を書かなければ、エラー。
console.log(age) → エラー！
//var age = 23


//複雑なケース
console.log(age)
var age = 23 → これはGlobal execution contextに格納される変数

function foo() {
    console.log(age) → undefined
    var age = 65 → これはfoo()に関連づいたexecution contextに格納される変数
    console.log(age) → 65
}
foo()
console.log(age) → 23

関数宣言をコードで実際に宣言する前に使用できる、という点は、巻き上げの最大のポイントであり、開発者を混乱させる原因の一つである。


### スコーピング
スコーピングとは、ある変数がどこにあるのか調べてくれる機能のこと。
Javascriptでは関数だけがスコープを持つ。(他の言語のように、if、for文のようなスコープは存在しない。)

### lexical Scoping(字句スコープ)
現在のスコープの中で、aという名前の変数が見つからない場合、親のスコープの中でaという変数を探し、それでも見つからない場合はグローバルスコープ(どの機能でも参照できる)の中を探しにいく。
この動きをスコープチェインと呼ぶ。子の関数が親に書かれており、親の関数がグローバルスコープに書かれているから、実現できる。



### execution stackとscoping chainの違い
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(C);
}
second()はthird()を呼び出すことができる。
しかし、thirdから呼び出せる引数はaとdのみ。
Execution stackで上側にあるからといって、下側の変数を呼び出すことはできない。

### this
thisはどこを指すのかというと、通常のfunction呼び出しでは、this＝グローバルオブジェクトである。
しかし、method呼び出しの場合、thisはmethodを呼び出しているオブジェクトを指す。

つまり、thisには何か特定の値がわりあてられているというわけではなく、その呼び出し元が実際に呼び出される時に値が確定する。

> execution contextに関連付けられたオブジェクトについて
このオブジェクトには3つのプロパティが存在する。
①variableオブジェクト(以下VO)→渡されてきた関数の引数も含む。
②スコープチェイン→現在の変数オブジェクトとその親を全て含む
③thisオブジェクト

つまり、thisキーワードは、execution contextと関連付けられている、ということ。


### functionとmethodの違い

functionとは関数宣言もしくは関数式を指す。

example();
function example() {
    console.log(this);
}

const example2 = () => {
    console.log(this);
}
example2();

どちらも、thisはWindowオブジェクトを指すはず。


var John = {
    name:'John',
    yearOfBirth:1990,
    calclateAge: function() {
        console.log(this)
    }
}

John.calclateAge(1990)

thisはJohnオブジェクトを指すはず。


var John = {
    name:'John',
    yearOfBirth:1990,
    calclateAge: function() {
        console.log(this) → Johnオブジェクト
        function innerFunction() {
            console.log(this) → Windowオブジェクト
        }
        innerFunction()
    }
}

John.calclateAge(1990)

method内で記述されたfunctionはmethodではないので、
再びthisはWindowオブジェクトになる。


var mike = {
    name: 'Mike',
    yearOfBirth: 1994
}

mike.calculateAge = John.calculateAge
mike.calculateAge()

calculateAgeは呼び出し元がmikeオブジェクトに代わった為、
thisはMikeオブジェクトを指すはず。
