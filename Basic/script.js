///////////////////////////////////////
// Lecture: Hoisting

// calculateAge(1990)

// function calculateAge(year) {
//     console.log(2020 -year)
// }

// // retirement(1990)

// const retirement = (year) => {
//     console.log(65 - (2020 - year))
// } 
// retirement(1990)


//variables

// console.log(age)
// var age = 23
// console.log(age)

// console.log(age)
//var age = 23


// var age = 23

// function foo() {
//     console.log(age)
//     // var age = 65
//     console.log(age)
// }


// const foo = () => {
//     var age = 65
//     console.log(age)
// }

// foo()
// console.log(age)


///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain


// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         third()
//     }
// }

// function third() {
//     var d = 'John';
//     console.log(C);
// }




///////////////////////////////////////
// Lecture: The this keyword

/*
example();
function example() {
    console.log(this);
}

const example2 = () => {
    console.log(this);
}
example2();
*/

var John = {
    name:'John',
    yearOfBirth:1990,
    calculateAge: function() {
        console.log(this)
        /*
        function innerFunction() {
            console.log(this)
        }
        innerFunction()
        */
    }
}

John.calculateAge(1990)

var mike = {
    name: 'Mike',
    yearOfBirth: 1994
}

mike.calculateAge = John.calculateAge
mike.calculateAge()




