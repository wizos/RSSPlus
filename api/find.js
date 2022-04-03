require('../Ruler');

export default function handler(request, response) {
	let url;
	if(request.query){
		url = request.query.url;
	}
	if(!url && request.body){
		url = request.body.get("url");
	}

	if(!url){
		return new Response('Missing parameter: url.', {status: 500});
	}else{
		response.status(200).text("测试成功");
	}
}
