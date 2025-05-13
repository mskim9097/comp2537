
const { clear } = require('console');
const {readFile, writeFile, readFileSync, writeFileSync} = require('fs');

let timeStamp = new Date().toLocaleString('en-US', { 
    year: 'numeric', month: '2-digit',  day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
});

console.log(`Starting at ${timeStamp}`);

//V1
// Synchronous version (blocking)
const x = readFileSync('./t1.txt', 'utf8');
const y = readFileSync('./t2.txt', 'utf8');

console.log(`t1 contents: ${x}`);
console.log(`t2 contents: ${y}`);

writeFileSync('./t3.txt', `${timeStamp}\n${x}\n${y}`);
console.log('Done writing to t3.txt');


//V2
// Asynchronous version (non-blocking) - wrong
// This code will not work as expected because the writeFile function is called before the first and second variables are assigned values.
let first, second;
readFile('./t1.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    first = result;
});

readFile('./t2.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    second = result;
});

writeFile('./t4.txt', `${timeStamp}\n${first}\n${second}`, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Done writing to t4.txt');
});


//V3
// Asynchronous version (non-blocking) - callback hell
readFile('./t1.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    const first = result;
    readFile('./t2.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const second = result;
        writeFile('./t5.txt', `${timeStamp}\n${first}\n${second}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Done writing to t5.txt');
        });
    });
});

//V4
// Asynchronous version (non-blocking) - promises - still has callback hell
// A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
const getTextFromFile = (file) => {
    return new Promise((resolve, reject) => {
        readFile(file, 'utf8', (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};


//Play - 
// getTextFromFile('./t1rdxroinsn.txt')
// .then((result) => {  //resolved. result is the value passed to resolve
//     console.log(`V4 t1 contents: ${result}`);
// })
// .catch((err) => {  //rejected. err is the value passed to reject
//     console.log(err);
// });
// console.log('Play 1');


getTextFromFile('./t1.txt')
.then((result) => {  //resolved. result is the value passed to resolve
    console.log(`V4 t1 contents: ${result}`);
    const first = result;

    getTextFromFile('./t2.txt')
    .then((result) => { 
        const second = result;
        writeFile('./t6.txt', `${timeStamp}\n${first}\n${second}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Done writing to t6.txt');
        });
    })
    .catch((err) => {
        console.log(err);
    });

})
.catch((err) => {  //rejected. err is the value passed to reject
    console.log(err);
});

//V5
// Asynchronous version (non-blocking) - promises - chaining
// indendation is flattened by returning the promise in the then block
getTextFromFile('./t1.txt')
.then((result) => {  
    first = result;  
    console.log(`V5 t1 contents: ${result}`);
    return getTextFromFile('./t2.txt');
})
.then((result) => { 
    second = result;
    writeFile('./t7.txt', `${timeStamp}\n${first}\n${second}`, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Done writing to t7.txt');
    });
})
.catch((err) => {
    console.log(err);
});

//Unpause the recording!!

//Corey
// let filecontents = getTextFromFile('./t1.txt');
// let result = filecontents.then((result) => { console.log(`Corey - Inside .then: ${result}`); return result; });



//V6
// async/await - no more callback hell
// inside the function the await blocks until the promise is resolved or rejected
// outside the function, it is non-blocking (asynchronous)
const readFiles = async () => {
    try {
        const first = await getTextFromFile('./t1.txt'); //blocks until resolved (.then()) - throws error if rejected
        const second = await getTextFromFile('./t2.txt');
        writeFile('./t8.txt', `${timeStamp}\n${first}\n${second}`, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Done writing to t8.txt');
        });
    } catch (err) {
        console.log(err);
    }
};
readFiles();

//V7
// promisify - converts callback functions to promise-based functions
const {promisify} = require('util');
const getTextFromFile2 = promisify(readFile);
const writeTextToFile = promisify(writeFile);

const readFiles2 = async () => {
    try {
        const first = await getTextFromFile2('./t1.txt');
        const second = await getTextFromFile2('./t2.txt');
        await writeTextToFile('./t9.txt', `${timeStamp}\n${first}\n${second}`);
        console.log('Done writing to t9.txt');
    } catch (err) {
        console.log(err.path);
        console.log(err);
    }
};
readFiles2();



//V8
// Promise.all - resolves when all promises are resolved
const readFiles3 = async () => {
    try {
        const [first, second] = await Promise.all(
            [getTextFromFile2('./t1.txt'), 
             getTextFromFile2('./t2.txt')]
        );
        await writeTextToFile('./t10.txt', `${timeStamp}\n${first}\n${second}`);
        console.log('Done writing to t10.txt');
    } catch (err) {
        console.log(err);
    }
};
readFiles3();


//V9
// SetTimeout

setTimeout(() => {
    console.log('Done timer 1');
}, 2000);

//V10
// promisify setTimeout
const timer = promisify(setTimeout);
const timerFunction = async () => {
    try {
        await timer(3000);
        console.log('Done timer 2');
    } catch (err) {
        console.log(err);
    }
}
timerFunction();
 
//V11
// Nested setTimeouts
setTimeout(() => {
    console.log(' ** pineapple'); //2nd (4s)

    setTimeout(() => {
        console.log(' ** lemon'); //4th   (9s)

        setTimeout(() => {
            console.log(' ** lime'); //6th  (12s)
        }, 3000);

        console.log(' ** strawberry');  //5th  (9.000001s)
    }, 5000);

    console.log(' ** orange'); //3rd  (4.0000001s)
}, 4000);

console.log(' ** banana');  //1st (0s)
//🍌🍍🍊🍋🍓🟢

//V12
// Promise.all with setTimeout
const timerFunction2 = async () => {
    try {
        await Promise.all([timer(4000), timer(5000), timer(3000)]); //5s
        console.log('Done timer 3');
    } catch (err) {
        console.log(err);
    }
}
timerFunction2();
 
//V13
// SetInterval
let counter = 0;
const interval = setInterval(() => {
    counter++;
    console.log(`Counter: ${counter}`);
    if (counter >= 15) {
        console.log('Done counter');
        clearInterval(interval);
    }
}, 1000);


