const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",(req,res)=>{
    const a = req.body.first;
    const b = req.body.second;
    const c = req.body.third;

    const data = {
        members: [
        {
            email_address: c,
            status: "subscribed",
            merge_fields: {
                FNAME: a,
                LNAME: b
            }
          }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/c09bdf6d32";

    const options = {
        method:"POST",
        auth: "avinash03:993c782bce58c54ae2e91e8033b39aaa-us21"
    }

    const request = https.request(url,options,function(response){
        response.on("data",function(data){

            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html")
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }

            console.log(JSON.parse(data));
        });
    });

    // request.write(jsonData);
    request.end();

   app.post("/failure",(req,res)=>{
    res.redirect("/");
   })

})







app.listen(3000 ,()=>{   //process.env.PORT is to get the random port which will be provided ny heroku.
    console.log("Your Server has been started.");
});


//API Key of Mailchimp => 993c782bce58c54ae2e91e8033b39aaa-us21.

//c09bdf6d32 mailchimp audience id.