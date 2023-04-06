const http=require('http');
const fs=require('fs')
var requests = require('requests');

const homeFile=fs.readFileSync("Home.html");

const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
     temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
     temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
     temperature=temperature.replace("{%location%}",orgVal.name);
     temperature=temperature.replace("{%country%}",orgVal.sys.country);

     return temperature;



};

const server=http.createServer((req,resp)=>{
    if(req.url=='/'){

      requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=fa24c895d3a5a51cd24f642a43be806d")
      .on("data",(chunks)=>{
          const objdata=JSON.parse(chunks);
          const arrdata=[objdata];

        const realTimeData=arrdata.map((val)=>{ 
            replaceVal(homeFile,val) 
        }).join("");   

        // resp.write(realTimeData);
        console.log(realTimeData)

         resp.end();


    })
      .on("end",(err)=>{
          if(err) return console.log("connection closed due to error",err)

           resp.end();

        
        });


    }
  
})


server.listen(5500,"127.0.0.1");
