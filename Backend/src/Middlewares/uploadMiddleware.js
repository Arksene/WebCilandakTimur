import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedDocTypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar/;

  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  const isImageAllowed =
    allowedImageTypes.test(file.mimetype) &&
    allowedImageTypes.test(fileExtension);
  const isDocAllowed =
    allowedDocTypes.test(file.mimetype) || allowedDocTypes.test(fileExtension);

  if (isImageAllowed || isDocAllowed) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "File tidak didukung. Izinkan: gambar (jpeg, jpg, png, gif, webp) atau dokumen (pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip, rar)"
      )
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 20MB max
  },
});

export default upload;
