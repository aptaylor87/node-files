const fs = require('fs');
const argv = process.argv;



const  cat = (path) => {
 fs.readFile(path, 'utf-8', function( err, data){
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`${data}`)
 })   
}

cat(argv[2])