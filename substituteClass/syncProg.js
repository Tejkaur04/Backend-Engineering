function delay5Sec(){
    let prevTime = new Date().getTime();
    while(prevTime+5000 !== new Date().getTime()){

    }
}

delay5Sec();
console.log("hello world");

//will print hello world after 5 sec because it is sync prog and it will go to every line one by one
