function add(a,b) {
    try {
        let answer = Number(a)+Number(b);
        // some logic which by mistake changed the answer to 10
        // answer = 10;
        
        if(Number.isNaN(answer)) {
            throw "please provide valid numbers";
        }
        return answer;
    } catch {
        return "please provide valid numbers";
    }
}

module.exports = add;



// we should write test cases which expect a certain output given an input
// 2,3 -> 5

// TDD - Test driven development