import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';


export class PasswordValidator {
    public static passwordStrength(control: AbstractControl): ValidationErrors | null {

        const value: string = control.value || '';

        if (!value) {
            return null;
        }

        const upperCaseCharacters = /[A-Z]+/g;
        const lowerCaseCharacters = /[a-z]+/g;
        if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false) {
            return { passwordStrength: `Password must be Upper & Lower case characters.` };
        }

        return null;
    }
    public static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
