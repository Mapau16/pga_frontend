import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

function identity<Type>(arg: Type): Type {
  return arg;
}

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ]
})
export class AutocompleteComponent implements ControlValueAccessor {

  @Input() label: string = 'NA';
  @Input() items: any[] = [];
  @Input() control: string = '';
  @Output() selectedElement = new EventEmitter<any>();

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.value = input;
    this.onChange(this.value);
    this.onTouched();
  }

  onSelect(item: any) {
    this.onChange(item.name);
    this.selectedElement.emit({control: this.control, item});
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
