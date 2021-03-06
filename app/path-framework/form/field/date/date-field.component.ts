import {Component, Input, Output, ElementRef} from '@angular/core';
import {FormFieldLabelComponent} from './../form-field-label.component';
import {ValueField} from "../value-field";
import {IForm} from "../../../pathinterface";
import {TranslationService} from "../../../service/translation.service";
import * as moment from "moment";

@Component({
    selector: 'path-datefield',
    templateUrl: 'date-field.component.html'
})
export class DateFieldComponent {
    @Input('field')
    @Output('field')
    field:DateField;
}

export class DateField extends ValueField<Date> {

    private _isDatePickerVisible:boolean = false;
    private _formattedValue:string;
    private _datePickerValue:Date;

    constructor(protected form:IForm, protected translationService:TranslationService) {
        super(form, translationService);
    }

    public setValue(value:Date) {
        if (typeof value === "string") {
            value = moment(value).toDate();
        }
        if (value != null && Object.prototype.toString.call(value) === "[object Date]") {
            // it is a date
            if ( isNaN( value.getTime() ) ) {
                value = null;
            } else {
                // cut off local timezone
                value = new Date(value.toDateString() + ' 00:00:00 GMT');
            }
        }
        else {
            value = null;
        }
        super.setValue(value);
        this._datePickerValue = value;
        this.formatDate();
    }

    public updateValueFromGui(value:string) {
        let dateValue:Date = moment(value, "DD.MM.YYYY").toDate();
        this.setValue(dateValue);
    }

    public toggleDatePicker() {
        if (!this._isDatePickerVisible) {
            let date = moment(this.value);
            if(date == null || !date.isValid()) {
                this.setValue(new Date());
            }
        }
        this._isDatePickerVisible = !this._isDatePickerVisible;
    }

    public closeDatePicker() {
        this._isDatePickerVisible = false;
        // need to wait for updated model
        window.setTimeout(() => {
            this.setValue(this._datePickerValue);
            this.formatDate();
        }, 1);
    }

    private formatDate() {
        this._formattedValue = "";
        if (this.value != null) {
            try {
                this._formattedValue = new Intl.DateTimeFormat().format(this.value);
            } catch (e) {
                console.log("failed formatting date " + this.value);
            }
        }
    }
}