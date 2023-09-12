import { Component } from '@angular/core';
import {CalculatorApiService} from './calculator-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
    })
export class AppComponent {
    title = 'angularCalculator';
    subText = '';
    mainText = '';
    operand1: number;
    operand2: number;
    operation = '';
    calculationString = '';
    answered = false;
    operatorSet = false;
    maxDigits = 11;

    constructor(private calculatorApiService: CalculatorApiService) {
        this.operand1 = parseFloat(this.mainText);
        this.operand2 = parseFloat(this.mainText.split(this.operation)[1]);
    }

    pressKey(key: string) {
        if (key === '/' || key === 'x' || key === '-' || key === '+') {
            const lastKey = this.mainText[this.mainText.length - 1];
            if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
                this.operatorSet = true;
            }
            if ((this.operatorSet) || (this.mainText === '')) {
                return;
            }
            this.operand1 = parseFloat(this.mainText);
            this.operation = key;
            this.operatorSet = true;
        }
        if (this.mainText.length === this.maxDigits + 1) {
            return;
        }
        this.mainText += key;
    }

    allClear() {
        this.mainText = '';
        this.subText = '';
        this.operatorSet = false;
    }

    calculate() {
        this.calculationString = this.mainText;
        this.operand2 = parseFloat(this.mainText.split(this.operation)[1]);
        this.calculatorApiService
            .calculate(this.operand1, this.operand2, this.operation, this.maxDigits)
            .subscribe((response: any) => {
                this.mainText = response.result;
                this.subText = this.calculationString;
            });
        this.answered = true;
    }
}
