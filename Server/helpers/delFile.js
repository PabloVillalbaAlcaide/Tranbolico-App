const fs = require('fs');
const path = require('path');

const delFile = (name, folder) => {
    const filePath = path.join(__dirname, '../public/images', folder, name)
    fs.unlink(filePath, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("borrada ok");
        }
    })
    return
}

module.exports = delFile;