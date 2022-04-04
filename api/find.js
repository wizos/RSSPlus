var path = require('path'), fs = require('fs');


console.log( "路径1：" + fs.realpathSync(__filename) );
console.log( "路径2：" + path.dirname(fs.realpathSync(__filename)) );
console.log( "路径3：" + path.join(path.dirname(fs.realpathSync(__filename)), '../') );
console.log( "路径4：" + path.join(path.dirname(fs.realpathSync(__filename)), '..') );


var root = path.join(path.dirname(fs.realpathSync(__filename)), '../'); 
var emberjs = fs.readFileSync( root  + 'Ruler.js', 'utf8');
eval(emberjs);


export default function handler(request, response) {
	let url;
	if(request.query){
		url = request.query.url;
	}
	if(!url && request.body){
		url = request.body.get("url");
	}

	if(!url){
		response.status(500).send("Missing parameter: url.");
	}else{
		response.status(200).send(Ruler.find(url));
	}
}
