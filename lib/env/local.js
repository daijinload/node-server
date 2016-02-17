module.exports = {
    mode: 'local',
    monitor: {
        port: 10000
    },
    server: {
        port: 8080
    },
    db: {
        name: 'node-server-local-db',
        host: '127.0.0.1',
        port: 27017,
        param: 'w=1&safe=true&poolSize=2&auto_reconnect=true'
    },
    logging: {
        replaceConsole: false,
        appenders: [
            {
                category: 'server',
                type: 'console'
            },
            {
                category: 'monitor',
                type: 'console'
            }
        ],
        levels: {
            '[all]': 'TRACE'
        }
    }
};
