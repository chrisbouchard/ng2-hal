/**
 *
 */
export declare class HalError {
    status: number;
    message: string;
    constructor(status: number, message: string);
    toString(): string;
}
