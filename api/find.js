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
		response.status(500).end("Missing parameter: url.");
	}else{
		response.status(200).end("测试成功");
		//return new Response('Missing parameter: url.', {status: 500});
	}
}
