var adder=function(first,second){
    var sum=first+second
    return sum
}

var log=function(msg){
    console.log("[Log]: ",msg)
}

log("Hello world")
log("Welcome to SIT323")
log("The sum of 5 + 6 is "+ adder(5,6))