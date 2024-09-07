exports.name = '/genshin/list';
exports.index = async (req, res, next) => {
    try {
        const genshinList = require('./data/genshinlist.json');
        res.jsonp(genshinList);
    } catch (e) {
        res.jsonp({ error: e.message });
    }
};
