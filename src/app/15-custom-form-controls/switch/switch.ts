import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.html',
  styleUrls: ['./switch.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ],
  imports: [CommonModule]
})
export class SwitchComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  externalId: string | null = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  @Input('value') _value = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  @Input() label = '';

  constructor() {}

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  switch() {
    this.value = !this.value;
  }
}
