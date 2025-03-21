import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;

  user:any={};
  constructor(
    
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.user=this.jwtAuth.getUser();
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      if(this.user["role"]=="Subcontractor")
      {
        this.menuItems = this.navService.UsericonMenu;
      }
      else  if(this.user["role"]=="Admin")
      {
        this.menuItems = this.navService.AdminiconMenu;
      }
      else  if(this.user["role"]=="Department")
      {
        this.menuItems = this.navService.OperatoriconMenu;
      }
      else  if(this.user["role"]=="Observer")
      {
        this.menuItems = this.navService.ObservericonMenu;
      }
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
        this.layout.publishLayoutChange({
            // sidebarStyle: "compact",
            sidebarCompactToggle: true
          });
    }
  }
}
