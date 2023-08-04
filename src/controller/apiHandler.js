// const express=require("express");
// const router =express.Router();

// //  const logg=require("./logg")
// const login = require("../controller/logg");
// const addUser = require("../controller/adminAddUser");
// const listUser =require("../controller/listUser");

// // router.use("/log_g",logg)
// router.use("/login",login);
// router.use("/add_user",addUser);
// router.use("/list_user",listUser);

// module.exports=router;

const express = require("express");
const router = express.Router();

const login = require("../controller/logg");
const addUser = require("../controller/adminAddUser");
const listUser = require("../controller/listUser");
const deleteUser = require("../controller/deleteUser");
const updateUser = require("../controller/updateUser");
const profile = require("../controller/Profile");
const patient=require("../controller/patientAddUser");
const patientview=require("../controller/viewPatient");
const updatePatient=require("./updatePatient");
const deletePatient=require("./deletePatient");
const blood_add=require("./bloodAddUser");
const blood_view=require("./viewBlood");
const blood_update=require("./updateBlood");
const blood_delete=require("./deleteBlood");
const disblood_add=require("./disbloodAddUser");
const disblood_view=require("./viewDisblood");
const disblood_update=require("./updateDisblood");
const disblood_delete=require("./deleteDisblood");
// const bloodbank_add=require("./bloodbankAdd");
const bloodbank_view=require("./viewBloodbank");
// const bloodbank_update=require("./updateBloodbank");
// const bloodbank_delete=require("./deleteBloodbank");
const birth_add=require("./birthAdd");
const birth_view=require("./viewBirth");
const birth_update=require("./updateBirth");
const birth_delete=require("./deleteBirth");
const death_add=require("./deathAdd");
const death_view=require("./viewDeath");
const death_update=require("./updateDeath");
const death_delete=require("./deleteDeath");
const reset_password=require("./resetPass");
const list_doctor=require("./doctorList");
const interns_add=require("./addInterns");
const interns_view=require("./viewInterns");
const interns_update=require("./updateInterns");
const interns_delete=require("./deleteInterns");
const sign_up=require('./signUp');
const logg_user=require("./LoginUser");


router.use("/login", login);
router.use("/add_user", addUser);
router.use("/list_user", listUser);
router.use("/delete_user", deleteUser);
router.use("/update_user", updateUser);
router.use("/profile_user", profile);
router.use("/patient_user", patient);
router.use("/View_patient",patientview );
router.use("/update_patient",updatePatient );
router.use("/delete_patient",deletePatient );
router.use("/blood_add",blood_add );
router.use("/blood_view",blood_view);
router.use("/blood_update",blood_update);
router.use("/blood_delete",blood_delete);
router.use("/disblood_add",disblood_add);
router.use("/disblood_view",disblood_view);
router.use("/disblood_update", disblood_update);
router.use("/disblood_delete", disblood_delete);
router.use("/bloodbank_view", bloodbank_view);
// router.use("/bloodbank_update", bloodbank_update);
// router.use("/bloodbank_delete", bloodbank_delete);
router.use("/birth_add", birth_add);
router.use("/birth_view", birth_view);
router.use("/birth_update", birth_update);
router.use("/birth_delete",birth_delete );
router.use("/death_add",death_add );
router.use("/death_view",death_view );
router.use("/death_update",death_update);
router.use("/death_delete",death_delete);
router.use("/reset_password",reset_password);
router.use("/list_doctor",list_doctor);
router.use("/interns_add",interns_add);
router.use("/interns_view",interns_view);
router.use("/interns_update",interns_update);
router.use("/interns_delete",interns_delete);
router.use("/sign_up",sign_up)
router.use("/logg_user",logg_user);


module.exports = router;
