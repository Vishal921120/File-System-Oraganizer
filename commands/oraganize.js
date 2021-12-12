
const fs = require('fs')
const path = require('path')


function organizeFn(dirpath){
    let destPath;
    // 1. first we need the path of folder on which we want to perform the function
    // so we have given the path as argument in organizeFn

    // 2. we need to check that path is given or not 
    if(dirpath== undefined){
        console.log('Please enter a directory path')
        return;
    }
    else{
        //3. Now we need to check if this path exists or not 
        let doesExist = fs.existsSync(dirpath)
        // console.log(doesExist)
        if(doesExist){
            // Create a folder for in which we have all our orgaized folders
            destPath = path.join(dirpath,'Organized folders')
            
            // destPath shouldn't be already existed , so we can do like this 
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath)
            }else{
                console.log('Folder already exists')
            }

        }
        else{
            console.log('Please enter a valid path')
        }
    }

    organizeHelper(dirpath, destPath)
}

// we wrote this organizeHelper to categorize the files
function organizeHelper(src , dest){

    let childNames = fs.readdirSync(src) // readdirSync used for folders while readfileSync for files
    // console.log(childNames) // this will return an array with all file names 

    // so we can use a for loop on this array to get the path of all files
    for(let i =0 ; i<childNames.length; i++){
        let childAddress = path.join(src , childNames[i]) // path is identified for the file 
        let isFile = fs.lstatSync(childAddress).isFile() // to identify the files

        if(isFile){
            let fileCategory = getCategory(childNames[i])
            // console.log(childNames[i] + ' belongs to ' + fileCategory)

            sendFiles(childAddress, dest , fileCategory)
    
        }
    }
}

function getCategory(names){
    let ext = path.extname(names) // will give the extensions of all files including dot
    // console.log(ext)
    // to remove dot we can use slice 
    ext = ext.slice(1)
    // console.log(ext)

    for(let type in types){
        let cTypeArr = types[type]
        // console.log(cTypeArr)

        for(let i=0; i<cTypeArr.length; i++){
            if(ext==cTypeArr[i]){
                // we matched the extension
                return type // we returned type(key) of the file 
            }
        }
    }

    return "others"

}

function sendFiles(srcFilePath , dest , fileCategory){
    let catPath = path.join(dest , fileCategory)

    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath , fileName)

    fs.copyFileSync(srcFilePath,destFilePath)
    fs.unlinkSync(srcFilePath)
}

module.exports = {
    organizeFnKey  : organizeFn
}