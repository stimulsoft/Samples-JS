/*
 * written with Mocha Framework
*/
should = require('should')
BigNumber = require('../').n

describe('BigNumber.js', function () {
    describe('#initialization', function () {
        it('should create a big number from a number', function () {
            BigNumber(517).val().should.equal("517");
            BigNumber(-517).val().should.equal("-517");
            BigNumber(BigNumber(517)).val().should.equal("517");
        }),
        it('should create a big number from an array', function () {
            BigNumber([5,1,7]).val().should.equal("517");
            BigNumber(["+",5,1,7]).val().should.equal("517");
            BigNumber(["-",5,1,7]).val().should.equal("-517");
        }),
        it('should create positive or negative numbers from string', function () {
            BigNumber(517).sign.should.equal(1);
            BigNumber(-517).sign.should.equal(-1);
        }),
        it('should create positive or negative numbers from array', function () {
            BigNumber(["+",5,1,7]).sign.should.equal(1);
            BigNumber(["-",5,1,7]).sign.should.equal(-1);
        }),
        it('should throw error at object creation', function () {
            BigNumber("51s7").val().should.equal("Invalid Number");
            BigNumber([5, 14, 7, 9]).val().should.equal("Invalid Number");
            BigNumber([5, 2, "s", 9]).val().should.equal("Invalid Number");
            BigNumber("5s17").val().should.equal("Invalid Number");
            BigNumber([5,"s",1,7]).val().should.equal("Invalid Number");
        })
    }),
    describe('#compare()', function () {
        it('should compare 2 numbers', function () {
            BigNumber(517)._compare().should.equal(0);
            BigNumber(517)._compare(5170).should.equal(-1);
            BigNumber(517)._compare(65).should.equal(1);
            BigNumber(517)._compare(925).should.equal(-1);
            BigNumber(29100517)._compare(-32500000).should.equal(1);
            BigNumber(["-",5,3,7,9,4,6])._compare(985).should.equal(-1);
            BigNumber(9773)._compare(9773).should.equal(0);
            BigNumber(199773)._compare(199774).should.equal(-1);
            BigNumber(199773)._compare(199772).should.equal(1);
            BigNumber(1)._compare(-2).should.equal(1);
            BigNumber(-24)._compare(-24).should.equal(0);
            BigNumber(-5)._compare(-4).should.equal(-1);
            BigNumber(-97)._compare(-12).should.equal(-1);
            BigNumber(-97)._compare(-102).should.equal(1);
            BigNumber(0)._compare(0).should.equal(0);
            BigNumber(97)._compare(0).should.equal(1);
            BigNumber(-97)._compare(0).should.equal(-1);
        }),
        it('should test lt (less than)', function () {
            BigNumber(517).lt(518).should.equal(true);
            BigNumber(517).lt(517).should.equal(false);
            BigNumber(517).lt(516).should.equal(false);
            BigNumber(517).lt(516).should.equal(false);
            BigNumber(517).lt(518).should.equal(true);
            BigNumber(5).lt(33).should.equal(true);
            BigNumber(-5).lt(3).should.equal(true);
            BigNumber(-5).lt(-3).should.equal(true);
            BigNumber(-5).lt(3).should.equal(true);
            BigNumber(-5).lt(-7).should.equal(false);
            BigNumber(-5).lt(-5).should.equal(false);
        }),
        it('should test lte (less or equal than)', function () {
            BigNumber(517).lte(-517).should.equal(false);
            BigNumber(517).lte(517).should.equal(true);
            BigNumber(517).lte(518).should.equal(true);
            BigNumber(-5).lte(5).should.equal(true);
            BigNumber(-5).lte(-5).should.equal(true);
            BigNumber(2).lte(-5).should.equal(false);
        }),
        it('should test equals', function () {
            BigNumber(517).equals(516).should.equal(false);
            BigNumber(-9).equals(-9).should.equal(true);
            BigNumber(-9).equals(-91).should.equal(false);
            BigNumber(517).equals(517).should.equal(true);
        }),
        it('should test gt (greater than)', function () {
            BigNumber(517).gt(517).should.equal(false);
            BigNumber(518).gt(517).should.equal(true);
            BigNumber(516).gt(517).should.equal(false);
            BigNumber(-1).gt(9).should.equal(false);
            BigNumber(-7).gt(-9).should.equal(true);
            BigNumber(0).gt(-9).should.equal(true);
            BigNumber(-1).gt(-1).should.equal(false);
            BigNumber(0).gt(0).should.equal(false);
        }),
        it('should test gte (greater or equal than)', function () {
            BigNumber(-517).gte(517).should.equal(false);
            BigNumber(517).gte(517).should.equal(true);
            BigNumber(-517).gte(517).should.equal(false);
            BigNumber(-517).gte(-517).should.equal(true);
            BigNumber(32).gte(17).should.equal(true);
            BigNumber(32).gte(33).should.equal(false);
        })
    }),
    describe('#plus()', function () {
        it('should add 2 positive numbers', function () {
            BigNumber(1).plus(0).val().should.equal("1");
            BigNumber(1).plus(1).val().should.equal("2");
            BigNumber(8).plus(8).val().should.equal("16");
            BigNumber(27).plus(73).val().should.equal("100");
            BigNumber(99).plus(10001).val().should.equal("10100");
            BigNumber(517).plus().val().should.equal("517");
            BigNumber(2).plus(BigNumber(5999)).val().should.equal("6001");
            BigNumber(517).plus(0).val().should.equal("517");
            BigNumber(517).plus(5).val().should.equal("522");
            BigNumber(517).plus(925).val().should.equal("1442");
            BigNumber(29100517).plus(925).val().should.equal("29101442");
            BigNumber([5,3,7,9,4,6]).plus(985).val().should.equal("538931");
            BigNumber(9773).plus(227).val().should.equal("10000");
            BigNumber(199773).plus(227).val().should.equal("200000");
        }),
        it('should add 2 numbers', function () {
            BigNumber(1).plus(-1).val().should.equal("0");
            BigNumber(1).plus(-7).val().should.equal("-6");
            BigNumber(1).plus(-100).val().should.equal("-99");
            BigNumber(-121).plus(-1).val().should.equal("-122");
            BigNumber(-121).plus(22).val().should.equal("-99");
            BigNumber(-121).plus(1105).val().should.equal("984");
            BigNumber(-5).plus(-99).val().should.equal("-104");
        })
    }),
    describe('#minus()', function () {
        it('should subtract 2 positive numbers obtaining a positive number', function () {
            BigNumber(5).minus().val().should.equal("5");
            BigNumber(5).minus(3).val().should.equal("2");
            BigNumber(19).minus(17).val().should.equal("2");
            BigNumber(57).minus(55).val().should.equal("2");
            BigNumber(10000).minus(9999).val().should.equal("1");
            BigNumber(10000).minus(10000).val().should.equal("0");
            BigNumber(10000).minus(-10000).val().should.equal("20000");
            BigNumber(10000).minus(999).val().should.equal("9001");
            BigNumber(10000).minus(1).val().should.equal("9999");
            BigNumber(2934).minus(999).val().should.equal("1935");
            BigNumber(19).minus(0).val().should.equal("19");
            BigNumber(10000).minus(227).val().should.equal("9773");
            BigNumber(200000).minus(227).val().should.equal("199773");
        }),
        it('should subtract 2 positive numbers obtaining a negative number', function () {
            BigNumber(5).minus(33).val().should.equal("-28");
            BigNumber(5).minus(104).val().should.equal("-99");
            BigNumber(0).minus(101).val().should.equal("-101");
        }),
        it('should subtract 2 numbers', function () {
            BigNumber(55).minus(57).val().should.equal("-2");
            BigNumber(5).minus(-33).val().should.equal("38");
            BigNumber(-5).minus(98).val().should.equal("-103");
            BigNumber(-33).minus(-5).val().should.equal("-28");
            BigNumber(-33).minus(-33).val().should.equal("0");
            BigNumber(-33).minus(-32).val().should.equal("-1");
            BigNumber(-33).minus(-34).val().should.equal("1");
            BigNumber(-5).minus(-33).val().should.equal("28");
            BigNumber(-5).minus(-3).val().should.equal("-2");
            BigNumber(-101).minus(-1010).val().should.equal("909");
            BigNumber(-5).minus(99).val().should.equal("-104");
            BigNumber(-5).minus(-15).val().should.equal("10");
        })
    }),
    describe('#multiply()', function () {
        it('should multiply 2 positive numbers', function () {
            BigNumber(5).multiply(0).val().should.equal("0");
            BigNumber(0).multiply(5).val().should.equal("0");
            BigNumber(243).multiply(1).val().should.equal("243");
            BigNumber(243).multiply(2).val().should.equal("486");
            BigNumber(5).multiply(2).val().should.equal("10");
            BigNumber(5).multiply(100).val().should.equal("500");
            BigNumber(100).multiply(5).val().should.equal("500");
            BigNumber(54325).multiply(543).val().should.equal("29498475");
            BigNumber(1).multiply(100000).val().should.equal("100000");
        }),
        it('should multiply 2 positive numbers', function () {
            BigNumber(-5).multiply(0).val().should.equal("0");
            BigNumber(-1).multiply(-1).val().should.equal("1");
            BigNumber(5).multiply(-1).val().should.equal("-5");
            BigNumber(-5).multiply(20).val().should.equal("-100");
            BigNumber(17).multiply(-12).val().should.equal("-204");
        })
    }),
    describe('#divide()', function () {
        it('should divide 2 positive numbers', function () {
            BigNumber(5).divide(0).val().should.equal("Invalid Number - Division By Zero");
            BigNumber(5).divide(1).val().should.equal("5");
            BigNumber(99).divide(5).val().should.equal("19");
            BigNumber(7321).divide(153).val().should.equal("47");
            BigNumber(919).divide(153).val().should.equal("6");
        }),
        it('should divide 2 numbers', function () {
            BigNumber(-5).divide(1).val().should.equal("-5");
            BigNumber(-5).divide(-1).val().should.equal("5");
            BigNumber(5).divide(-1).val().should.equal("-5");
            BigNumber(9).divide(2).val().should.equal("4");
            BigNumber(17).divide(5).val().should.equal("3");
            BigNumber(10).divide(2).val().should.equal("5");
            BigNumber(-50).divide(-10).val().should.equal("5");
            BigNumber(-50).divide(39).val().should.equal("-1");
            BigNumber(99).divide(5).val().should.equal("19");
            BigNumber(100).divide(5).val().should.equal("20");
            BigNumber(101).divide(5).val().should.equal("20");
            BigNumber(104).divide(5).val().should.equal("20");
            BigNumber(-17).divide(-9).val().should.equal("1");
            BigNumber(-17).divide(3).val().should.equal("-5");
            BigNumber(99).divide(-17).val().should.equal("-5");
        }),
        it('should return the division rest', function () {
            BigNumber(7321).divide(153).rest.val().should.equal("130");
            BigNumber(3).divide(2).rest.val().should.equal("1");
            BigNumber(9).divide(3).rest.val().should.equal("0");
            BigNumber(93).divide(21).rest.val().should.equal("9");
            BigNumber(100).divide(53).rest.val().should.equal("47");
        })
    }),
    describe('#mod()', function () {
        it('should return the remainder of 2 numbers division', function () {
            BigNumber(7321).mod(153).val().should.equal("130");
            BigNumber(3).mod(2).val().should.equal("1");
            BigNumber(9).mod(3).val().should.equal("0");
            BigNumber(93).mod(21).val().should.equal("9");
            BigNumber(100).mod(53).val().should.equal("47");
        })
    }),
    describe('#pow()', function () {
        it('should raise a a number to a positive integer power', function () {
            BigNumber(5).pow(0).val().should.equal("1");
            BigNumber(5).pow(1).val().should.equal("5");
            BigNumber(5).pow(4).val().should.equal("625");
            BigNumber(1).pow(200).val().should.equal("1");
            BigNumber(2).pow(2).val().should.equal("4");
            BigNumber(2).pow(3).val().should.equal("8");
            BigNumber(2).pow(4).val().should.equal("16");
            BigNumber(2).pow(5).val().should.equal("32");
            BigNumber(2).pow(6).val().should.equal("64");
            BigNumber(2).pow(10).val().should.equal("1024");
            BigNumber(2).pow(32).val().should.equal("4294967296");
            BigNumber(4).pow(3).val().should.equal("64");
            BigNumber(999999).pow(30).val().should.equal("999970000434995940027404857494593772964205852910692880044960372786493105240295422519882625422555240236493170372730045000692855852922964200593774857494027404995940000434999970000001");
        })
    }),
    describe('#isZero()', function () {
        it('should test if the big number is zero', function () {
            BigNumber(517).isZero().should.equal(false);
            BigNumber(0).isZero().should.equal(true);
            BigNumber([0]).isZero().should.equal(true);
        })
    }),
    describe('#abs()', function () {
        it('should return absolute value of number', function () {
            BigNumber(517).abs().val().should.equal("517");
            BigNumber(-517).abs().val().should.equal("517");
        })
    }),
    describe('chainable tests', function () {
        it('should test random chainable operations', function () {
            var a = 1970485694, b = 153487287;
            BigNumber(a).add(1).multiply(BigNumber(b).add(1)).multiply(BigNumber(a).add(2).add(BigNumber(b))).divide(2).val().should.equal("321191979129581791629406140");
            BigNumber(5).plus(97).minus(53).plus(434).multiply(5435423).add(321453).multiply(21).div(2).val().should.equal("27569123001");
        })
    })
})
