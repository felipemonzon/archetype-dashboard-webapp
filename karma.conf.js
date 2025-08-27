// Archivo de configuración de Karma
// Para más información, visita: https://karma-runner.github.io/latest/config/configuration-file.html

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false, // Ejecuta las pruebas en orden secuencial
      },
      clearContext: false // Deja el contexto de Jasmine HTML sin borrar al finalizar la prueba
    },
    jasmineHtmlReporter: {
      suppressAll: true // Oculta las pruebas que pasaron
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/archetype-dashboard-webapp'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.'}
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome','ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-setuid-sandbox',
          '--remote-debugging-port=9222',
          '--disable-dev-shm-usage'
        ]
      }
    },
    singleRun: true, // Esto es crucial para CI, ejecuta las pruebas una sola vez
    restartOnFileChange: true
  });
};
