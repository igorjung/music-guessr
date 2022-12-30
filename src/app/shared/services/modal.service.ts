import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ModalInterface } from '../../interfaces';

@Injectable()
export class ModalService {
  modalInfo = new BehaviorSubject<ModalInterface>({
    isOpen: false,
    title: '',
    message: '',
    label: '',
    callback: () => {},
  });
  modalInfo$ = this.modalInfo.asObservable();
  onModalValuesChange(modalInfo: ModalInterface) {
    this.modalInfo.next(modalInfo);
  }
  callback!: () => void;

  onOpen(modalInfo: ModalInterface) {
    this.callback = modalInfo.callback;
    this.onModalValuesChange(modalInfo);
  }

  onClose() {
    this.callback();
    this.onModalValuesChange({
      isOpen: false,
      title: '',
      message: '',
      label: '',
      callback: () => {},
    });
    this.callback = () => {};
  }
}
