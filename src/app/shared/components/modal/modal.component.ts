import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() label: string = 'Start';
  @Input() isOpen: boolean = false;
  @Output() onModalClose = new EventEmitter();


  constructor() {}

  onClose() {
    this.isOpen = false;
    this.onModalClose.emit();
  }
}
