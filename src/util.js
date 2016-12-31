import request from 'request';
import SFPay from './sfpay';

export function generateNonceString({length}) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const maxPos = chars.length;
	let nonceStr = '';
	for (let i = 0; i < (length || 32); i++) {
		nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return nonceStr;
}

export async function reqTool({params, options}) {
	let result = null;
	try {
		await new Promise((resolve, reject) => {
			request(options, (err, response, body) => {
				if (!err) resolve(body);
				else reject(err);
			});
		}).then(docs => {
			result = docs;
		});
	} catch (e) {
		console.log(`ERROR:${e}`);
	}
	return result;
}

export function mix(...args) {
	const root = args[0];
	args.forEach(element => {
		Object.keys(element).forEach(key => {
			if (element.hasOwnProperty(key)) root[key] = element[key];
		});
	});
	return root;
}

export async function postReq({url, params}) {
	const options = {
		headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		url: `http://api.shangfudata.com${url}`,
		method: 'post',
		form: params,
		json: true
	};
	return await reqTool({params, options});
}

export async function common({url, params}) {
	params.nonce_str = params.nonce_str || generateNonceString({length: 32}); // eslint-disable-line
	mix(params, this.options);
	params.sign = SFPay.sign({params, partnerKey: this.options.partner_key}); // eslint-disable-line
	return await postReq({url, params});
}
