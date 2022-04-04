var path = require('path'), fs = require('fs');
const logger = require('@/utils/logger');


var root = path.join(path.dirname(fs.realpathSync(__filename)), '../'); 
var emberjs = fs.readFileSync( root  + '/Ruler.js', 'utf8');
eval(emberjs);

logger.info( "路径1：" + fs.realpathSync(__filename) );
logger.info( "路径2：" + path.dirname(fs.realpathSync(__filename)) );

logger.info( "路径3：" + path.join(path.dirname(fs.realpathSync(__filename)), '../') );
logger.info( "路径4：" + path.join(path.dirname(fs.realpathSync(__filename)), '..') );

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
