export type ValidationTypes = 'minLenght' | 'maxLenght' | 'required';
export type IValidationResponse = Partial<Record<ValidationTypes, boolean>> | undefined;

export type ValidatorFunction = (...args: any[]) => IValidationResponse;

export class Validators {
    static minLength(minValue: number) {
        return (fieldValie: string): IValidationResponse => {
            const status = fieldValie.length < minValue;
            if (status) {
                return { minLenght: true }
            }
        }
    }

    static maxLength(maxValue: number) {
        return (fieldValie: string): IValidationResponse => {
            const status = fieldValie.length >= maxValue;
            if (status) {
                return { maxLenght: true }
            }
        }
    }

    static required(fieldValie: string | number): IValidationResponse {
        if (!fieldValie) {
            return { required: true }
        }
    }
}