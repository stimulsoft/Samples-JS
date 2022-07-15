module.exports = (config, options, targetOptions) => {
    for (const rule of config.module.rules) {
        if (rule.test.test('.js')) {
            rule.exclude = [/node_modules[\\/]stimulsoft/];
            break;
        }
    }
    config.module.rules.push({
        test: /stimulsoft\.[a-z\.]+\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                ignore: [/.*/]
            }
        }
    });
  
    return config;
};