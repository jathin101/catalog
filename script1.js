const fs = require('fs');

function decodeBaseValue(value, base) {
    return BigInt(parseInt(value, base));
}

function calculateLagrangeInterpolationConstant(points, k) {
    let constantTerm = BigInt(0);
    for (let i = 0; i < k; i++) {
        let { x: xi, y: yi } = points[i];
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let { x: xj } = points[j];
                term *= (-BigInt(xj)) / (BigInt(xi) - BigInt(xj));
            }
        }
        constantTerm += term;
    }
    return constantTerm;
}

function processTestCase(jsonData) {
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    const points = Object.keys(jsonData)
        .filter(key => key !== 'keys')
        .map(key => {
            const x = parseInt(key, 10);
            const base = parseInt(jsonData[key].base, 10);
            const yEncoded = jsonData[key].value;
            const y = decodeBaseValue(yEncoded, base);
            return { x, y };
        });
    const constantTerm = calculateLagrangeInterpolationConstant(points, k);
    return constantTerm.toString();
}

fs.readFile('testcase1.json', 'utf8', (err, data1) => {
    if (err) {
        console.error("Error reading testcase1.json:", err);
        return;
    }
    const jsonData1 = JSON.parse(data1);
    const result1 = processTestCase(jsonData1);
    console.log("Constant term (c) for Test Case 1:", result1);

    fs.readFile('testcase2.json', 'utf8', (err, data2) => {
        if (err) {
            console.error("Error reading testcase2.json:", err);
            return;
        }
        const jsonData2 = JSON.parse(data2);
        const result2 = processTestCase(jsonData2);
        console.log("Constant term (c) for Test Case 2:", result2);
    });
});
