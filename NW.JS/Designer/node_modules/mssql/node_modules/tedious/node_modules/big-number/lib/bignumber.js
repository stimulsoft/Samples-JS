/*!
 * n.js -> Arithmetic operations on big integers
 * Pure javascript implementation, no external libraries needed
 * Copyright(c) 2012-2014 Alex Bardas <alex.bardas@gmail.com>
 * MIT Licensed
 * It supports the following operations:
 *      addition, subtraction, multiplication, division, power, absolute value
 * It works with both positive and negative integers
 */

;(function(exports, undefined) {

    var version = "0.3.1";

    // Helper function which tests if a given character is a digit
    var test_digit = function(digit) {
        return (/^\d$/.test(digit));
    };
    // Helper function which returns the absolute value of a given number
    var abs = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return;
        var x = new BigNumber(n, true);
        x.sign = 1;
        return x;
    };

    exports.n = function (number) {
        return new BigNumber(number);
    };

    var errors = {
        "invalid": "Invalid Number",
        "division by zero": "Invalid Number - Division By Zero"
    };
    // constructor function which creates a new BigNumber object
    // from an integer, a string, an array or other BigNumber object
    // if new_copy is true, the function returns a new object instance
    var BigNumber = function(x, new_copy) {
        var i;
        this.number = [];
        this.sign = 1;
        this.rest = 0;

        if (!x) {
            this.number = [0];
            return;
        }

        if (x.constructor === BigNumber) {
            return new_copy ? new BigNumber(x.toString()) : x;
       }

        // x can be an array or object
        // eg array: [3,2,1], ['+',3,2,1], ['-',3,2,1]
        // eg string: '321', '+321', -321'
        // every character except the first must be a digit

        if (typeof x == 'object') {
            if (x.length && x[0] === '-' || x[0] === '+') {
                this.sign = x[0] === '+' ? 1 : -1;
                x.shift(0);
            }
            for (i=x.length-1; i>=0; --i) {
                if (!this.add_digit(x[i], x))
                    return;
            }
        }

        else {
            x = x.toString();
            if (x.charAt(0) === '-' || x.charAt(0) === '+') {
                this.sign = x.charAt(0) === '+' ? 1 : -1;
                x = x.substring(1);
            }

            for (i=x.length-1; i>=0; --i) {
                if (!this.add_digit(parseInt(x.charAt(i), 10), x)) {
                    return;
                }
            }
        }
    };

    BigNumber.prototype.add_digit = function(digit, x) {
        if (test_digit(digit))
            this.number.push(digit);
        else {
            //throw (x || digit) + " is not a valid number";
            this.number = errors['invalid'];
            return false;
        }

        return this;
    };

    // returns:
    //      0 if this.number === n
    //      -1 if this.number < n
    //      1 if this.number > n
    BigNumber.prototype._compare = function(n) {
        // if the function is called with no arguments then return 0
        if (typeof n === 'undefined')
            return 0;

        var x = new BigNumber(n);
        var i;

        // If the numbers have different signs, then the positive
        // number is greater
        if (this.sign !== x.sign)
            return this.sign;

        // Else, check the length
        if (this.number.length > x.number.length)
            return this.sign;
        else if (this.number.length < x.number.length)
            return this.sign*(-1);

        // If they have similar length, compare the numbers
        // digit by digit
        for (i = this.number.length-1; i >= 0; --i) {
            if (this.number[i] > x.number[i])
                return this.sign;
            else if (this.number[i] < x.number[i])
                return this.sign * (-1);
        }

        return 0;
    };

    // greater than
    BigNumber.prototype.gt = function(n) {
        return this._compare(n) > 0;
    };

    // greater than or equal
    BigNumber.prototype.gte = function(n) {
        return this._compare(n) >= 0;
    };

    // this.number equals n
    BigNumber.prototype.equals = function(n) {
        return this._compare(n) === 0;
    };

    // less than or equal
    BigNumber.prototype.lte = function(n) {
        return this._compare(n) <= 0;
    };

    // less than
    BigNumber.prototype.lt = function(n) {
        return this._compare(n) < 0;
    };

    // this.number + n
    BigNumber.prototype.add = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return this;
        var x = new BigNumber(n);

        if (this.sign !== x.sign) {
            if (this.sign > 0) {
                x.sign = 1;
                return this.minus(x);
            }
            else {
                this.sign = 1;
                return x.minus(this);
            }
        }

        this.number = BigNumber._add(this, x);
        return this;
    };

    // this.number - n
    BigNumber.prototype.subtract = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return this;
        var x = new BigNumber(n);

        if (this.sign !== x.sign) {
            this.number = BigNumber._add(this, x);
            return this;
        }

        // if current number is lesser than x, final result will be negative
        this.sign = (this.lt(x)) ? -1 : 1;
        this.number = (abs(this).lt(abs(x))) ?
            BigNumber._subtract(x, this) :
            BigNumber._subtract(this, x);

        return this;
    };

    // adds two positive BigNumbers
    BigNumber._add = function(a, b) {
        var i;
        var remainder = 0;
        var length = Math.max(a.number.length, b.number.length);

        for (i = 0; i < length || remainder > 0; ++i) {
            a.number[i] = (remainder += (a.number[i] || 0) + (b.number[i] || 0)) % 10;
            remainder = Math.floor(remainder/10);
        }

        return a.number;
    };

    // decreases b from a
    // a and b are 2 positive BigNumbers and a > b
    BigNumber._subtract = function(a, b) {
        var i;
        var remainder = 0;
        var length = a.number.length;

        for (i = 0; i < length; ++i) {
            a.number[i] -= (b.number[i] || 0) + remainder;
            a.number[i] += (remainder = (a.number[i] < 0) ? 1 : 0) * 10;
        }
        // let's optimize a bit, and count the zeroes which need to be removed
        i = 0;
        length = a.number.length - 1;
        while (a.number[length - i] === 0 && length - i > 0)
            i++;
        if (i > 0)
            a.number.splice(-i);
        return a.number;
    };

    // this.number * n
    BigNumber.prototype.multiply = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined')
            return this;
        var x = new BigNumber(n);
        var i;
        var j;
        var remainder = 0;
        var result = [];
        // test if one of the numbers is zero
        if (this.isZero() || x.isZero()) {
            return new BigNumber(0);
        }

        this.sign *= x.sign;

        // multiply the numbers
        for (i = 0; i < this.number.length; ++i) {
            for (remainder = 0, j = 0; j < x.number.length || remainder > 0; ++j) {
                result[i + j] = (remainder += (result[i + j] || 0) + this.number[i] * (x.number[j] || 0)) % 10;
                remainder = Math.floor(remainder / 10);
            }
        }

        this.number = result;
        return this;
    };

    // this.number / n
    BigNumber.prototype.divide = function(n) {
        // if the function is called with no arguments then return
        if (typeof n === 'undefined') {
            return this;
        }
        var x = new BigNumber(n);
        var i;
        var j;
        var length;
        var remainder = 0;
        var result = [];
        var rest = new BigNumber();
        // test if one of the numbers is zero
        if (x.isZero()) {
            this.number = errors['division by zero'];
            return this;
        }
        else if (this.isZero()) {
            return new BigNumber(0);
        }
        this.sign *= x.sign;
        x.sign = 1;
        // every number divided by 1 is the same number, so don't waste time dividing them
        if (x.number.length === 1 && x.number[0] === 1)
            return this;

        for (i = this.number.length - 1; i >= 0; i--) {
            rest.multiply(10);
            rest.number[0] = this.number[i];
            result[i] = 0;
            while (x.lte(rest)) {
                result[i]++;
                rest.subtract(x);
            }
        }

        i = 0;
        length = result.length-1;
        while (result[length - i] === 0 && length - i > 0)
            i++;
        if (i > 0)
            result.splice(-i);

        // returns the rest as a string
        this.rest = rest;
        this.number = result;
        return this;
    };

    // this.number % n
    BigNumber.prototype.mod = function(n) {
        return this.divide(n).rest;
    };

    // n must be a positive number
    BigNumber.prototype.power = function(n) {
        if (typeof n === 'undefined')
            return;
        var num;
        // Convert the argument to a number
        n = +n;
        if (n === 0)
            return new BigNumber(1);
        if (n === 1)
            return this;

        num = new BigNumber(this, true);

        this.number = [1];
        while (n > 0) {
            if (n % 2 === 1) {
                this.multiply(num);
                n--;
                continue;
            }
            num.multiply(num);
            n = Math.floor(n / 2);
        }

        return this;
    };

    // |this.number|
    BigNumber.prototype.abs = function() {
        this.sign = 1;
        return this;
    };

    // is this.number == 0 ?
    BigNumber.prototype.isZero = function() {
        return (this.number.length === 1 && this.number[0] === 0);
    };

    // this.number.toString()
    BigNumber.prototype.toString = function() {
        var i;
        var x = '';
        if (typeof this.number === "string")
            return this.number;

        for (i = this.number.length-1; i >= 0; --i)
            x += this.number[i];

        return (this.sign > 0) ? x : ('-' + x);
    };

    // Use shorcuts for functions names
    BigNumber.prototype.plus = BigNumber.prototype.add;
    BigNumber.prototype.minus = BigNumber.prototype.subtract;
    BigNumber.prototype.div = BigNumber.prototype.divide;
    BigNumber.prototype.mult = BigNumber.prototype.multiply;
    BigNumber.prototype.pow = BigNumber.prototype.power;
    BigNumber.prototype.val = BigNumber.prototype.toString;
})(this);
