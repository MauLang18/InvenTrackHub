import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectAutoComplete } from '../../../models/reusables/select-autocomplete.interface';

@Component({
  selector: 'app-select-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss'],
})
export class SelectAutocompleteComponent implements OnInit, OnChanges {
  @Input() control: FormControl = new FormControl(null);
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() listOptions: SelectAutoComplete[] = [];
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;

  optionsFilters: SelectAutoComplete[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listOptions']) {
      this.optionsFilters = this.filter('', this.listOptions);
      if (this.listOptions.length === 0) {
        this.control.reset();
      }
    }
    this.initMode();
  }

  ngOnInit(): void {
    this.initMode();
  }

  private filter(value: string, listOptions: SelectAutoComplete[]): SelectAutoComplete[] {
    const filterValue = value.toLowerCase();
    return listOptions?.filter(option => 
      option.description.toLowerCase().includes(filterValue)
    ) || [];
  }

  private initMode(): void {
    this.optionsFilters = this.listOptions;
    this.control.valueChanges.subscribe(value => {
      this.optionsFilters = this.filter(value, this.listOptions);
      this.checkOption(this.control.value, this.listOptions);
    });
    this.control.enable();
  }

  private checkOption(value: string, listOptions: SelectAutoComplete[]): void {
    const isValid = listOptions.some(option => option.id === value);
    if (!isValid && this.required) {
      this.control.setErrors({ required: true });
    }
  }

  showDropdown(id: string): string {
    const option = this.listOptions?.find(option => option.id === id);
    return option ? option.description : '';
  }
}