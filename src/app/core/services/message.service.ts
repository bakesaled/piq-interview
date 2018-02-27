import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {
  private channels: Map<Type<any>, Subject<any>> = new Map<
    Type<any>,
    Subject<any>
    >();

  channel<T>(type: Type<T>): Observable<T> {
    if (!this.channels.has(type)) {
      this.channels.set(type, new Subject<T>());
    }

    return this.channels.get(type).asObservable();
  }

  publish<T>(type: Type<T>, payload: T) {
    if (this.channels.has(type)) {
      this.channels.get(type).next(payload);
    }
  }
}
