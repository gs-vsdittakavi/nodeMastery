const add = require('./sample');


describe('to test add functionality',() => {

    it('should add two numbers and give correct output for valid input', () => {
        
        let result = add(2,3);
        expect(add).toBeDefined();
        // expect(add).toHaveBeenCalledWith(2,3);
        expect(result).toBe(5);
    });


    it('should work for string numbers', () => {
        const result = add('2','3');
        expect(result).toBe(5);
    });

    test('should fail for strings other than numbers', () => {
        const result = add('test','fail');
        expect(result).toBe("please provide valid numbers");
    });




});