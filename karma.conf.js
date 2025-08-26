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
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Puedes agregar opciones de reportería aquí
      },
      clearContext: false // Deja el contexto de Jasmine HTML sin borrar al finalizar la prueba
    },
    jasmineHtmlReporter: {
      suppressAll: true // Oculta las pruebas que pasaron
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/your-project-name'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    },
    singleRun: true, // Esto es crucial para CI, ejecuta las pruebas una sola vez
    restartOnFileChange: true
  });
};
