// const express = require("express");
// const router = express.Router();
// // const userModel = require("../models/User");
// // const constants=require("../config/constants");
// const authentication=require("../middleware/authentication");
// const login = require("../models/login");


// router.get("/", authentication,async (req, res) => {
// 	try {
// 		let data=await userModel.find();
// 		data= data.map((item)=>{
// 			return{
// 				username:item.username,
// 				email:item.email,
// 				phone:item.phone,
// 				password:item.password,
// 				role:item.role,
// 			};
// 			});

// 		return res.status(200).send(data);
	
// 	}
// catch (error) {
//     return res.status(500).send(error.stack);
//   }
// });
// module.exports=router;


const express = require("express");
const router = express.Router();
const userModel = require("../models/login");
const authenticate = require("../middleware/authentication");
const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    let data = await userModel.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
        email: item.email,
        phone: item.phone,
        address:item.address,
        image:constants.imagePath+item.image,
        password:item.password,
        role: item.role,
      
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
