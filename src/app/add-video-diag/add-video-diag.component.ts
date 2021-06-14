import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-video-diag',
  templateUrl: './add-video-diag.component.html',
  styleUrls: ['./add-video-diag.component.scss']
})
export class AddVideoDiagComponent  {

  tagList: string[] = [];
  allTagList: string[] = ["react","react-ui","react-native","angular","css"];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  filteredTags: any;
  tags = new FormControl();
  videoForm = this.fb.group({
    url: ['', [Validators.required, 
      Validators.pattern('^(https|http):\/\/(?:www\.)?youtube.com\/embed\/[A-z0-9]+')]],
    title: ['', Validators.required],
    description: ['',Validators.required],
    isPrivate: ['']
  });

  constructor( public dialogRef: MatDialogRef<AddVideoDiagComponent>,
    private fb: FormBuilder) {
      this.filteredTags = this.tags.valueChanges.pipe(startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTagList.slice()));
  }

  //Mat chip event ot add new item
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tagList.push(value);
    }
    event.chipInput!.clear();
  }

  //Mat chip event ot remove selected
  remove(fruit: string): void {
    const index = this.tagList.indexOf(fruit);
    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagList.push(event.option.viewValue);
    this.tags.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  addVideo() {
    if(!this.videoForm.invalid) {
      let result = Object.assign({},this.videoForm.value, {'tags' : this.tagList });
      this.dialogRef.close(result);
    }
  }

  close() {
    console.log(this.videoForm.value);
    this.dialogRef.close();
  }
}



