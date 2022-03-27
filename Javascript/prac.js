/* async function func(){
    let myPromise = new Promise((resolve, reject) => {
        let i = 0;
        let interval = setInterval(() => {
            i += 1;
            console.log("In func : " + i);

            if (i == 5)
                resolve(interval);
        }, 2000);
    });

    let interval = await myPromise;
    clearInterval(interval); */

    /* let myPromise2 = new Promise((resolve) => {
        let i = 0;
        let interval = setInterval(() => {
            i += 1;
            console.log("In func2 : " + i);

            if (i == 5)
                resolve(interval);
        }, 2000);
    })

    interval = await myPromise2;
    clearInterval(interval);
} */

/* async function func1(){
    let i = 0;
    let myPromise = new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            i += 1;

            console.log("In func1 : " + i);

            if (i == 5)
                resolve(interval);
        }, 2000);
    });

    let interval = await myPromise;
    clearInterval(interval);
}

async function func2(){
    await func();
    console.log("function over! Now starting function2");
    await func1();
}

func2(); */

var v = 5;

function func(){
    v = 7;

    console.log("Inside function v = " + v);
}

func();

console.log("Outside function v = " + v);

