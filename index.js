var express = require("express");
var app = express();
var monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "September", "December"];

function isNatural(val){
    var arr = val.split("%20");
    if(monthArr.indexOf(arr[0]) === -1){return false;}
    if(Number(arr[1].split(",")[0]) < 0 || Number(arr[1].split(",")[0]) > 31 ){return false;}
    if(Number(arr[2]) != arr[2] || Number(arr[2])<1970){return false;}
    return true;
}

app.use('/', express.static(__dirname + '/public/'));
app.use(function(req,res){
    if(req.url.substring(1) == Number(req.url.substring(1))){
        var date = new Date(Number(req.url.substring(1)) * 1000);
        var obj = {
            "unix": Number(req.url.substring(1)),
            "natural": monthArr[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
        }
        res.end(JSON.stringify(obj));
    } else if (isNatural(req.url.substring(1))){
        var arr = req.url.substring(1).split("%20");
        var month = arr[0];
        var year = arr[2];
        var day = arr[1].split(",")[0];
        var timeString = year + "." + (monthArr.indexOf(month) +1) + "." + day;
        var date = new Date(timeString);
        var obj = {
            "unix": date.getTime() / 1000,
            "natural": month + " " + day + ", " + year
        }
        res.end(JSON.stringify(obj));
    } else {
        var obj = {
            "unix": null,
            "natural": null
        }
        res.end(JSON.stringify(obj));
    }
    
});
app.listen(8080);