
function formatDate(date){
    let formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
}



function anotherFormat(date){
    let formatedDate = new Date().toLocaleTimeString();
    return formatedDate;
}

//single function export
//module.exports = formatDate; //date-converter.js is module joh method return krrr rhi hai

//mutiple functions exported as an object
// module.exports = {formatDate,anotherFormat};

module.exports.formatDate = function(date){
    let formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
}

module.exports.anotherFormat = function(date){
    let formatedDate = new Date().toLocaleTimeString();
    return formatedDate;
}
