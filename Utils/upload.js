import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null , 'Uploads')
    },
    filename:function(req,file,cb){
        const uniqueSuffix   = Date.now()+'-' +Math.round(Math.random())
        cb(null , `${uniqueSuffix}-${file.originalname}`)
    }

})

export const upload=multer({storage:storage})
