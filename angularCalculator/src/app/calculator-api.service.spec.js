"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const calculator_api_service_1 = require("./calculator-api.service");
describe('CalculatorApiService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(calculator_api_service_1.CalculatorApiService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
