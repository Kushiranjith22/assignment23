const fs = require("fs");

function main() {
    const testCase1 = JSON.parse(fs.readFileSync("testcase1.json", "utf-8"));
    const testCase2 = JSON.parse(fs.readFileSync("testcase2.json", "utf-8"));

    console.log("Secret for Test Case 1: " + findConstantTerm(testCase1).toString());
    console.log("Secret for Test Case 2: " + findConstantTerm(testCase2).toString());
}

function findConstantTerm(json) {
    const k = json.keys.k;
    const xValues = [];
    const yValues = [];

    // Decode x and y values
    for (const key in json) {
        if (key !== "keys") {
            const x = BigInt(key);
            const { base, value } = json[key];
            const y = BigInt(parseInt(value, parseInt(base)));
            xValues.push(x);
            yValues.push(y);
        }
    }

    // Perform Lagrange Interpolation
    return lagrangeInterpolation(xValues, yValues, k);
}

function lagrangeInterpolation(x, y, k) {
    let constantTerm = BigInt(0);

    for (let i = 0; i < k; i++) {
        let term = y[i];

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const numerator = BigInt(0) - x[j];
                const denominator = x[i] - x[j];
                term = (term * numerator) / denominator;
            }
        }

        constantTerm += term;
    }

    return constantTerm;
}

main();
