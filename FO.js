// Please go through readme file to know more about the project

const fs = require('fs')
const path = require('path')
const treeObj = require('./commands/tree')
const organizeObj = require('./commands/oraganize')
const helpObj = require('./commands/help')

let inputArr = process.argv.slice(2) // slice is used to ignore first 2 indexes 
// console.log(inputArr)

let command = inputArr[0] // organize ,help, tree , default

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","pptx","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg","msi", "pkg","lnk", "deb"],
    image: ["png","jpeg"],
  };

switch(command){
    case 'tree' : treeObj.treeFnkey(inputArr[1])
        break;
    case 'organize' : organizeObj.organizeFnKey(inputArr[1])
        break;
    case 'help' : helpObj.helpfnkey()
        break;
    default :
        console.log('Please enter a valid command')
        break;
}








