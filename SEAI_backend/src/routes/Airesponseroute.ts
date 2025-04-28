import { Router } from "express";
import { ResponseController } from "../controllers/response.controller";
import { upload } from "../utils/multer";
const router = Router();
const Aicontroller=new ResponseController();
// router.post('/getresponse', upload.single('file'), (req, res) => {
   
//     console.log('File:', req.file); 
  
//     res.json({
//       message: 'Success',
//       body: req.body,
//       file: req.file,
//     });
//   });
  
router.post('/getresponse',upload.single('file'),Aicontroller.getairesponse);
router.get('/gettest',Aicontroller.gettest);
export default router;