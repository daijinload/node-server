module.exports = {
    mode: 'test',
    db: {
        name: 'node-server-test-db',
        host: '127.0.0.1',
        port: 27017,
        param: 'w=1&safe=true&poolSize=2&auto_reconnect=true'
    },
    logging: {
        replaceConsole: false,
        appenders: [
            {
                category: ["server", "monitor", "mongodriver"],
                type: 'console'
            }
        ],
        levels: {
            '[all]': 'TRACE'
        }
    }
};
