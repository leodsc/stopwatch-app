export const useFetch = async (path, method, data) => {
	const options = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: data,
	};
	try {
		const response = await fetch(path, options);
		const result = await response.text();
		if (response.status < 200 || response.status > 299) {
			throw new Error(result);
		} else return { content: result, type: "ok" };
	} catch (e) {
		return { content: e.message, type: "error" };
	}
};
