import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
    FormBuilder,
    FormControl
} from '@angular/forms';
import { ICategory } from 'src/app/models/category.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@Component({
    selector: 'app-category-form',
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
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
    //------------------------------------------------------------------------
    // @Input Published Events Section
    //------------------------------------------------------------------------
    @Input() set category(data: ICategory | null) {
        if (data) {
            this.categoryForm.patchValue(data);
        }
    }
    @Input() set categories(data: ICategory[] | null) {
        if (data) {
            this.categoriesList = data;
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
    public parentId = new FormControl(null || 0);

    public categoryForm = this.fb.group({
        id: 0,
        name: this.name,
        description: this.description,
        parentId: this.parentId
    });

    //------------------------------------------------------------------------
    // Constructor Method Section
    //------------------------------------------------------------------------
    constructor(private fb: FormBuilder) { }

    //------------------------------------------------------------------------
    onSubmit(): void {
        this.create_edit.emit(this.categoryForm.value);
    }
}
