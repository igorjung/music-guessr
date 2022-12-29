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
  });
  modalInfo$ = this.modalInfo.asObservable();
  onModalValuesChange(modalInfo: ModalInterface) {
    this.modalInfo.next(modalInfo);
  }

  constructor() {}

  onOpen(modalInfo: ModalInterface) {
    this.onModalValuesChange(modalInfo);
  }

  onClose() {
    this.onModalValuesChange({
      isOpen: false,
      title: '',
      message: '',
      label: '',
    });
  }
}
