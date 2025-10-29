import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

// create your own API key here https://developers.giphy.com/
const API_KEY = '';

export interface Result {
  url: string;
  images: {
    downsized: {
      url: string;
    }
  };
}

@Component({
  selector: 'app-reactive-search-example',
  templateUrl: './reactive-search-example.html',
  styleUrls: ['./reactive-search-example.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ReactiveSearchExample {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  
  searchForm = this.formBuilder.group({
    search: ['', Validators.required]
  });

  results = this.searchForm.controls.search.valueChanges.pipe(
    filter(value => value !== null && value.length > 2),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(query => this.http.get<{data: Result[]}>(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}&limit=12`)),
    map(res => res.data)
  );
}
