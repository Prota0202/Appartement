import Model from './Model.js';

export default class Database extends Model {

  static table = "apart.rooms";
  static primary = ["id"];
}
