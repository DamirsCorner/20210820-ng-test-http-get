import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('HttpTesting Controller expectOne', () => {
    it('should match request by URL', () => {
      service.get('42').subscribe((response) => {
        expect(response).toBe('response');
      });

      const testRequest = httpMock.expectOne('https://fake.url');
      expect(testRequest.request.method).toBe('GET');
      expect(testRequest.request.params.get('id')).toBe('42');
      testRequest.flush('response');
    });

    it('should match request by URL with params', () => {
      service.get('42').subscribe((response) => {
        expect(response).toBe('response');
      });

      const testRequest = httpMock.expectOne('https://fake.url?id=42');
      expect(testRequest.request.method).toBe('GET');
      expect(testRequest.request.params.get('id')).toBe('42');
      testRequest.flush('response');
    });

    it('should match request by matcher function', () => {
      service.get('42').subscribe((response) => {
        expect(response).toBe('response');
      });

      const testRequest = httpMock.expectOne(
        (request) => request.url === 'https://fake.url'
      );
      expect(testRequest.request.method).toBe('GET');
      expect(testRequest.request.params.get('id')).toBe('42');
      testRequest.flush('response');
    });
  });
});
