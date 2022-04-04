function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

export default function handler(request, response) {
	const { searchParams } = new URL(request.url);
    let url = searchParams.get('url');
    
	if(!url){
		response.status(500).send("查询参数中缺少 URL 字段");
	}else{
		const path = require('path'), fs = require('fs');

		const filePath = path.resolve('.', 'Ruler.js');
		const emberjs = fs.readFileSync(filePath, 'utf8');
		//eval(emberjs);
		console.log("请求：" + url);
		const Ruler = looseJsonParse(emberjs);

		response.status(200).send(Ruler.find(url));
	}
}
