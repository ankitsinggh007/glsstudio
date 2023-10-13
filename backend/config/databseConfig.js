const mongoose  = require("mongoose")

const Connect=async(url)=>{
    try {
        await mongoose.connect(`${url}/Note`,{
            useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: "majority",
        j: true,
        wtimeout: 1000,
        }});
    } catch (error) {
        throw error;        
    }
}
module.exports=Connect; 