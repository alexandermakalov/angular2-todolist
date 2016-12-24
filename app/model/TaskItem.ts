export class TaskItem {
  public _id?: string;
  public name: string;
  public description?: string;

  constructor(name:string,id?:string, description?:string){
    this._id = id;
    this.description = description;
    this.name = name;
  }
}
