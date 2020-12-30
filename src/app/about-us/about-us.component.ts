import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  profiles = [];
  empty_description = '                                                         ';

  constructor(
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this._profileService.getAllOrganizerProfiles()
      .subscribe(res => {
        this.profiles = res;
      })
  }

}
