import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
// import { TestBed } from "@angular/core/testing";

describe("CalculatorService", () => {

    let logger: jasmine.SpyObj<LoggerService>;
    let calcSrv: CalculatorService;

    // beforeEach is a Jasmine function that runs before each test case (it block) in the describe block. 
    // It is used to set up the test environment and initialize variables or objects needed for the tests.
    beforeEach(() => {

        // jasmine.createSpyObj is a function that creates a mock object with spy functions.
        logger = jasmine.createSpyObj("LoggerService", ["log"]);
        calcSrv = new CalculatorService(logger); // Injecting the mocked LoggerService into the CalculatorService

        // Alternatively, we could use Angular's TestBed to configure the testing module and provide the mocked LoggerService:
        // TestBed.configureTestingModule({
        //     providers: [
        //         CalculatorService,
        //         { provide: LoggerService, useValue: logger }
        //     ]
        // });
        // calcSrv = TestBed.inject(CalculatorService);

    });
    
    it("should add two numbers correctly", () => {
        const result  = calcSrv.add(2, 3);
        expect(result).toBe(5);
        expect(logger.log).toHaveBeenCalledWith("Adding 2 and 3");
        expect(logger.log).toHaveBeenCalledTimes(1);
    });

    it("should multiply two numbers correctly", () => {
        const result  = calcSrv.multiply(2, 3);
        expect(result).toBe(6);
        expect(logger.log).toHaveBeenCalledWith("Multiplying 2 and 3");
        expect(logger.log).toHaveBeenCalledTimes(1);
    });
});