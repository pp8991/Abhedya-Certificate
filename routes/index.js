const express = require('express');
const router = express.Router();
const upload = require('./upload');
const Photos = require('../models/Photos');

/* Get home Page */
router.get('/', async (req, res) =>{
    const photo = await Photos.find();
    res.render('index', {title: 'Abhedya Certificate', msg:req.query.msg, photo: photo});
});

/* POST a image */
router.post('/upload', async (req, res) =>{
    upload(req, res, (error) =>{
        if(error){
            res.redirect('/?msg=3');
        }else{
            if(req.file === undefined){
                res.redirect('/?msg=2');
            }else{
                /**
                * Create new record in mongoDB
                */
                 var fullPath = "files/"+req.file.filename;

                 var document = {
                   path:     fullPath, 
                   name:   req.body.name
                 };
               var photo = new Photos(document);
               photo.save(function(error){
                   if(error){
                       throw error;
                   }
                   res.redirect('/?msg=1')
               });
            }
        }
    });
});

/*GET a cartificate */
router.get('/certificate/:name', async (req, res) =>{
    const photo = await Photos.findOne({ name: req.params.name});
    const newpath = '/'+photo.path;
    res.render('certificate', { path:newpath, name:photo.name});
});

module.exports = router;