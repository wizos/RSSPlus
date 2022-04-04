function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

export default function handler(request, response) {
	// 由于 request.url 得到的是相对链接，所以会报错
	// const { searchParams } = new URL(request.url);
	// let url = searchParams.get('url');
	let url;
	if(request.query){
		url = request.query.url;
	}

	if(!url){
		response.status(500).send("查询参数中缺少 URL 字段");
	}else{
		const path = require('path'), fs = require('fs');

		const filePath = path.resolve('.', 'Ruler.js');
		const emberjs = fs.readFileSync(filePath, 'utf8');
		//eval(emberjs);
		console.log("查询：" + url);
		const Ruler = looseJsonParse(emberjs);
		response.status(200).json(Ruler.find(url));
	}
}
