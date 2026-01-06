import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
        const uniqueiID = Date.now() + "-" + Math.random()
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + uniqueiID + ext)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(new Error("Format file harus JPG atau PNG!"), false)
    }
};

export const uploadAvatar = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
})