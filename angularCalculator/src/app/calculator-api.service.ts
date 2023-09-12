import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from './observerInterface';

@Injectable({
    providedIn: 'root'
    })
export class CalculatorApiService {
    private apiUrl = 'http://localhost:3000/calculate';

    constructor(private http: HttpClient) {}

    calculate(operand1: number, operand2: number, operation: string, maxDigits: number): Observable<Observer> {
        const body = {
            operand1,
            operand2,
            operation,
            maxDigits
        };

        return this.http.post<Observer>(this.apiUrl, body);
    }
}
