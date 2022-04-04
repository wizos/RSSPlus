function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

export default function handler(request, response) {
	let url;
	if(request.query){
		url = request.query.url;
	}
	if(!url && request.body){
		url = request.body.get("url");
	}

	if(!url){
		response.status(500).send("查询参数中缺少 URL 字段");
	}else{
		var path = require('path'), fs = require('fs');

		//console.log( "路径2：" + path.resolve('.', 'Ruler.js') );

		const filePath = path.resolve('.', 'Ruler.js');
		const emberjs = fs.readFileSync(filePath, 'utf8');
		//eval(emberjs);
		var Ruler = looseJsonParse(emberjs);
		console.log( "路径3：" + emberjs );

		
		response.status(200).send(Ruler.find(url));
	}
}
