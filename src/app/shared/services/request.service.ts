import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { RequestDto, EditRequestDto, DeleteRequestDto, UpdateRequestStatusListDto, CopyRequestDto, UpdateClose_Status, RequestsbyId } from 'app/views/Models/RequestDto';
import { PlansComponent } from 'app/views/users/plans/plans.component';
import { PlansDto } from 'app/views/Models/PlansDto';
import { SearchRequestDto } from 'app/views/Models/SearchRequestDto';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  SelectedRequestData:any={};
  constructor(private http:HttpClient) { }
  public GetAllSites(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/sites.php');
  }
  public GetAllBuildingsbyid(siteid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/buildings.php?siteid='+ siteid);
  }
  public GetAllFloorsbyid(bid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/floors.php?bid='+ bid);
  }
  public GetAllRoomsbyid(flid): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'common/rooms.php?flid='+ flid);
  }

  public GetAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_URL + 'request/read.php');
  }
  public GetAllRequestsByid(res:RequestsbyId): Observable<any[]> {
    return this.http.post<any[]>(environment.API_URL + 'request/readrequestid.php',res);
  }

  public CreateNewRequest(req:RequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/create.php', req);
  }
  public UpdateRequest(req:EditRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update.php', req);
  }
  public UpdateListStatusRequest(req:UpdateRequestStatusListDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update_status.php', req);
  }
  public DeleteRequest(req:DeleteRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/delete.php', req);
  }
  public GetPlans(req:PlansDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/planslist.php', req);
  }
  public CopyRequest(req:CopyRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/createbycount.php', req);
  }

  public SearchRequest(req:SearchRequestDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/searchlist.php', req);
  }

  public CloseRequest(req:UpdateClose_Status): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/update_close_status.php', req);
  }
  // public SetselectedRequest(row)
  // {
  //   this.SelectedRequestData=row;
  // }
  // public GetSelectedRequestData():Observable<any[]> {
  //   return this.SelectedRequestData;
  // }
}
