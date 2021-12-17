import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookListItem } from '../../models';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {
  @Input() item: BookListItem | undefined;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate([`content/${this.item?.data.docId}`]);
  }

  ngOnInit() {}
}
