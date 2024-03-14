const request=require("request");

const openwhetherMap={
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY:"843aa884e96825162af9e803fb664403"
}
const weatherData=(address,callback)=>{
    const url=openwhetherMap.BASE_URL+
    encodeURIComponent(address)+
    "&APPID="+
    openwhetherMap.SECRET_KEY;
    request({ url, json: true }, (error, data) => {
      try {
        if (error) {
          callback(true, "Unable to fetch data, Please try again. " + error);
        }
        callback(false, data?.body);
      }catch(error) {
        callback(error, null);
    }
      });
    };
    
    module.exports = weatherData;