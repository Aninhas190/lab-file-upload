const { Router } = require('express');
const postRouter = new Router();

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary')

const Post = require('./../models/post');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'file-upload-userPictures'
});

const uploader = multer({storage});

const routeGuard = require('./../middleware/route-guard');



postRouter.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('index', posts)
    })
    .catch({
      //next(error);
    })
})

postRouter.get('/post/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

postRouter.post('/post/create', routeGuard, uploader.single('photo'), (req, res, next) => {
  const { title, content } = req.body;
  const photo = req.file.url;
  const userId = req.user._id;
  Post.create({
    title,
    creatorId: userId,
    pictureUrl: photo,
    content
  })  
    .then(post => {
      res.redirect('post/show');
    })
    .catch(error => {
      //next(error);
    });
});





module.exports = postRouter;