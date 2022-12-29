import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalInterface } from 'src/app/interfaces';
import { ModalService } from '../../services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {
  modalInfo!: ModalInterface;
  subscription!: Subscription;

  constructor(public modalService: ModalService) {
    this.subscription = modalService.modalInfo$.subscribe({
      next: (modalInfo) => this.modalInfo = modalInfo,
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
