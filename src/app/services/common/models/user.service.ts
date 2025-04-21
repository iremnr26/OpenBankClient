import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../Entities/User';
import { create_user } from '../../../contracts/users/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomToastrService } from '../../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) {}

  async create(user: User): Promise<create_user> {
    const observable: Observable<create_user | User> = this.httpClientService.post<create_user | User>({
      controllers: "users"
    }, user);  

    return await firstValueFrom(observable) as create_user;
  }






}
