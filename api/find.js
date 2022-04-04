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
		var path = require('path'), fs = require('fs');

		console.log( "路径1：" + fs.realpathSync(__filename) );
		console.log( "路径2：" + path.resolve('.', 'Ruler.js') );
		console.log( "路径3：" + path.join(path.dirname(fs.realpathSync(__filename)), '../') );

		const filePath = path.resolve('.', 'Ruler.js');
		const emberjs = fs.readFileSync(filePath, 'utf8');
		eval(emberjs);

		
		response.status(200).send(Ruler.find(url));
	}
}
