const fs = require('fs');
const argv = process.argv;
const axios = require('axios');

// const isValidUrl = urlString=> {
//     var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
//   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
//   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
//   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
//   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
//   '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
// return !!urlPattern.test(urlString);
// }

const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

const  cat = (path, filename) => {
    fs.readFile(path, 'utf-8', function( err, data){
       if (err) {
           console.log(err);
           process.exit(1);
       }
       else if (filename) {
        fs.writeFile(filename, data, "utf-8", function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        })
       } 

       else {
        console.log(data)
       }
    })   
   }

async function webCat(url, filename) {
    axios.get(url)
    .then(res => {
        if (filename) {
            fs.writeFile(filename, res.data, "utf-8", function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            })
        }
        else {
            console.log(res.data)}
    })
    .catch( err => console.log(err))

}

if (argv[2] === "--out" ) {
    if (isValidUrl(argv[4])) {
        webCat(argv[4], argv[3])
    } else {
        cat(argv[4], argv[3])   
    }

} else {
    if (isValidUrl(argv[2])) {
        webCat(argv[2])
    } else {
        cat(argv[2])   
    }
}

