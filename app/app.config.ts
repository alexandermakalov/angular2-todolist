import {Injectable} from "@angular/core";

@Injectable()
export class AppConfig {
  headerTitle = 'Some header title1';
  event = {
    changeHeader: 'changeHeader'
  }
}
