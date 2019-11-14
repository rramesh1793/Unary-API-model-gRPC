var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')


var grpc = require('grpc')

/* Following implements Greet RPC method */

function greet(call, callback) {

    var greeting = new greets.GreetResponse()  //from greet_pb

    greeting.setResult(
        "Hello"+call.request.getGreeting().getFirstName() + '' + call.request.getGreeting().getLastName()
    
    )

    callback(null, greeting)

}


function main(){
    var server = new grpc.Server()
    server.addService(service.GreetServiceService, {greet: greet})  // service of GreetService - GreetServiceService (refer greet_grpc_pb)

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure())
    server.start()

    console.log("Server running on port 127.0.0.1:50051")




}

main()