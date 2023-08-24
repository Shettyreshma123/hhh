const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");
const bcrypt=require("bcrypt");
const constants=require("../config/constants");


router.post("/", async (req, res) => {
  try {
    const { username,email,phone,gender,bloodgroup,password } = req.body;

    const encryptPassword=await bcrypt.hash(password,constants.saltRound);
	if (!username || username == "") {
		return res.status(201).send("username is required");
	  }
	//   if (!lastname || lastname == "") {
	// 	return res.status(201).send("Lastname is required");
	//   }
    if (!email || email == "") {
      return res.status(201).send("Email is required");
    }
	if (!phone || phone == "") {
		return res.status(201).send("Phone is required");
	  }
	  if (!gender || gender == "") {
		return res.status(201).send("Gender is required");
	  }
	  if (!bloodgroup || bloodgroup == "") {
		return res.status(201).send("Bloodgroup is required");
	  }
    if (!password || password == "") {
      return res.status(201).send("Password is required");
    }

    const oldEmail = await userModel.findOne({ email: email });
    if (oldEmail) {
      return res.status(202).send(" Email is already exist");
    }
    const emailpattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (
      !emailpattern ||
      emailpattern.length <= 0 ||
      emailpattern.indexOf(" ") >= 0
    ) {
      return res.status(203).send("email is invalid");
    }
	const data = await userModel.create({
		username:username,
		email: email,
		phone:phone,
		gender:gender,
		bloodgroup:bloodgroup,
		password:encryptPassword,

	  });
	//   const patientFormURL = `/patientform?firstname=${data.firstname}&lastname=${data.lastname}&email=${data.email}&phone=${data.phone}&gender=${data.gender}&bloodgroup=${data.bloodgroup}`;

	  return res.status(200).send(data);
	//   return res.redirect(`/patientform?firstname=${firstname}&lastname=${lastname}&email=${email}&phone=${phone}&gender=${gender}&bloodgroup=${bloodgroup}`);
	} catch (error) {
	  return res.status(500).send(error.stack);
	}
// 	  return res.status(200).send(data);
//   } catch (error) {
//     return res.status(500).send(error.stack);
//   }

});
module.exports=router;
