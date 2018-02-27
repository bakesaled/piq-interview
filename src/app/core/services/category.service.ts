import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CategoryModel } from '../../../server/models/category.model';

@Injectable()
export class CategoryService {
  private readonly baseUrl = 'http://localhost:7000/api/';
  constructor(private http: HttpClient) {}

  public get(): Observable<Array<CategoryModel>> {
    return this.http.get<Array<CategoryModel>>(`${this.baseUrl}category/`);
  }

}
