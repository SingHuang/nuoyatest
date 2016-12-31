# shangfu-pay
上福支付 for node.js test版本

## Usage

扫码支付
```js
var SFPay = require('shangfu-pay');

var sfpay = SFPay({
	appid: 'xxxxxxxx',
	mch_id: 'xxxxxxxxxx',
	partner_key: 'xxxxxxxxxxxxxxxxx', // 商户平台API密钥
});

sfpay.sPay{
    out_trade_no: `20161231${Math.random().toString().substr(2, 10)}`,
    body: '扫码支付测试',
    total_fee: 100,
    mch_create_ip: '127.0.0.1',
    notify_url: 'http://127.0.0.1/order/api/notify',
    time_start: '201612310629',
    time_expire: '201612310829',
    goods_tag: 'mj',
    product_id: 'qr1001'
});
```