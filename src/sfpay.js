import md5 from 'MD5';
import {common} from './util';

export default class SFPay {
	constructor({key, spId, muchId}) {
		this.options = {sp_id: spId, much_id: muchId, partner_key: key};
	}

	static sign({params, partnerKey}) {
		let queryString = Object.keys(params)
			.filter(key => params[key] !== undefined && params[key] !== '' &&
			['pfx', 'partner_key', 'sign', 'key']
				.indexOf(key) < 0)
			.sort()
			.map(key => `${key}=${params[key]}`)
			.join('&');
		queryString = `${queryString}&key=${partnerKey}`;
		return md5(queryString).toUpperCase();
	}

	async sPay({params}) {
		const url = '/gate/wx/spay';
		return await common({url, params});
	}

	async jPay({params}) {
		const url = '/gate/wx/jpay';
		return await common({url, params});
	}
}
