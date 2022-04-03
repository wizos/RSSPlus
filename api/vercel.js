require('../Ruler');

export default function handler(request, response) {
	const url = request.query.url ? request.query.url : request.body.get("url");
	if(!url){
		return response = new Response('Missing parameter: url.', {status: 500});
	}else{
		response.status(200).text("测试成功");
	}
}
