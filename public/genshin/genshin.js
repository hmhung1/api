// Định danh module API
exports.name = '/genshin/info';

exports.index = async(req, res, next) => {
    try {
        // Đọc dữ liệu từ tệp JSON
        const characters = require('./data/characters.json');
        const characterId = parseInt(req.query.id, 10);
        
        // Tìm kiếm nhân vật dựa trên ID
        const character = characters.find(c => c.ID === characterId);

        if (character) {
            res.jsonp({
                character,
                count: characters.length,
                author: 'Wioriz'
            });
        } else {
            res.jsonp({
                error: 'Character not found',
                count: characters.length,
                author: 'Tii enn tii'
            });
        }
    } catch (e) {
        return res.jsonp({ error: e.message });
    }
}
