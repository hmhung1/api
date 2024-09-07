const axios = require('axios');

exports.name = '/info/ff';
exports.index = async (req, res, next) => {
    try {
        const uid = req.query.uid;

        if (!uid) {
            return res.jsonp({ error: 'Vui lòng cung cấp UID.' });
        }
        const apiUrl = `https://api.scaninfo.vn/freefire/info/?id=${uid}&key=7iKFiB`;

        const response = await axios.get(apiUrl);

        if (response.data) {
            return res.jsonp(response.data);
        } else {
            throw new Error('Dã có lỗi xảy ra.')
        }
    } catch (e) {
        console.error(e);
        res.jsonp({ error: e.message });
    }
};
