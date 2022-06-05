const express=require('express');
const { default: mongoose } = require('mongoose');

var router=express.Router();
const employe=mongoose.model('Employess')

router.get('/',(req,res)=>{
    res.render('employe/addORedit',{
        viewTitle:"Insert Employe"
    });
});

router.post('/',(req,res)=>{
    // console.log(req.body)
    if(req.body._id=='')
    insertRecord(req,res);
    else
    updateRecord(req,res)
})


function insertRecord(req,res){
    var emp=new employe(req.body)
     employe.fullName=req.body.fullName;
     employe.email=req.body.email;
     employe.mobile=req.body.mobile;
     employe.city=req.body.city;
     employe.save((err,doc)=>{
         if(!err)
         res.redirect('employe/list');
         else{
             if(err.name==validationError){
             handleValidationError(err,req.body);
             res.render('employe/addORedit',{
                viewTitle:"Insert Employe",
                employe:req.body
            })
             }
             else
             console.log('Error during record insertion:'+err);
         }
     })

function updateRecord(req,res){
    employe.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if (!err){
            res.redirect('employe/list');
        }
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render('employe/addORedit',{
                    viewTitle:'Update Employe',
                    employe:req.body
                });
            }
            else
             console.log('Error during record update:'+err)
        }
    })
}
    }

    router.get('/list',(req,res)=>{
        employe.find((err,doc)=>{
            if(!err){
                res.render('employe/list',{
                    list: doc
                });
            }
            else{
                console.log('Error in retrieving employe list:'+err)
            }
        })
    })


    function handleValidationError(err,body){
        for(field in err.errors)
        {
            switch(err.errors[field].path){
                case 'fullName':
                    body['fullNameError']=err.errors[field].message;
                    break;
                    case 'email':
                        body['emailError']=err.errors[field].message;
                        break;
                        default:
                            break;
            }
        }
    }




router.get('/:id',(req,res)=>{
    employe.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render('employe/addORedit',{
                viewTitle:"Update Employe",
                employe:doc
            })
        }
    })
})

// delete operation
router.get('/delete/:id',(req,res)=>{
    employe.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employe/list')
        }
        else{
            console.log('Error in employe delete:'+err)
        }
    })
})


module.exports=router