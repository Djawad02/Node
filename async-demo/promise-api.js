// const p = Promise.reject(new Error("reason of error..."))
// p.catch(err => console.log(err))

const p1 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("Async operartion 1");
        resolve(1)
    },2000)
})
const p2 = new Promise((resolve)=>{
    setTimeout(()=>{
        console.log("Async operartion 2");
        resolve(2)
    },2000)
})

Promise.race([p1,p2])
 .then(res => console.log(res))
 .catch(err =>console.log(err.message))