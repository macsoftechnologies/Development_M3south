import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { TeamsDto, UpdateTeamsDto, DeleteTeamsDto } from 'app/views/Models/TeamsDto';
import { graphDto } from 'app/views/Models/dashboardDto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http:HttpClient) { }
  public GetAllTeams(): Observable<any[]> {
    // var reqHeader = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Methods':' GET, PUT, POST, DELETE, HEAD, OPTIONS '});

    return this.http.get<any[]>(environment.API_URL + 'team/read.php');
  }

  public CreateTeams(subcont:TeamsDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'team/create.php', subcont);
  }
  public UpdateTeams(subcont:UpdateTeamsDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'team/update.php', subcont);
  }
  public DeleteTeams(req:DeleteTeamsDto): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'team/delete.php', req);
  }


  /**                                   Dashboard API                                  */ 

  public GetDasboardCounts(): Observable<any[]> {

    return this.http.get<any[]>(environment.API_URL + 'request/readCounts.php');
  }

  public getGraphCounts(req : any) : Observable<any> {
    return this.http.post<any>(environment.API_URL + 'request/readGraph.php'  , req)
  }

}
