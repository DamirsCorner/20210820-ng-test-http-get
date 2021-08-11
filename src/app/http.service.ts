import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly url = 'https://fake.url';

  constructor(private http: HttpClient) {}

  public get(id: string): Observable<string> {
    const params = new HttpParams().append('id', id);
    return this.http.get<string>(this.url, { params });
  }
}
