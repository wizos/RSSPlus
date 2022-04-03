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
		response.status(500).send("Missing parameter: url.");
	}else{
		response.status(200).send(Ruler.find(url));
		//return new Response('Missing parameter: url.', {status: 500});
	}
}
