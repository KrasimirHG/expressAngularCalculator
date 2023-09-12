export interface Observer {
    operand1?: number,
    operand2?: number,
    operation?: string,
    maxDigits?: number,
    result?: number | string
  }

export interface ApiResponse {
    result?: number | string
}
