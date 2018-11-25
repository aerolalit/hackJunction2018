// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
// const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const rp = require('request-promise-native')
 
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`You are talking to Dr. Omni helper. If you need help with anything keep talking.!`);
        agent.add(new Card({
         title: 'Dr OmniHelper',
         imageUrl: 'https://i.ibb.co/PNHDz3V/Doctor-512.png',
        //  imageUrl: 'https://preview.ibb.co/nOHaZq/MPLOGO-1600x1200.jpg',
             //https://i.ibb.co/LpnWqX3/mp.png
         text: `Dr. OmniHelper, here to help`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      }));
    //https://i.ibb.co/611tgBH/drblue.jpg
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

function bookticket(agent){
    console.log("bookticket");
       agent.add("I have your MobilePay on file.");
         agent.add(new Card({
         title: 'MobilePay',
         imageUrl: 'https://i.ibb.co/LpnWqX3/mp.png',
        //  imageUrl: 'https://preview.ibb.co/nOHaZq/MPLOGO-1600x1200.jpg',
             //https://i.ibb.co/LpnWqX3/mp.png
         text: `Pay with MobilePay`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      }));
      agent.add("Would you like me to use it to book the ticket?")
       
}


function orderfood(agent){
    agent.add("I have your MobilePay on file.");
    // agent.add(" Would you like me to use it to place the order?");
    agent.add(new Card({
         title: 'MobilePay',
         imageUrl: 'https://i.ibb.co/LpnWqX3/mp.png',
        //  imageUrl: 'https://preview.ibb.co/nOHaZq/MPLOGO-1600x1200.jpg',
             //https://i.ibb.co/LpnWqX3/mp.png
         text: `Pay with MobilePay`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      }));
      agent.add("Would you like me to use it to place the oder?")
    var ctx = {'name': 'testContext', 'lifespan': 5, 'parameters': {'param1':"hello", 'param2': "world"}};
    agent.setContext(ctx);
    
}

function payment(agent){
    var userPhone = +358806041406;
    var invoiceIssuer = '0cdd9443-8088-4dcb-98a3-2ca3b96abe0c';
    var data = {
    "InvoiceIssuer": invoiceIssuer,
    "ConsumerAlias": {
        "Alias": userPhone,
        "AliasType": "Phone"
    },
    "ConsumerName": "Test name",
    "TotalAmount": 10,
    "TotalVATAmount": 7,
    "CountryCode": "FI",
    "CurrencyCode": "EUR",
    "ConsumerAddressLines": [
        "Paradisæblevej 13",
        "CC-1234 Andeby",
        "Wonderland"
    ],
    "DeliveryAddressLines": [
        "Østerbrogade 120",
        "CC-1234 Andeby",
        "Wonderland"
    ],
    "InvoiceNumber": "58652",
    "IssueDate": "2018-05-03",
    "DueDate": "2019-05-11",
    "OrderDate": "2018-05-03",
    "DeliveryDate": "2018-05-06",
    "Comment": "Buy some pasta.",
    "MerchantContactName": "test",
    "MerchantOrderNumber": "859",
    "BuyerOrderNumber": "456",
    "PaymentReference": "186",
    "InvoiceArticles": [
        {
            "ArticleNumber": "456",
            "ArticleDescription": "Lorem ipsum dolor sit amet",
            "VATRate": 25,
            "TotalVATAmount": 72,
            "TotalPriceIncludingVat": 360,
            "Unit": "single",
            "Quantity": 6,
            "PricePerUnit": 60,
            "PriceReduction": 1.2,
            "PriceDiscount": 2,
            "Bonus": 5
        }
    ],
    "InvoiceUrl": "https://www.merchant.dk/invoice/"
}


}
function test(agent){
    // agent.add("making payment");
    var access_code = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyRTlDQTMxMkVBMzg1OUY4REMzNjVFNDg3OEI0MjY1Qjg5MTREOTQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJRdW5LTVM2amhaLU53MlhraDR0Q1piaVJUWlEifQ.eyJuYmYiOjE1NDMwOTU5ODcsImV4cCI6MTU0MzA5NjI4NywiaXNzIjoiaHR0cHM6Ly9hcGkubW9iaWxlcGF5LmRrL21lcmNoYW50IiwiYXVkIjoiaHR0cHM6Ly9hcGkubW9iaWxlcGF5LmRrL21lcmNoYW50L3Jlc291cmNlcyIsImNsaWVudF9pZCI6IkhhY2thdGhvbjA2Iiwic3ViIjoiMmUzY2U2OGItNDVkOC00NTQyLTkxYTQtMTE5ZTBhMDBlZmJiIiwiYXV0aF90aW1lIjoxNTQzMDg1OTg1LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIm9wZW5pZCIsImludm9pY2UiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiVXNlckVudGVyZWRDb2RlIiwiU2VydmVyUHJvdmlkZWRLZXkiXX0.kiB8IA8cOiMDac3OCFHxfiV_tH4OtjLxnEb60VZkKEtaP685Pf49edOD3vqxjJmpvlZpo17ZLNVU9xMaVLQrGGkay_UgML05-NJpoIPmKMeTkB8BxmM2aJG33do69B2_KZXZbZY7u7Enc8b-SyTpjWebmhX7q9nwTtjARklt5L_qsQVgtLSz4z4crjAH-87yJSyflsrUKEffxHcQHtoyOh7u4TXZv9eMKIksc4Za1DUb6dljfd0WP8mZp8lcv4cMeAClk5Fy6i8y2d72ID-frEtPCqoDc8RJaeebLX9f1T3ZT13L2K48r-NtmOqp6G0exPmTzwlIwOwM28bHcAeM1g";
    var options = {
    method: 'POST',
    uri: 'https://api.sandbox.mobilepay.dk/invoice-restapi/api/v1/merchants/3b8b58e0-c769-478e-9454-13dfb227f48f/invoices',
    body: {"InvoiceIssuer":"0cdd9443-8088-4dcb-98a3-2ca3b96abe0c","ConsumerAlias":{"Alias":"+358806041406","AliasType":"Phone"},"ConsumerName":"Test name","TotalAmount":360,"TotalVATAmount":72,"CountryCode":"FI","CurrencyCode":"EUR","ConsumerAddressLines":["Paradisæblevej 13","CC-1234 Andeby","Wonderland"],"DeliveryAddressLines":["Østerbrogade 120","CC-1234 Andeby","Wonderland"],"InvoiceNumber":"58652","IssueDate":"2018-05-03","DueDate":"2019-05-11","OrderDate":"2018-05-03","DeliveryDate":"2018-05-06","Comment":"Buy some pasta.","MerchantContactName":"test","MerchantOrderNumber":"859","BuyerOrderNumber":"456","PaymentReference":"186","InvoiceArticles":[{"ArticleNumber":"456","ArticleDescription":"Lorem ipsum dolor sit amet","VATRate":25,"TotalVATAmount":72,"TotalPriceIncludingVat":360,"Unit":"single","Quantity":6,"PricePerUnit":60,"PriceReduction":1.2,"PriceDiscount":2,"Bonus":5}],"InvoiceUrl":"https://www.merchant.dk/invoice/"},
    json: true, // Automatically stringifies the body to JSON
    
    headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        "accept":'application/json',
        "x-ibm-client-id": 'db21b44c-471a-459c-991b-34ec8feb363b',
        "x-ibm-client-secret":'I0wN5fR8dY1uN5qJ5pY3vL7qP4eT1xB1vJ0iR2mN4rG7aF0iE3',
        "Authorization": "Bearer " + access_code,
    }
    
};
    const food = agent.parameters['food'];
    var msg1 = "I am initiating the payment process using your MobilePay account.";
    var msg2 = "You order has been placed successfully. Now please keep calm and wait for delivery."
    rp(options)
    .then(function (parsedBody) {
       console.log("post request successful!");
    })
    .catch(function (err) {
        console.log("post request failed");
        console.log(err);
        // POST failed...
    });
    // var params = agent.getContext("testContext").parameters;
    // console.log(params);
    // var param1 = params.param1;
    //  agent.add(param1);
    console.log("ok");
    //https://i.ibb.co/yWL0Wyq/payment-successful.png
    agent.add(msg1);
     
    agent.add(msg2);
    agent.add(new Card({
         title: 'MobilePay',
         imageUrl: 'https://i.ibb.co/yWL0Wyq/payment-successful.png',
        //  imageUrl: 'https://preview.ibb.co/nOHaZq/MPLOGO-1600x1200.jpg',
             //https://i.ibb.co/LpnWqX3/mp.png
         text: `Payment Successful`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      }));
    return agent;
    // agent.add(food);
}

function paymentbook(agent){
    // agent.add("making payment");
    var access_code = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyRTlDQTMxMkVBMzg1OUY4REMzNjVFNDg3OEI0MjY1Qjg5MTREOTQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJRdW5LTVM2amhaLU53MlhraDR0Q1piaVJUWlEifQ.eyJuYmYiOjE1NDMwOTU5ODcsImV4cCI6MTU0MzA5NjI4NywiaXNzIjoiaHR0cHM6Ly9hcGkubW9iaWxlcGF5LmRrL21lcmNoYW50IiwiYXVkIjoiaHR0cHM6Ly9hcGkubW9iaWxlcGF5LmRrL21lcmNoYW50L3Jlc291cmNlcyIsImNsaWVudF9pZCI6IkhhY2thdGhvbjA2Iiwic3ViIjoiMmUzY2U2OGItNDVkOC00NTQyLTkxYTQtMTE5ZTBhMDBlZmJiIiwiYXV0aF90aW1lIjoxNTQzMDg1OTg1LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIm9wZW5pZCIsImludm9pY2UiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiVXNlckVudGVyZWRDb2RlIiwiU2VydmVyUHJvdmlkZWRLZXkiXX0.kiB8IA8cOiMDac3OCFHxfiV_tH4OtjLxnEb60VZkKEtaP685Pf49edOD3vqxjJmpvlZpo17ZLNVU9xMaVLQrGGkay_UgML05-NJpoIPmKMeTkB8BxmM2aJG33do69B2_KZXZbZY7u7Enc8b-SyTpjWebmhX7q9nwTtjARklt5L_qsQVgtLSz4z4crjAH-87yJSyflsrUKEffxHcQHtoyOh7u4TXZv9eMKIksc4Za1DUb6dljfd0WP8mZp8lcv4cMeAClk5Fy6i8y2d72ID-frEtPCqoDc8RJaeebLX9f1T3ZT13L2K48r-NtmOqp6G0exPmTzwlIwOwM28bHcAeM1g";
    var options = {
    method: 'POST',
    uri: 'https://api.sandbox.mobilepay.dk/invoice-restapi/api/v1/merchants/3b8b58e0-c769-478e-9454-13dfb227f48f/invoices',
    body: {"InvoiceIssuer":"0cdd9443-8088-4dcb-98a3-2ca3b96abe0c","ConsumerAlias":{"Alias":"+358806041406","AliasType":"Phone"},"ConsumerName":"Test name","TotalAmount":360,"TotalVATAmount":72,"CountryCode":"FI","CurrencyCode":"EUR","ConsumerAddressLines":["Paradisæblevej 13","CC-1234 Andeby","Wonderland"],"DeliveryAddressLines":["Østerbrogade 120","CC-1234 Andeby","Wonderland"],"InvoiceNumber":"58652","IssueDate":"2018-05-03","DueDate":"2019-05-11","OrderDate":"2018-05-03","DeliveryDate":"2018-05-06","Comment":"Buy some pasta.","MerchantContactName":"test","MerchantOrderNumber":"859","BuyerOrderNumber":"456","PaymentReference":"186","InvoiceArticles":[{"ArticleNumber":"456","ArticleDescription":"Lorem ipsum dolor sit amet","VATRate":25,"TotalVATAmount":72,"TotalPriceIncludingVat":360,"Unit":"single","Quantity":6,"PricePerUnit":60,"PriceReduction":1.2,"PriceDiscount":2,"Bonus":5}],"InvoiceUrl":"https://www.merchant.dk/invoice/"},
    json: true, // Automatically stringifies the body to JSON
    
    headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        "accept":'application/json',
        "x-ibm-client-id": 'db21b44c-471a-459c-991b-34ec8feb363b',
        "x-ibm-client-secret":'I0wN5fR8dY1uN5qJ5pY3vL7qP4eT1xB1vJ0iR2mN4rG7aF0iE3',
        "Authorization": "Bearer " + access_code,
    }
    
};
    const food = agent.parameters['food'];
    var msg1 = "I am initiating the payment process using your MobilePay account.";
    var msg2 = "You ticket for next train from otstranden to helsinki airport was successfully booked."
    rp(options)
    .then(function (parsedBody) {
       console.log("post request successful!");
    })
    .catch(function (err) {
        console.log("post request failed");
        console.log(err);
        // POST failed...
    });
    // var params = agent.getContext("testContext").parameters;
    // console.log(params);
    // var param1 = params.param1;
    //  agent.add(param1);
    console.log("ok");
    agent.add(msg1);
    
    agent.add(msg2);
     agent.add(new Card({
         title: 'MobilePay',
         imageUrl: 'https://i.ibb.co/yWL0Wyq/payment-successful.png',
        //  imageUrl: 'https://preview.ibb.co/nOHaZq/MPLOGO-1600x1200.jpg',
             //https://i.ibb.co/LpnWqX3/mp.png
         text: `Payment Successful`,
        //  buttonText: 'This is a button',
        //  buttonUrl: 'https://assistant.google.com/'
      }));
    return agent;
    // agent.add(food);
}

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('orderfood', orderfood );
  intentMap.set('payment',test);
  intentMap.set('paymentbook',paymentbook);
  intentMap.set('bookTicket',bookticket);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
