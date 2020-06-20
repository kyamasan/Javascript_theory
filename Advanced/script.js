// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// }

// var Person = function(name, yearOfBirth, job) {
//     this.name = name
//     this.yearOfBirth = yearOfBirth
//     this.job = job
//     this.calculateAge = () => {
//         console.log(2020 - this.yearOfBirth)
//     }
// }

// Person.prototype.calculateAge = function() {
//     console.log(2020 - this.yearOfBirth)
// }

// Person.prototype.lastName = 'Smith'


// var john = new Person('John', 2000, 'teacher')
// var jane = new Person('Jane', 1969, 'designer')
// var mark = new Person('Mark', 1948, 'retired')


// john.calculateAge()

//object create

// var personProto = {
//     calculateAge: function() {
//         console.log(2020 - this.yearOfBirth)
//     }
// }

// var john = Object.create(personProto)
// john.name = 'John'
// john.yearOfBirth = 1990
// john.job = 'teacher'

// var jane = Object.create(personProto, 
//     {
//         name: {value: 'Jane'},
//         yearOfBirth: {value: 1969},
//         job: {value: 'teacher'}
//     }
// )

// var age = 27;
// var obj = {
//     age: 27
// }

// function change(a) {
//     a = 30;
// }
// function changeObj(b) {
//     b.age = 30;
// }

// change(age)
// console.log(age)
// changeObj(obj)
// console.log(obj.age)


// function game() {
//     var score = Math.random() * 10
//     console.log(score >= 5)
// }
// game()


// (function () {
//     var score = Math.random() * 10
//     console.log(score >= 5)
// })();

// (function (goodLuck) {
//     var score = Math.random() * 10
//     console.log(score >= 5 - goodLuck)
// })(5);


function retirement(retirementAge) {
    var a = ' years left until retirement.'
    return function(yearsOfBirth) {
        var age = 2020 - yearsOfBirth;
        console.log((retirementAge - age) + a)
    }
}

var retirementUS = retirement(66)
retirementUS(1990)