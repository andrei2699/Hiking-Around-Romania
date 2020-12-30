import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  profiles = [];
  searchText: string;

  constructor(
    private _profileService: ProfileService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._profileService.getAllOrganizerProfiles()
      .subscribe(res => {
        this.profiles = res;
      })
  }

}
