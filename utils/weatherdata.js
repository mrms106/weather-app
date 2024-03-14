const request=require("request");

const openwhetherMap={
    BASE_URL: "enter url",
    SECRET_KEY:"enter secret key"
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
