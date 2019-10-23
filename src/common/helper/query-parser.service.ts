import { DreamFactory } from '../../config/dreamfactory';

type DBRequest = [string, Array<string>, Array<string>, string, number];
/**
 * Service for query
 *
 * @export
 * @class QueryParserService
 */
export class QueryParserService {

  /**
   * Method generate db query 
   *
   * @param {string} tableName
   * @param {Array<string>} fields
   * @param {Array<string>} filters
   * @returns
   * @memberof QueryParserService
   */
  generateDbQuery(tableName: string, fields: Array<string>, filters: Array<string>) {
    let url = DreamFactory.df_host + tableName + "?";
    let field = "";
    let filter = "";

    if (fields.length > 0) {
      field = "fields=" + fields.join(",");
    }

    if (filters.length > 0) {
      if (field !== "")
        filter = "&";

      filter = filter + "filter=" + filters.join("AND");
    }

    return url + field + filter;


  }

  /**
   * Method generate db query additional idfields parameter
   *
   * @param {string} tableName
   * @param {Array<string>} fields
   * @param {Array<string>} filters
   * @param {Array<string>} idFields
   * @returns
   * @memberof QueryParserService
   */
  generateDbQueryV2(tableName: string, fields: Array<string>, filters: Array<string>, idFields: Array<string>) {
    let url = DreamFactory.df_host + tableName + "?";

    const paramArray = [];


    this.refactor(paramArray, fields, filters, "AND");
    // console.log(paramArray);
    // // build the parameter
    // if (fields.length > 0) {
    //     const field = "fields=" + fields.map(res => encodeURIComponent(res)).join(",");

    //     paramArray.push(field);
    // }

    // if (filters.length > 0) {

    //     const filter = "filter=" + filters.map(res => encodeURIComponent(res)).join("AND");

    //     paramArray.push(filter);
    // }


    if (idFields.length > 0) {
      const idField = "id_field=" + idFields.map(res => encodeURIComponent(res)).join(",");

      paramArray.push(idField);
    }

    const buildurl = url + paramArray.join("&");
    return buildurl;

  }

  /**
   * function with sort and limit
   *
   * @param {DBRequest} data
   * @returns
   * @memberof QueryParserService
   */
  generateDbQueryV3(data: DBRequest) {

    let tableName: string = data[0];
    let fields: Array<string> = data[1];
    let filters: Array<string> = data[2];
    let orders: string = data[3];
    let limit: number = data[4];

    let url = DreamFactory.df_host + tableName + "?";

    const paramArray = [];

    this.refactor(paramArray, fields, filters, " ");

    // // build the parameter
    // if (fields.length > 0) {
    //     const field = "fields=" + fields.map(res => encodeURIComponent(res)).join(",");

    //     paramArray.push(field);
    // }

    // if (filters.length > 0) {

    //     const filter = "filter=" + filters.map(res => encodeURIComponent(res)).join(" ");

    //     paramArray.push(filter);
    // }


    if (orders != null && orders != '' && orders != undefined) {
      const order = "order=" + orders;

      paramArray.push(order);
    }

    if (limit != null && limit != undefined) {
      const limits = "limit=" + limit;

      paramArray.push(limits);
    }

    const buildurl = url + paramArray.join("&");
    return buildurl;

  }

  //const url = DreamFactory.df_host+this.table_name+"?id_field=TENANT_GUID%2CCOST_CENTRE_GUID";

  /**
   * Refactor function
   *
   * @param {any[]} paramArray
   * @param {string[]} fields
   * @param {string[]} filters
   * @param {string} whereArgs
   * @memberof QueryParserService
   */
  public refactor(paramArray: any[], fields: string[], filters: string[], whereArgs: string) {
    // console.log(whereArgs);
    // build the parameter
    if (fields.length > 0) {
      const field = "fields=" + fields.map(res => encodeURIComponent(res)).join(",");

      paramArray.push(field);
    }

    if (filters.length > 0) {

      const filter = "filter=" + filters.map(res => encodeURIComponent(res)).join(whereArgs);

      paramArray.push(filter);
    }
    // console.log(paramArray);
    // return paramArray;
  }
}
