var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')

var grpc = require('grpc')

var services = require('../server/protos/dummy_grpc_pb')

function main(){

    console.log('Hello from client')

var client = new service.GreetServiceClient(
    'localhost:50051',       //invoke server through 50051             
    grpc.credentials.createInsecure()
)

//we do stuff

//req and greeting in greet.proto
var request = new greets.GreetRequest()

//created a protocol buffer greeting message
var greeting = new greets.Greeting()

greeting.setFirstName("Jerry")
greeting.setLastName("Tom")


//set the Greeting 
request.setGreeting(greeting)

//calling greet rpc method
client.greet(request, (error, response) => {

    if(!error) {

        console.log("Greeting Response:", response.getResult());

    }
    else
    {
        console.error(error);


    }


})

}

main()