var Item = require('../models/todolist');


exports.fetch_get_Data = (req,res) => {
    Item.find({},(err,val) =>{
        if(err)
            res.json(err)

        res.render('list.ejs',{item : val})
    })
};

exports.postItem = (req,res) => {
    var item = new Item();
    item.value = req.body.newItem;
    item.updated_at = Date.now();

    item.save(function(err){
        if(err){
            res.send(err)
        }
        console.log("Inserted item "+item);
        
    })
    res.redirect('/api');
};


exports.editItem = (req,res) => {
    
    Item.findById(req.params.id,function(err,val){
        res.render('edit.ejs',{item : val, current_item:req.params.id })
    })
};

exports.updateItem = (req,res) => {
    Item.findById(req.params.id,(err,item) => {
        item.value = req.body.content;
        item.updated_at = Date.now();

        item.save(function(err){
            console.log("Item Updated "+JSON.stringify(item))
        })
    })
    res.redirect('/api');
};

exports.deleteItem = (req,res) => {
    Item.findByIdAndRemove(req.params.id,(err) =>{
        if(err){
            res.send(err)
        }
        console.log("Deleted Item")
    })
    res.redirect('/api')
};