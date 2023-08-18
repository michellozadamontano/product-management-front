import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ICategory } from 'src/app/models/category.interface';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule
    ],
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
    //------------------------------------------------------------------------
    // @Input Published Events Section
    //------------------------------------------------------------------------
    @Input() set categories(data: ICategory[] | null) {
        if (data) {
            this.categoriesList = data;
        }
    }
    @Input() set product(data: any | null) {
        if (data) {
            console.log('product', data);

            this.productForm.patchValue(data);
        }
    }
    //------------------------------------------------------------------------
    // @Output Published Events Section
    //------------------------------------------------------------------------
    @Output() create_edit: EventEmitter<any> = new EventEmitter<any>();
    //------------------------------------------------------------------------
    // Public Properties Section
    //------------------------------------------------------------------------
    public categoriesList: ICategory[] = [];
    public name = new FormControl('', Validators.required);
    public description = new FormControl('');
    public price = new FormControl('', Validators.required);
    public quantity = new FormControl('', Validators.required);
    public categoryId = new FormControl(null || 0, Validators.required);

    public productForm = this.fb.group({
        id: 0,
        name: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        categoryId: this.categoryId
    });

    //------------------------------------------------------------------------
    // Constructor Method Section
    //------------------------------------------------------------------------
    constructor(private fb: FormBuilder) { }

    //------------------------------------------------------------------------
    onSubmit(): void {
        this.create_edit.emit(this.productForm.value);
    }

}
