import { LoggerService } from './logger.service';

// Testsuite for LoggerService
describe('LoggerService', () => {
  it('should log messages to the console', () => {
    spyOn(console, 'log'); // Spy on console.log
    const message = 'Angular unit test';
    const loggerSrv = new LoggerService();
    loggerSrv.log(message);
    // assertion (expect) -> use to check if console.log was called with the expected message
    expect(console.log).withContext("Should have called only once").toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(`LOGGER LOG:${message}`);
  })
});
