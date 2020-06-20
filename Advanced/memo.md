Everything is an object
→これはほぼ正しいが、100%ではない。
Javascriptには、プリミティブとオブジェクトという2つの値がある。

### プリミティブ
- Numbers、Strings、Booleans、Undefined、Null

### オブジェクト
- Array、Functions、Objects、Dates、Wrappers for Primitives...つまりプリミティブ以外。


他の言語でいうところのクラスに当たるものが、コンストラクターになる。インスタンスを作る設計図のようなもの。

Personコンストラクターから、janeオブジェクトなどが生成される。
コンストラクタも、当然オブジェクトの一つ、という位置づけ。

### 継承(inheritance)

Personコンストラクタを継承する、Athleteコンストラクタを作る。
こうすることで、AthleteコンストラクタはPersonコンストラクタのプロパティを使用できる。

### プロトタイプ

Javascriptはプロトタイプベースの言語。
プロトタイプを用いて、継承の仕組みが実現できる。
全てのJavascriptオブジェクトには、プロトタイププロパティが存在する。
このプロトタイププロパティを通じて、継承が可能となる。

### プロトタイププロパティ
personコンストラクタのprototypeプロパティをJohnインスタンスでは使用できる。
つまり、他のオブジェクトに継承させたいmethodとプロパティは、プロトタイププロパティに配置する必要がある。(重要！)

Personコンストラクタのプロトタイプは、あくまでpersonコンストラクタのものであり、
それを継承するJohn自身のプロトタイプではない。
継承するPersonコンストラクタのプロトタイププロパティを通じて、継承しているにすぎない。

### プロトタイプチェイン

Personオブジェクト(コンストラクタ)を元に、Johnインスタンスを作成することができるが、
PersonオブジェクトはObjectオブジェクトのインスタンスでもある。

つまり、今までに作成した全てのオブジェクトは、Objectコンストラクタのインスタンスだということ。
Personオブジェクトは、Objectオブジェクトのメソッド、プロパティを呼び出すことができる。
Johnオブジェクトは、Personオブジェクト、Objectオブジェクトのメソッド、プロパティを呼び出すことができる。

この仕組みをプロトタイプチェインという。

特定のメソッド、プロパティにアクセスしようとすると、まずは現在のオブジェクトを探し、
なければその上位のオブジェクトを参照する。
最終的にObjectオブジェクトにもなければ、プロトタイプチェーンの最後のリンクであるNULL(プロトタイプを持たない唯一の存在)を参照し、Undefinedが返される。

### まとめ

- 全てのJavascriptオブジェクトはプロトタイププロパティを持つ
- プロトタイププロパティは、他のオブジェクトに継承させたいメソッド、プロパティを置く場所。
- コンストラクタのプロトタイププロパティは、コンストラクタ自身のプロトタイプではなく、そのコンストラクタから生成されるインスタンスのプロトタイプである。


### 実装例

普通にjohnオブジェクトを作る場合
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}


Personコンストラクタ関数を通じてjohnオブジェクトを作る場合
var Person(※コンストラクタは大文字始まりにする) = function(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
}

var john = new Person('John', 1990, 'teacher')

コンストラクタ関数はmethodではない為、this.nameのthisはグローバルオブジェクトとなるはず。
しかし、new演算子を使って、Personの空のインスタンスを作ることで、thisが指すものがグローバルオブジェクトからPersonの空のオブジェクトに変化した。

その為、最初にjohnオブジェクトを作る方法と、コンストラクタを通じてjohnオブジェクトを作る方法は、全く同じになる。

PersonオブジェクトにcalculateAgeメソッドを追加すると、
JohnオブジェクトからcalculateAgeメソッドが呼び出せるようになる。

var Person = function(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
    this.calculateAge = () => {
        console.log(2020 - this.yearOfBirth)
    }
}

しかし、コンストラクタで定義すると、（インスタンスごとに）複数回作成されるため、複数回作成する必要があるため、メモリを多く消費し、パフォーマンスが低下する。

Person.prototype.calculateAge = function() {
    console.log(2020 - this.yearOfBirth)
}


メソッドがプロトタイプで定義されると、そのメソッドは1回だけ作成され、すべてのインスタンスがこのメソッドにアクセスして、プロトタイプチェーンを作成します。


Person.prototype.calculateAge = () => {
    console.log(2020 - this.yearOfBirth)
}

アロー関数ではthisキーワードが取得できないので、この書き方ではダメ。

https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/5869182#questions/9891114

### コンソールでの確認方法

johnオブジェクトを見ると、__proto__の中に
prototypeで継承したcalculateAgeとlastNameが含まれている。
Personのプロトタイププロパティが、Personではなくインスタンスのプロトタイプになる、ということが確認できる。

john.__proto__ === Person.prototype
>true

john.__proto__の中にさらに__proto__が存在するが、
これはObjectオブジェクトを指す。


### Object Createメソッド

var personProto = {
    calculateAge: function() {
        console.log(2020 - this.yearOfBirth)
    }
}

var john = Object.create(personProto)
john.name = 'John'
john.yearOfBirth = 1990
john.job = 'teacher'

var jane = Object.create(personProto, 
    {
        name: {value: 'Jane'},
        yearOfBirth: {value: 1969},
        job: {value: 'teacher'}
    }
)

objectを生成するには、コンストラクタ関数を使うか、Object.createを使う方法がある。

基本的にコンストラクタ関数の方がよく利用されるが、
Object.createは、プロトタイププロパティを直接していするので、継承関係が分かりやすいメリットがある。
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

### プリミティブとオブジェクトの違い

関数の引数にプリミティブな変数を渡しても、コピーが作成されるだけで、外側の変数には影響を与えない。
知らないと思わぬバグにつながったりするので、注意。


var age = 27;
function change(a) {
    a = 30;
}
change(age)
console.log(age) → 27

var obj = {
    age: 27
}
function changeObj(b) {
    b.age = 30;
}
changeObj(obj)
console.log(obj.age) → 30



### 第一級関数について

おさらい
- ファンクションはオブジェクト型
- ファンクションは変数に入れられる
- ファンクションは他のファンクションの引数にできる
- ファンクションからファンクションを返すことができる

コールバック関数
バック＝後でコールされる関数の事。


### IIFE

普通の書き方

関数宣言し、呼び出す。
function game() {
    var score = Math.random() * 10
    console.log(score >= 5)
}
game()

呼び出しを書かなくても関数が実行される方法→IIFE

即時に実行される関数式のこと。

()で囲まれていれば、関数宣言とは判断されないので、functionの後に名前を付けなくてもよい。
(function () {
    var score = Math.random() * 10
    console.log(score >= 5)
})()

ダメなパターン
function () {
    var score = Math.random() * 10
    console.log(score >= 5)
}

以下のようにすれば、引数を渡すことも可能
(function (goodLuck) {
    var score = Math.random() * 10
    console.log(score >= 5 - goodLuck)
})(5)


IIFEは変数にわりあてられていないので、一度しか呼び出す必要のない関数に対して使用すべき。IIFEは外側のスコープとは完全に隠されているため、安全に変数を配置できる。


### クロージャ
ある関数の内部で呼び出された関数は、外部関数の変数やパラメータにいつでもアクセス可能。
(たとえ、外部関数がreturn済であっても)

これは、Execution stackとスコープチェインの動きが異なることが理由。retirementの実行が完了しfunctionがreturnされた後、Execution stackからretirement()は消える。
しかし、この時retirement()に紐づいていた変数はスコープチェインに残り続ける。


function retirement(retirementAge) {
    var a = ' years left until retirement.'
    return function(yearsOfBirth) {
        var age = 2020 - yearsOfBirth;
        console.log((retirementAge - age) + a)
    }
}

var retirementUS = retirement(66)
retirementUS(1990)
