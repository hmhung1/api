exports.name = '/media/anime-video';
exports.index = async(req, res, next) => {
    try {
        const video = require('./data/mp4anime.json');
        var image = video[Math.floor(Math.random() * video.length)].trim();
        res.jsonp({
            url: image,
            count: video.length,
            author: 'Wioriz'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}