let fs =require("fs");
console.log("before");
function MyFileReadPromise(filepath){
    return new Promise(function(resolve,reject){
        //aapko hmesa aise hi return krna pdega promise bnaane ke liye resolve and reject
        fs.readFile(filepath,function cb(err,data)
        {
            if(err)
            reject(err);
            else
            resolve(data);
        })
    })
}
let frp=MyFileReadPromise("f11.txt");
console.log(frp);
frp.then(function(data)
{
    console.log("data->"+data);
})
frp.catch(function(err)
{
    console.log(err);
})
console.log("After");