//function ,delay ,har 2 sec baad function chalega
let timerId = setInterval(()=>{
    console.log("this function runs after every 5 sec");
},5000);

//to stop set interval , ek var mai store krro 
setTimeout(()=>{
    clearInterval(timerId)
},17000);

//will print only 3 times