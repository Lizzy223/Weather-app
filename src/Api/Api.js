export default async function Api(url, method = "GET", data = null) {
	let headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};
	let baseUrl = `${process.env.REACT_APP_BASEURL}/${url}`;
	let Response;
	if (data != null) {
		Response = await fetch(baseUrl, {
			method,
			headers,
			body: JSON.stringify(data),
		});
	} else {
		Response = await fetch(baseUrl, {
			method,
			headers,
		});
	}
	Response = await Response.json();
	return Response;
}
