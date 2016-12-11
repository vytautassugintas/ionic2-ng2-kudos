import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {concatAll} from "rxjs/operator/concatAll";

/*
 Generated class for the EndorsementsModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-endorsements-modal',
  templateUrl: 'endorsements-modal.html'
})
export class EndorsementsModalPage {

  endorsements = [];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public viewController: ViewController) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  selectEndorsement(endorsement) {
    this.viewController.dismiss(endorsement);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      let arrayToCheck: Array<string> = [];

      for (let i in this.endorsements){
        for(let item of this.endorsements[i].endorsements){
          arrayToCheck.push(item.endorsement);
        }
      }

      this.endorsements = arrayToCheck.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems() {
    this.endorsements = [
      {
        group: "Communication Skills",
        endorsements: [
          {endorsement: "Verbal Communication"},
          {endorsement: "Body Language"},
          {endorsement: "Physical Communication"},
          {endorsement: "Writing"},
          {endorsement: "Storytelling"},
          {endorsement: "Humor"},
          {endorsement: "Listening"},
          {endorsement: "Presentation Skills"},
          {endorsement: "Public Speaking"},
          {endorsement: "Interviewing"}
        ]
      },
      {
        group: "Leadership",
        endorsements: [
          {endorsement: "Team Building"},
          {endorsement: "Strategic Planning"},
          {endorsement: "Coaching"},
          {endorsement: "Mentoring"},
          {endorsement: "Delegation"},
          {endorsement: "Dispute Resolution"},
          {endorsement: "Diplomacy"},
          {endorsement: "Giving Feedback"},
          {endorsement: "Managing Difficult Conversations"},
          {endorsement: "Decision Making"},
          {endorsement: "Performance Management"},
          {endorsement: "Supervising"},
          {endorsement: "Managing"},
          {endorsement: "Manager Management"},
          {endorsement: "Talent Management"},
          {endorsement: "Managing Remote Teams"},
          {endorsement: "Managing Virtual Teams"},
          {endorsement: "Crisis Management"}
        ]
      },
      {
        group: "Influencing",
        endorsements: [
          {endorsement: "Facilitation"},
          {endorsement: "Selling"},
          {endorsement: "Inspiring"},
          {endorsement: "Persuasion"},
          {endorsement: "Negotiation"},
          {endorsement: "Motivating"},
          {endorsement: "Collaborating"}
        ]
      },
      {
        group: "Interpersonal Skills",
        endorsements: [
          {endorsement: "Networking"},
          {endorsement: "Interpersonal Relationships"},
          {endorsement: "Dealing with Difficult People"},
          {endorsement: "Conflict Resolution"},
          {endorsement: "Personal Branding"},
          {endorsement: "Office Politics"}
        ]
      },
      {
        group: "Personal Skills",
        endorsements: [
          {endorsement: "Emotional Intelligence"},
          {endorsement: "Self Awareness"},
          {endorsement: "Emotion Management"},
          {endorsement: "Stress Management"},
          {endorsement: "Tolerance of Change and Uncertainty"},
          {endorsement: "Taking Criticism"},
          {endorsement: "Self Confidence"},
          {endorsement: "Adaptability"},
          {endorsement: "Resilience"},
          {endorsement: "Assertiveness"},
          {endorsement: "Competitiveness"},
          {endorsement: "Self Leadership"},
          {endorsement: "Self Assessment"},
          {endorsement: "Work-Life Balance"},
          {endorsement: "Friendliness"},
          {endorsement: "Enthusiasm"},
          {endorsement: "Empathy"}
        ]
      },
      {
        group: "Creativity",
        endorsements: [
          {endorsement: "Problem Solving"},
          {endorsement: "Critical Thinking"},
          {endorsement: "Innovation"},
          {endorsement: "Troubleshooting"},
          {endorsement: "Design Sense"},
          {endorsement: "Artistic Sense"}
        ]
      },
      {
        group: "Professional Skills",
        endorsements: [
          {endorsement: "Organization"},
          {endorsement: "Planning"},
          {endorsement: "Scheduling"},
          {endorsement: "Time Management"},
          {endorsement: "Meeting Management"},
          {endorsement: "Technology Savvy"},
          {endorsement: "Technology Trend Awareness"},
          {endorsement: "Business Trend Awareness"},
          {endorsement: "Research"},
          {endorsement: "Business Etiquette"},
          {endorsement: "Business Ethics"},
          {endorsement: "Diversity Awareness"},
          {endorsement: "Disability Awareness"},
          {endorsement: "Intercultural Competence"},
          {endorsement: "Training"},
          {endorsement: "Train the Trainer"},
          {endorsement: "Process Improvement"},
          {endorsement: "Knowledge Management"},
          {endorsement: "Writing Reports and Proposals"},
          {endorsement: "Customer Service"},
          {endorsement: "Entrepreneurial Thinking"}
        ]
      }
    ]
  }

}
