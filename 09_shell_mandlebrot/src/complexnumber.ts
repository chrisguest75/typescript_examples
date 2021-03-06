export default class ComplexNumber {
    real: number
    imag: number

    constructor(real: number, imag: number) {
        this.real = real
        this.imag = imag
    }

    add(other: ComplexNumber) {
        return new ComplexNumber(this.real + other.real, this.imag + other.imag)
    }

    sub(other: ComplexNumber) {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag)
    }

    mul(other: ComplexNumber) {
        return new ComplexNumber(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        )
    }

    div(other: ComplexNumber) {
        const divisor = other.real * other.real + other.imag * other.imag
        return new ComplexNumber(
            (this.real * other.real + this.imag * other.imag) / divisor,
            (this.imag * other.real - this.real * other.imag) / divisor
        )
    }

    get abs() {
        return Math.sqrt(this.real * this.real + this.imag * this.imag)
    }

    get conj() {
        return new ComplexNumber(this.real, 0 - this.imag)
    }

    get exp() {
        return new ComplexNumber(
            Math.exp(this.real) * Math.cos(this.imag),
            Math.exp(this.real) * Math.sin(this.imag)
        )
    }
}