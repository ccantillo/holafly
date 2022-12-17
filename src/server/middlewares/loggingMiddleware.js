const loggingMiddleware = (db) =>
    async (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const header = JSON.stringify(req.headers);
        const action = req.originalUrl;

        await db.logging.create({ip, header, action});

        next();
    }

module.exports = loggingMiddleware;