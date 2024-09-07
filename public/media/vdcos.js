exports.name = '/media/cosplay-video';
exports.index = async(req, res, next) => {
    try {
        const cos = require('./data/vdcos.json');
        var image = cos[Math.floor(Math.random() * cos.length)].trim();
        res.jsonp({
            url: image,
            count: cos.length,
            author: 'Lấy từ nhiều nguồn'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}