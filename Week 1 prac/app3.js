var async=function(){
    setTimeout(function(){log("I am coming out later althought i have been called before the next one")}, 2000)
}

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
async();
log("This is going to come out before the previous one")