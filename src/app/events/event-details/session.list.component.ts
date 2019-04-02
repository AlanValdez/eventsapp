import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styles: [`
      .container { padding-left:20px; padding-right: 20px; }
      .event-image { height: 100px }
  `]
})
export class SessionListComponent implements OnChanges {

  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;


  visibleSessions: ISession[] = [];

  constructor(private auth: AuthService, private voterService: VoterService) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(sessions: ISession) {
    if (this.userHasVoted(sessions)) {
      this.voterService.deleteVoter(this.eventId, sessions, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId, sessions, this.auth.currentUser.userName);
    }
    if(this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  filterSessions(filterBy: string): any {
    if(filterBy === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filterBy;
      });
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    // tslint:disable:curly
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return 2;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  // tslint:disable:curly
  return s2.voters.length - s1.voters.length;
}
