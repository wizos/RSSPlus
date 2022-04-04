var path = require('path'), fs = require('fs');
var root = path.join(path.dirname(fs.realpathSync(__filename)), '../'); 
var emberjs = fs.readFileSync( root  + '/Ruler.js', 'utf8');
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
