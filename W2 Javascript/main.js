"use strict";
/* jshint browser: true, devel: true, globalstrict: true */


// OUTPUT TEST
// ===========
//
// I've provided a version of the "out" function for your convenience.
// You can use it for debugging and testing your answers.
//
out("hello", "world", [1, 2, [3, 4], 5], 6, "..testing");
out("");

/*
Stay within this 72 character margin, to keep your code easily readable
         1         2         3         4         5         6         7
123456789012345678901234567890123456789012345678901234567890123456789012
*/


// EXERCISES
// =========
//
// Complete the exercises below,
// subject to the following important (and highly artifical) constraint:
//
//
// * YOU MAY NOT USE ANY FUNCTIONS THAT YOU DIDN'T WRITE YOURSELF!
//
// This means that you can't use any built-in functions such as:
//   abs, split, join, push, sort, charAt (or any others!)
//
// If you use such a function in your answer, you'll get 0 points for it,
// so be careful about this.
//
// You may not use any RegExp literals either. Same penalty applies.
//
//
// You can, however, use "operators" such as + - * / % [] etc.
// You can also use the "length" property of strings and arrays
//
//
// BTW: The purpose of the constraint is to force you to implement your
// own (tiny) algorithms here, and to encourage you to explore the core
// facilities of JavaScript.
//
// ...it should also help to deter obvious "google-solving". ;-)
//
//
// NB: You must use the function names exactly as provided.
//     (Our testing relies on them)
//
//
// ALLOWABLE ASSUMPTIONS:
//
// * You may assume that parameters to your functions will be of the
//   "expected" types, and do not have to check for this.
//
// TIPS:
//
// * Remember to save regularly (either by Updating your fiddle), or
//   by copying your work-in-progress into the clipboard or similar.
//   This should protect you in the event of an infinite-loop bug or
//   some other browser-borking mishap.
//
// * The JSHint option is a good way of catching syntax errors and
//   even some coding errors (such as the use of undeclared vars).
//   It puts a little red dot to the left of each offending line,
//   and explains the problem on mouse-over. This is easier, and
//   more line-number aware, than relying on runtime error messages
//   in the console.
//
// * Some of you might know about the "in" operator, but don't use it!
//   It doesn't guarantee any sensible ordering, and it goes over every
//   enumerable property in the whole prototype chain, which is often
//   not what you want. The marking script may penalise you for this,
//   even if you appear to get correct results in your local testing.


// ABSOLUTE VALUE
// --------------
//
// Return the absolute value of the given `number`
// e.g. abs(3) === 3; abs(-4.9) === 4.9
//
// MARKING: 1 point
//
function abs(number) {
    return numer > 0 ? number : -number;
}


// MAXIMUM OF TWO
// --------------
//
// Return the maximum of the numbers `a` and `b`
// e.g. maxOfTwo(-2, 9.1) === 9.1; maxOfTwo(10, 10) === 10
//
// MARKING: 1 point
//
function maxOfTwo(a, b) {
    return a > b ? a : b;
}


// MAXIMUM OF THREE
// ----------------
//
// Return the maximum of the numbers `a`, `b` and `c`
//
// MARKING: 1 point
//
function maxOfThree(a, b, c) {
    var max = a;
    if (b > max) max = b;
    if (c > max) max = c;

    return max;
}


// MEDIAN OF THREE
// ---------------
//
// Return the median (ordered middle value) of the given numbers
// e.g. medOfThree(2,1,9) === 2
//
// MARKING: 2 points
//
function medOfThree(a, b, c) {
    var max = maxOfThree(a, b, c);
    if (a === max) return maxOfTwo(b, c);
    if (b === max) return maxOfTwo(a, c);
    if (c === max) return maxOfTwo(a, b);
}


// TEST FOR PRIMALITY
// ------------------
//
// Return `true` if `integer` is prime, otherwise `false`
//
// "A prime number is a natural number greater than 1 that has
// no positive divisors other than 1 and itself."
// --- http://en.wikipedia.org/wiki/Prime_number
//
// You may assume that `integer` is, indeed, an integer.
// You may not assume anything else about it!
//
// MARKING: 3 points for correctness
// EXTRA:   try for efficiency (hint: sqrt without sqrt)
//
function isPrime(integer) {
    if (integer < 2) {
        return false;
    }

    var i = 2;
    while (i * i <= integer) {
        if (integer % i === 0) {
            return false;
        }
        i++;
    }
    return true;
}


// STRING REVERSAL
// ---------------
//
// Return a reversed version of the given string, `str`
// e.g. reverseString("doogyrev") === "verygood"
//
// You do not have to worry about full Unicode support.
// The test strings will be within the standard ASCII range.
//
// BTW: The constraints of this exercise may force you into an inefficient
// (but simple) solution. Don't worry about the inefficiency.
//
// MARKING: 2 point
//
function reverseString(str) {
    var rev = "";
    for (var i = str.length - 1; i >= 0; i--) {
        rev += str[i];
    }
    return rev;
}


// PUNCTUATION
// -----------
//
// Return `true` if the given `char` is punctuation (by our rather
// limited definition below), otherwise return `false`.
//
// The characters on the next line define our set of "punctuation" (not including the space):
// ,!.:;/()
//
// MARKING: 1 point
//
function isPunct(chr) {
    var p = [',', '!', '.', ':', ';', '/', '(', ')'];
    for (var i = 0; i < p.length; i++) {
        if (chr === p[i]) {
            return true;
        }
    }
    return false;
}


// EXTRACT WORDS
// -------------
//
// Return an ordered array of "words", extracted from the given string.
//
// We define a "word" as being a contiguous sequence of characters
// which are neither "punctuation" (as defined above) nor spaces.
//
// e.g.
//
// extractWords("Words, words. They're all we have to go on.")
// returns ["Words","words","They're","all","we","have","to","go","on"]
//
// extractWords("   All work and noplay,  makws Jacka dul; boy")
// returns ["All","work","and","noplay","makws","Jacka","dul","boy"]
//
// NB: If you are writing your own tests, remember that sensible
//     equality-testing with arrays is non-trivial in JavaScript.
//     (So you might want to write a helper function to do it.)
//
// MARKING: 3 points
//
function extractWords(str) {
    var res = [],
        index = 0,
        u = 0;

    for (var i = 0; i < str.length; i++) {
        if (!isPunct(str[i]) && str[i] !== ' ') {
            u++ ? res[index] += str[i]: res[index] = str[i];
        } else {
            if (u) index++;
            u = 0;
        }
    }
    return res;
}


// DECODE MNEMONIC
// ---------------
//
// Return a string which describes the length of each of the words
// in the given string. (Using our previous definition of "word").
//
// e.g.
//
// decodeMnemonic(
//    "Supercalifragilisticexpialidocious! " +
//    "Pneumonoultramicroscopicsilicovolcanoconiosis") === "3445"
//
// decodeMnemonic(
//    "Now I need a drink, alcoholic of course, " +
//    "after the heavy lectures!") === "314159265358"
//
// decodeMnemonic(
//    "Now I, even I, would celebrate in rhymes inept, " +
//    "the great immortal Syracusan (rivaled nevermore!) " +
//    "who in his wondrous lore, passed on before, " +
//    "gave men his guidance how to circles mensurate.") ===
//    "3141592653589793238462643383279"
//
// REFERENCE: http://www.exploratorium.edu/pi/history_of_pi/
//
// Unfortunately, reasons of space prevent me from including this
// one directly: http://www.cadaeic.net/naraven.htm
//
// HINT: Sometimes implicit type-conversion is your friend!
//
// MARKING: 2 points
//
function decodeMnemonic(str) {
    var arr = extractWords(str);
    var len = "";

    for (var i = 0; i < arr.length; i++) {
        len += arr[i].length;
    }
    return len;
}


// HELPER FUNCTIONS
// ================

// Output to console, and to my special "output" element.
function out( /* args */ ) {
    var args = arguments;
    console.log.apply(console, args);

    var strs = [];
    for (var i = 0; i < args.length; ++i) {
        var thing = args[i];
        if (typeof(thing) === "object") {
            thing = JSON.stringify(thing);
        }
        strs.push(thing);
    }
    var line = strs.join(" ") + "<br/>";

    document.getElementById("output").innerHTML += line;
}
