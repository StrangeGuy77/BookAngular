import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AgregarLibrosService } from '../../data/agregar-libros.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: "app-add-books",
  templateUrl: "./add-books.component.html",
  styleUrls: ["./add-books.component.css"]
})
export class AddBooksComponent implements OnInit {

  private notifier: NotifierService;

  addForm = new FormGroup({
    author: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    urlImg: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    userUploaderId: new FormControl('')
  });

  data: any;

// , notifier: NotifierService

  constructor(private bookservice: AgregarLibrosService, notifier: NotifierService) {
    this.send();
    this.notifier = notifier;
  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit() { }

  send() {

    this.data = this.addForm;
    this.data.value.userUploaderId = "5e61fe74c881a309f108a04a";
    console.log(this.data);

    if (this.data.invalid) {
      return;
    }

    this.bookservice.post(this.data.value).subscribe((res: any) => {
      console.log(this.data);

      if (res.bookId) {
        this.showNotification('success', res.message);
        this.data.reset();
      } else {
        this.showNotification('error', res.message);
      }
    });


  }
}
