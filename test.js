
let all=arr=>{
    let err= arr.map(each =>`<li class="btn-arr">${each}</li>`);
    console.log(err.join(" "));  
}
let fruits=["apple","fruit","desi fruit"];
all(fruits);