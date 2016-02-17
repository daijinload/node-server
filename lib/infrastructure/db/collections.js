module.exports = [
    {
        name: 'test1',
        options: {
            ensureIndexs: [{key: {ttlTime: 1}, option: {expireAfterSeconds: 604800}}]
        }
    },
    {
        name: 'test2',
        options: {
            ensureIndexs: [{key: {ttlTime: 1}, option: {expireAfterSeconds: 604800}}]
        }
    }
];
