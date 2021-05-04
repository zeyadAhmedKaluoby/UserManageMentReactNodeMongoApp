const express = require('express');
const router = express.Router();
const mongooseDB=require("../mongoose")
const{check} = require('express-validator');
const multer = require('multer');
const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'


}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{       
        cb(null,"uploads/images/");
    },
    filename:(req,file,cb)=>{
        
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,Date.now()+'.'+ext);
    }
});
router.get('/:username',mongooseDB.getUserByUsername)
router.get('/',mongooseDB.getUsers)
router.post('/register',multer({storage:storage}).single('profilePic'),[
check('username').not().isEmpty().isLength({min:3}),
check('email').not( ).isEmpty().isEmail().normalizeEmail()
],mongooseDB.addUser)
router.post('/edit/:username',multer({storage:storage}).single('profilePic'),[
check('username').not().isEmpty().isLength({min:3}),
check('email').not( ).isEmpty().isEmail().normalizeEmail()
],mongooseDB.updateUser)
router.delete('/:username',mongooseDB.deleteUser)

module.exports=router;