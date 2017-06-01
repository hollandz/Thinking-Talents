import { Component, OnInit } from '@angular/core';
import skills from './skillsData';

@Component({
  selector: 'app-team-map',
  templateUrl: './team-map.component.html',
  styleUrls: ['./team-map.component.css']
})
export class TeamMapComponent implements OnInit {

  skillsList: Array<skill> = skills;
  team: team;
  currentPlayer: player;
  mode: string;

  constructor() {
    console.log(this.skillsList);

    this.team = {
      players: []
    };

    this.currentPlayer = {
      talents: []
    }

  }

  ngOnInit() {
    this.mode = "create";
  }

  addTeamMember() {

    if(!this.currentPlayer.name){
      alert("Name cannot be null");
      return;
    }

    this.team.players.push(this.currentPlayer);
    this.reset();
  }

  updateSkills(skill: skill) {

    let index: number = this.currentPlayer.talents.indexOf(skill);

    if (index !== -1) {
      this.currentPlayer.talents.splice(index, 1);
    } else {
      this.currentPlayer.talents.push(skill);
    }
  }

  updateMember(player: player){

    let index: number = this.team.players.indexOf(player);

    this.team.players[index] = player;
    this.reset();
    
  }

  removeMember(player:player){

    let index: number = this.team.players.indexOf(player);
    
    if(index !== -1){
      this.team.players.splice(index, 1);
    };

    this.reset();

  }

  editPlayer(player: player) {
    this.currentPlayer = player;
    this.mode = "edit";
    let i;

    if (player.talents.length > 0) {
      player.talents.forEach((x) => {
        i = this.skillsList.indexOf(x);
        this.skillsList[i].checked = true;
      });
    }

  }

  reset() {
    this.skillsList.forEach((skill) => {
      skill.checked = false;
    })

    this.currentPlayer = {};

    this.mode = "create";
  }

}

interface skill {
  name: string;
  description: string;
  checked?: boolean;
}

interface player {
  name?: string;
  talents?: Array<skill>;
}

interface team {
  players: Array<player>;
}
