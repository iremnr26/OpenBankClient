import { NgxSpinnerService } from "ngx-spinner";


export class BaseComponent {
constructor(private spinner: NgxSpinnerService){}

showSpinner(spinnerNameType: spinnerType){
  this.spinner.show(spinnerNameType);

  setTimeout(() => {
    this.hideSpinner(spinnerNameType)
  }, 1000);
}


hideSpinner(spinnerNameType: spinnerType){
  this.spinner.hide(spinnerNameType);
}
}

export enum spinnerType{
  BallFussion="s1",
  BallScaleMultiple="s2",
  BallSpinClockwise="s3",

}