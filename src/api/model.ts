/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** TaskSimpleDetails */
export interface TaskSimpleResponse {
  /** Unique ID of the task */
  id: number;
  /** ID of the associated miner */
  miner: number;
  /** Type of the miner */
  type: number;
  /** Human-readable name of the task */
  name: string;
  /** State of the task */
  state: "new" | "in_progress" | "solved" | "failed" | "interrupted";
  /** State of the results import */
  importState?: "none" | "waiting" | "partial" | "done";
  /** Count of founded rules */
  rulesCount: number;
  /** Rules order */
  rulesOrder?: string;
}

/** Task */
export interface TaskResponse {
  /** Unique ID of the task */
  id: number;
  /** ID of the associated miner */
  miner: number;
  /** Type of the miner */
  type: number;
  /** Human-readable name of the task */
  name: string;
  /** State of the task */
  state: "new" | "in_progress" | "solved" | "failed" | "interrupted";
  /** State of the results import */
  importState?: "none" | "waiting" | "partial" | "done";
  /** Count of founded rules */
  rulesCount: number;
  /** Rules order */
  rulesOrder?: string;
  /** Structured configuration of the task settings */
  taskSettings?: {
    /** Limit count of rules */
    limitHits?: number;
    /** Rule pattern */
    rule0?: {
      /** Antecedent pattern */
      antecedent?: CedentDetailsResponse;
      IMs?: TaskIMResponse[];
      /** Consequent pattern */
      succedent?: CedentDetailsResponse;
    };
    /** Strict require attributes in the pattern */
    strict?: boolean;
  };
}

/** IM */
export interface TaskIMResponse {
  name?: string;
  localizedName?: string;
  thresholdType?: string;
  compareType?: string;
  fields?: TaskConfigFieldDetails[];
  threshold?: number;
  alpha?: number;
}

/** FieldDetails */
export interface TaskConfigFieldDetails {
  name: string;
  value: number;
}

/** CedentDetails */
export interface CedentDetailsResponse {
  type?: string;
  connective?: {
    id?: number;
    name?: string;
    type?: string;
  };
  level?: number;
  children?: TaskSettingsAttributeDetails[];
}

/** AttributeDetails */
export interface TaskSettingsAttributeDetails {
  name?: string;
  category?: string;
  ref?: string;
  fields?: TaskConfigFieldDetails[];
  sign?: "positive";
}

/** Rule */
export interface TaskRuleResponse {
  /** Unique ID of the rule */
  id: number;
  /** Human-readable form of the rule */
  text: string;
  /** A value from the four field table */
  a?: string;
  /** B value from the four field table */
  b?: string;
  /** C value from the four field table */
  c?: string;
  /** D value from the four field table */
  d?: string;
  /** 1, if the rule is in Rule Clipboard */
  selected?: "0" | "1";
}

/** TaskSimpleConfig */
export interface TaskSimpleInput {
  /** ID of the miner for this task */
  miner: number;
  /** Human-readable name of the task */
  name: string;
  /** Antecedent configuration */
  antecedent?: CedentSimpleInput;
  /** Consequent configuration */
  consequent: CedentSimpleInput;
  /** Interest measure thresholds */
  IMs: IMSimpleInput[];
  /** Limit of requested rules count */
  limitHits?: number;
}

/** TaskBasicUpdate */
export interface TaskBasicUpdateInput {
  /** Human-readable name of the task */
  name: string;
  /** Rules order (IM name) */
  rulesOrder: string;
}

export type CedentSimpleInput = AttributeSimpleInput[];

export interface AttributeSimpleInput {
  /** Attribute name */
  attribute?: string;
  /** Fixed attribute value (optional,leave empty, if *) */
  fixedValue?: string;
}

export interface IMSimpleInput {
  name: string;
  value?: number;
}

/** RuleSet */
export interface RuleSetResponse {
  /** Unique ID of the rule set */
  id: number;
  /** Human-readable name of the rule set */
  name?: string;
  /** Description of the rule set */
  description?: string;
  /** Count of rules in the rule set */
  rulesCount?: number;
  /** DateTime of last modification of rule set */
  lastModified?: string;
}

/** RuleSet */
export interface RuleSetInput {
  /** Human-readable name of the rule set */
  name: string;
  /** Description of the rule set */
  description?: string;
}

/** Rule */
export interface RuleWithRelationResponse {
  /** Unique ID of the rule */
  id: number;
  /** Human-readable form of the rule */
  text: string;
  /** A value from the four field table */
  a?: string;
  /** B value from the four field table */
  b?: string;
  /** C value from the four field table */
  c?: string;
  /** D value from the four field table */
  d?: string;
  /** 1, if the rule is in Rule Clipboard */
  selected?: "0" | "1";
  /** Relation to the current rule set */
  relation: "positive" | "neutral" | "negative";
}

/** Miner */
export interface MinerResponse {
  /** Unique ID of the miner */
  id: number;
  /** Human-readable name of the miner */
  name: string;
  /** Miner type */
  type: "r" | "lm";
  /** ID of used datasource */
  datasourceId: number;
  /** ID of used metasource */
  metasourceId: number;
  /** ID of rule set associated with the miner */
  ruleSetId: number;
  /** DateTime of miner creation */
  created?: string;
  /** DateTime of miner last open action */
  lastOpened?: string;
}

/** MinerBasicInfo */
export interface MinerBasicResponse {
  /** Unique ID of the miner */
  id: number;
  /** Human-readable name of the miner */
  name: string;
  /** Type of data mining backend */
  type: "cloud" | "r" | "lm";
}

/** Miner */
export interface MinerInput {
  /** Human-readable name of the miner */
  name: string;
  /** Type of data mining backend */
  type: "cloud" | "r" | "lm";
  /** ID of existing datasource */
  datasourceId: number;
  /** ID of existing rule set (optional) */
  ruleSetId?: number;
}

/** TaskBasicInfo */
export interface TaskBasicResponse {
  /** Unique ID of the task */
  id: number;
  /** Human-readable name of the task */
  name: string;
  /** State of the task */
  state: string;
  /** Count of founded rules */
  rulesCount?: number;
}

/** OutliersTaskInfo */
export interface OutliersTaskResponse {
  /** Unique ID of the task */
  id: number;
  /**
   * Minimal support used for detection of outliers
   * @default 0
   */
  minSupport: number;
  /** State of the task */
  state: string;
}

/** AttributeBasicInfo */
export interface AttributeResponse {
  /** Unique ID of the datasource */
  id: number;
  /** Name of the attribute */
  name: string;
  /** ID of preprocessing */
  preprocessing: number;
  /** Details of the datasource column */
  column?: {
    /** ID of datasource column */
    id?: number;
    /** Name of datasource column */
    name?: string;
    /** Type of datasource column */
    type?: string;
    /** ID of format */
    format?: number;
  };
}

/** New attribute */
export interface NewAttributeInput {
  /** Miner ID */
  miner: number;
  /** New attribute name */
  name: string;
  /** Datasource column ID */
  column?: number;
  /** Datasource column name */
  columnName?: string;
  /** Preprocessing ID */
  preprocessing?: number;
  /** Type of special preprocessing */
  specialPreprocessing?: "eachOne";
  /** Definition of new preprocessing - <a href='./swagger/examples'>see examples</a> */
  newPreprocessing?: any;
}

/** MetasourceBasicInfo */
export interface MetasourceBasicResponse {
  /** Unique ID of the metasource */
  id: number;
  /** Type of the used database */
  type: "limited" | "unlimited" | "mysql";
  /** Name of the database table */
  name: string;
  /** ID of the metasource on the remote data service */
  dbDatasourceId?: number;
  state?: "available" | "unavailable" | "preparation";
}

/** MetasourceBasicInfo */
export interface MetasourceWithAttributesResponse {
  /** Unique ID of the metasource */
  id: number;
  /** Type of the used database */
  type: string;
  /** Name of the database table */
  name?: string;
  /** ID of the metasource on the remote data service */
  ppDatasetId?: number;
  state?: "available" | "unavailable" | "preparation";
  attribute?: AttributeBasicInfoResponse[];
}

export interface AttributeBasicInfoResponse {
  /** Unique ID of the attribute */
  id: number;
  /** Name of the attribute */
  name: string;
  /** Data type of the attribute */
  type: "nominal" | "numeric";
  datasourceColumnId: int;
  preprocessingId: int;
  /** Count of unique values of the attribute */
  uniqueValues: int;
  active: boolean;
}

/** OutliersTaskConfig */
export interface OutliersTaskInput {
  /** ID of the miner for this task */
  miner: number;
  /**
   * Requested minimal support
   * @default 0
   */
  minSupport: number;
}

/** OutliersTaskInfoWithOffsetAndLimit */
export interface OutliersTaskResponseWithOffsetAndLimit {
  /** Unique ID of the task */
  id: number;
  /**
   * Minimal support used for detection of outliers
   * @default 0
   */
  minSupport: number;
  /** State of the task */
  state: string;
  /**
   * Offset
   * @default 0
   */
  offset: number;
  /**
   * Limit
   * @default 0
   */
  limit: number;
}

/** OutlierDetails */
export interface OutlierDetails {
  /** @default 0 */
  id: number;
  /** @default 0 */
  score: number;
  attributeValues: object;
}

/** ScoringResult */
export interface ScoringResultResponse {
  /** Count of rows */
  rowCount: number;
  /** True classifications */
  correct: number;
  /** False classifications */
  incorrect: number;
  /** False classifications */
  unclassified: number;
  /** Task details */
  task?: TaskSimpleResponse;
  /** Rule set details */
  ruleSet?: RuleSetResponse;
}

/** DatasourceBasicInfo */
export interface DatasourceBasicResponse {
  /** Unique ID of the datasource */
  id: number;
  /** Type of the used database */
  type: "limited" | "unlimited" | "mysql";
  /** Name of the database table */
  name: string;
  /** ID of the datasource on the remote data service */
  dbDatasourceId?: number;
  available: boolean;
}

/** DatasourceBasicInfo */
export interface DatasourceWithColumnsResponse {
  /** Unique ID of the datasource */
  id: number;
  /** Type of the used database */
  type: string;
  /** Name of the database table */
  name?: string;
  /** ID of the datasource on the remote data service */
  dbDatasourceId?: number;
  available?: boolean;
  column?: ColumnBasicInfoResponse[];
}

export interface ColumnBasicInfoResponse {
  /** Unique ID of the column */
  id: number;
  /** Name of the column */
  name: string;
  /** Data type of the column */
  type: "nominal" | "numeric";
  /** Count of unique values of the column */
  uniqueValues?: int;
  active: boolean;
}

/** User */
export interface UserResponse {
  /** Unique ID of the user */
  id: number;
  /** Human-readable name of the user */
  name: string;
  /** E-mail for the user */
  email: string;
  /** Was the user account activated? */
  active: boolean;
}

/** User */
export interface UserInput {
  /** Name of the user */
  name: string;
  /** E-mail for the User */
  email: string;
  /** Password of the User (required for new account or for password change) */
  password: string;
}

/** User */
export interface UserResponseWithApiKey {
  /** Unique ID of the user */
  id: number;
  /** Human-readable name of the user */
  name: string;
  /** E-mail for the user */
  email: string;
  /** Was the user account activated? */
  active: boolean;
  /** User API key - for usage with other API requests */
  apiKey?: string;
}

/** Status */
export interface StatusResponse {
  /** Status code */
  code: number;
  /** Status string */
  status: "OK" | "error";
  /** User-friendly message */
  message?: string;
}

/** InputError */
export interface InputErrorResponse {
  /** Status code */
  code: number;
  /** Status string */
  status: "OK" | "error";
  /** User-friendly message */
  message?: string;
  /** List of errors */
  errors?: InputErrorItem[];
}

/** InputErrorItem */
export interface InputErrorItem {
  field?: string;
  message?: string;
  code?: number;
}

/** Rule */
export interface RuleSimpleResponse {
  /** Unique ID of the rule */
  id: number;
  /** Task ID */
  task?: string;
  /** Human-readable form of the rule */
  text: string;
  /** A value from the four field table */
  a?: string;
  /** B value from the four field table */
  b?: string;
  /** C value from the four field table */
  c?: string;
  /** D value from the four field table */
  d?: string;
  /** 1, if the rule is in Rule Clipboard */
  selected?: "0" | "1";
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://br-dev.lmcloud.vse.cz/easyminercenter/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title EasyMinerCenter REST API
 * @version 2.4
 * @license Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * @baseUrl https://br-dev.lmcloud.vse.cz/easyminercenter/api
 * @contact Stanislav Vojíř <stanislav.vojir@vse.cz>
 *
 * API for access to EasyMinerCenter functionalities - authentication of users, management of data sources. All resources are secured with the API key. Please append ?apiKey={yourKey} to all your requests. Alternatively, you can send the header 'Authorization: ApiKey {yourKey}'
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  tasks = {
    /**
     * No description
     *
     * @tags Tasks
     * @name PmmlDetail
     * @summary Get PMML export of the task
     * @request GET:/tasks/{id}/pmml
     * @secure
     */
    pmmlDetail: (
      id: number,
      query?: {
        /**
         * PMML type
         * @default "guha"
         */
        type?: "guha" | "associationmodel" | "associationmodel-4.2";
        /**
         * Include frequencies
         * @default "yes"
         */
        frequencies?: "yes" | "no";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/tasks/${id}/pmml`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name HtmlDetail
     * @summary Get HTML export of the task
     * @request GET:/tasks/{id}/html
     * @secure
     */
    htmlDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/tasks/${id}/html`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksDetail
     * @summary Get task details
     * @request GET:/tasks/{id}
     * @secure
     */
    tasksDetail: (id: number, params: RequestParams = {}) =>
      this.request<TaskResponse, void>({
        path: `/tasks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name TasksDelete
     * @summary Delete existing task
     * @request DELETE:/tasks/{id}
     * @secure
     */
    tasksDelete: (id: number, params: RequestParams = {}) =>
      this.request<StatusResponse, void>({
        path: `/tasks/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name SimpleCreate
     * @summary Create new simple configured task
     * @request POST:/tasks/simple
     * @secure
     */
    simpleCreate: (task: TaskSimpleInput, params: RequestParams = {}) =>
      this.request<TaskResponse, void>({
        path: `/tasks/simple`,
        method: "POST",
        body: task,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name StartDetail
     * @summary Start the solving of the data mining task
     * @request GET:/tasks/{id}/start
     * @secure
     */
    startDetail: (id: number, params: RequestParams = {}) =>
      this.request<TaskSimpleResponse, void>({
        path: `/tasks/${id}/start`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name StateDetail
     * @summary Check state of the data mining task
     * @request GET:/tasks/{id}/state
     * @secure
     */
    stateDetail: (id: number, params: RequestParams = {}) =>
      this.request<TaskSimpleResponse, void>({
        path: `/tasks/${id}/state`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name StopDetail
     * @summary Stop the solving of the data mining task
     * @request GET:/tasks/{id}/stop
     * @secure
     */
    stopDetail: (id: number, params: RequestParams = {}) =>
      this.request<TaskSimpleResponse, void>({
        path: `/tasks/${id}/stop`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks
     * @name RulesDetail
     * @summary List rules founded using the selected task
     * @request GET:/tasks/{id}/rules
     * @secure
     */
    rulesDetail: (id: number, params: RequestParams = {}) =>
      this.request<
        {
          /** Action for reading of rules from a selected task */
          task?: TaskSimpleResponse;
          /** Action for reading of rules from a selected task */
          rules?: TaskRuleResponse[];
        },
        void
      >({
        path: `/tasks/${id}/rules`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  databases = {
    /**
     * No description
     *
     * @tags Databases
     * @name DatabasesDetail
     * @summary Get user access credentials for MySQL and other databases
     * @request GET:/databases/{dbType}
     * @secure
     */
    databasesDetail: (dbType: "limited" | "unlimited" | "mysql", params: RequestParams = {}) =>
      this.request<
        {
          /** DB Server (IP or URL) */
          server: string;
          /** DB server port (empty if default) */
          port?: number;
          /** Database username */
          username: string;
          /** Database password */
          password: string;
          /** Database name */
          database: string;
        },
        StatusResponse | void
      >({
        path: `/databases/${dbType}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ruleSets = {
    /**
     * No description
     *
     * @tags RuleSets
     * @name RuleSetsDetail
     * @summary Get details of the rule set
     * @request GET:/rule-sets/{id}
     * @secure
     */
    ruleSetsDetail: (id: number, params: RequestParams = {}) =>
      this.request<RuleSetResponse, void>({
        path: `/rule-sets/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RuleSetsUpdate
     * @summary Update existing rule set
     * @request PUT:/rule-sets/{id}
     * @secure
     */
    ruleSetsUpdate: (id: number, ruleset: RuleSetInput, params: RequestParams = {}) =>
      this.request<RuleSetResponse, void | InputErrorResponse>({
        path: `/rule-sets/${id}`,
        method: "PUT",
        body: ruleset,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RuleSetsDelete
     * @summary Remove rule set
     * @request DELETE:/rule-sets/{id}
     * @secure
     */
    ruleSetsDelete: (id: number, params: RequestParams = {}) =>
      this.request<StatusResponse, void>({
        path: `/rule-sets/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RuleSetsList
     * @summary List rule sets for the current user
     * @request GET:/rule-sets
     * @secure
     */
    ruleSetsList: (params: RequestParams = {}) =>
      this.request<RuleSetResponse[], any>({
        path: `/rule-sets`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RuleSetsCreate
     * @summary Create new rule set
     * @request POST:/rule-sets
     * @secure
     */
    ruleSetsCreate: (ruleset: RuleSetInput, params: RequestParams = {}) =>
      this.request<RuleSetResponse, InputErrorResponse>({
        path: `/rule-sets`,
        method: "POST",
        body: ruleset,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RulesDetail
     * @summary List rules saved in the selected rule set
     * @request GET:/rule-sets/{id}/rules
     * @secure
     */
    rulesDetail: (
      id: number,
      query?: {
        /** Relation between rule set and rules: ''|'all'|'positive'|'neutral'|'negative' */
        rel?: "" | "all" | "positive" | "negative" | "neutral";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Action returning list of rules in a selected ruleset */
          ruleset?: RuleSetResponse;
          /** Action returning list of rules in a selected ruleset */
          rules?: RuleWithRelationResponse[];
        },
        void
      >({
        path: `/rule-sets/${id}/rules`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RulesCreate
     * @summary Add rules into the selected rule set
     * @request POST:/rule-sets/{id}/rules
     * @secure
     */
    rulesCreate: (
      id: number,
      query: {
        /** IDs of rules (optinally multiple - separated with , or ;) */
        rules: number[];
        /** positive|neutral|negative */
        relation?: "positive" | "negative" | "neutral";
      },
      params: RequestParams = {},
    ) =>
      this.request<StatusResponse, void>({
        path: `/rule-sets/${id}/rules`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RuleSets
     * @name RulesDelete
     * @summary Remove rules from the selected rule set
     * @request DELETE:/rule-sets/{id}/rules
     * @secure
     */
    rulesDelete: (
      id: number,
      query: {
        /** IDs of rules (optinally multiple - separated with , or ;) */
        rules: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<StatusResponse, void>({
        path: `/rule-sets/${id}/rules`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  miners = {
    /**
     * No description
     *
     * @tags Miners
     * @name MinersDetail
     * @summary Get miner details
     * @request GET:/miners/{id}
     * @secure
     */
    minersDetail: (id: number, params: RequestParams = {}) =>
      this.request<MinerResponse, void>({
        path: `/miners/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Miners
     * @name MinersDelete
     * @summary Delete miner with all tasks
     * @request DELETE:/miners/{id}
     * @secure
     */
    minersDelete: (id: number, params: RequestParams = {}) =>
      this.request<StatusResponse, void>({
        path: `/miners/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Miners
     * @name MinersList
     * @summary Get list of miners for the current user
     * @request GET:/miners
     * @secure
     */
    minersList: (params: RequestParams = {}) =>
      this.request<MinerBasicResponse[], any>({
        path: `/miners`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Miners
     * @name MinersCreate
     * @summary Create new miner
     * @request POST:/miners
     * @secure
     */
    minersCreate: (miner: MinerInput, params: RequestParams = {}) =>
      this.request<MinerResponse, InputErrorResponse>({
        path: `/miners`,
        method: "POST",
        body: miner,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Miners
     * @name TasksDetail
     * @summary Get list of tasks in the selected miner
     * @request GET:/miners/{id}/tasks
     * @secure
     */
    tasksDetail: (id: number, params: RequestParams = {}) =>
      this.request<
        {
          /** Action for reading a list of all task associated with one selected miner */
          miner?: MinerBasicResponse;
          /** Action for reading a list of all task associated with one selected miner */
          task?: TaskBasicResponse[];
        },
        void
      >({
        path: `/miners/${id}/tasks`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Miners
     * @name OutliersTasksDetail
     * @summary Get list of tasks in the selected miner
     * @request GET:/miners/{id}/outliersTasks
     * @secure
     */
    outliersTasksDetail: (id: number, params: RequestParams = {}) =>
      this.request<
        {
          /** Action for reading a list of all outlier detection task associated with one selected miner */
          miner?: MinerBasicResponse;
          /** Action for reading a list of all outlier detection task associated with one selected miner */
          outlierTask?: OutliersTaskResponse[];
        },
        void
      >({
        path: `/miners/${id}/outliersTasks`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  attributes = {
    /**
     * No description
     *
     * @tags Attributes
     * @name AttributesCreate
     * @summary Create new attribute using defined preprocessing
     * @request POST:/attributes
     * @secure
     */
    attributesCreate: (body: NewAttributeInput, params: RequestParams = {}) =>
      this.request<AttributeResponse, StatusResponse>({
        path: `/attributes`,
        method: "POST",
        body: body,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  metasources = {
    /**
     * No description
     *
     * @tags Metasources
     * @name MetasourcesDetail
     * @summary Get meta source basic details
     * @request GET:/metasources/{id}
     * @secure
     */
    metasourcesDetail: (id: number, params: RequestParams = {}) =>
      this.request<MetasourceWithAttributesResponse, StatusResponse | void>({
        path: `/metasources/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  outliersTasks = {
    /**
     * No description
     *
     * @tags Outliers
     * @name OutliersTasksDetail
     * @summary Get outlier detection task details
     * @request GET:/outliers-tasks/{id}
     * @secure
     */
    outliersTasksDetail: (id: number, params: RequestParams = {}) =>
      this.request<OutliersTaskResponse, void>({
        path: `/outliers-tasks/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outliers
     * @name OutliersTasksDelete
     * @summary Delete outlier detection task
     * @request DELETE:/outliers-tasks/{id}
     * @secure
     */
    outliersTasksDelete: (id: number, params: RequestParams = {}) =>
      this.request<StatusResponse, void>({
        path: `/outliers-tasks/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outliers
     * @name OutliersDetail
     * @summary Get list of outliers - results of outlier detection task
     * @request GET:/outliers-tasks/{id}/outliers
     * @secure
     */
    outliersDetail: (
      id: number,
      query: {
        /**
         * Offset
         * @default 0
         */
        offset?: number;
        /** Limit (top outliers count) */
        limit: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Akce vracející přehled outlierů z již vyřešené úlohy
 Action returning list of outliers from a solved outlier detection task */
          outliersTask?: OutliersTaskResponseWithOffsetAndLimit;
          /** Akce vracející přehled outlierů z již vyřešené úlohy
 Action returning list of outliers from a solved outlier detection task */
          outlier?: OutlierDetails[];
        },
        void
      >({
        path: `/outliers-tasks/${id}/outliers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outliers
     * @name OutliersTasksCreate
     * @summary Create new outlier detection task
     * @request POST:/outliers-tasks
     * @secure
     */
    outliersTasksCreate: (task: OutliersTaskInput, params: RequestParams = {}) =>
      this.request<OutliersTaskResponse, void>({
        path: `/outliers-tasks`,
        method: "POST",
        body: task,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outliers
     * @name StartDetail
     * @summary Start the solving of the outlier detection task
     * @request GET:/outliers-tasks/{id}/start
     * @secure
     */
    startDetail: (id: number, params: RequestParams = {}) =>
      this.request<OutliersTaskResponse, void>({
        path: `/outliers-tasks/${id}/start`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outliers
     * @name StateDetail
     * @summary Check state of the data mining task
     * @request GET:/outliers-tasks/{id}/state
     * @secure
     */
    stateDetail: (id: number, params: RequestParams = {}) =>
      this.request<OutliersTaskResponse, void>({
        path: `/outliers-tasks/${id}/state`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  evaluation = {
    /**
     * No description
     *
     * @tags Evaluation
     * @name ClassificationList
     * @summary Evaluate classification model
     * @request GET:/evaluation/classification
     * @secure
     */
    classificationList: (
      query: {
        /** Scorer type */
        scorer: "easyMinerScorer" | "modelTester";
        /** Task ID */
        task?: number;
        /** Rule set ID */
        ruleSet?: number;
        /** Datasource ID (if not specified, task datasource will be used) */
        datasource?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ScoringResultResponse, StatusResponse>({
        path: `/evaluation/classification`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  datasources = {
    /**
     * No description
     *
     * @tags Datasources
     * @name DatasourcesList
     * @summary Get list of datasources for the current user
     * @request GET:/datasources
     * @secure
     */
    datasourcesList: (params: RequestParams = {}) =>
      this.request<DatasourceBasicResponse[], any>({
        path: `/datasources`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Datasources
     * @name DatasourcesCreate
     * @summary Create new datasource using uploaded file
     * @request POST:/datasources
     * @secure
     */
    datasourcesCreate: (
      query: {
        /** Table name (if empty, will be auto-generated) */
        name?: string;
        /** Columns separator */
        separator: string;
        /** File encoding */
        encoding: "utf8" | "cp1250" | "iso-8859-1";
        /** Enclosure character */
        enclosure?: string;
        /** Escape character */
        escape?: string;
        /** Null value */
        nullValue?: string;
        /** Database type */
        type: "limited" | "unlimited" | "mysql";
      },
      data: {
        /** CSV file */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<DatasourceWithColumnsResponse, StatusResponse>({
        path: `/datasources`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Datasources
     * @name DatasourcesDetail
     * @summary Get data source basic details
     * @request GET:/datasources/{id}
     * @secure
     */
    datasourcesDetail: (id: number, params: RequestParams = {}) =>
      this.request<DatasourceWithColumnsResponse, StatusResponse | void>({
        path: `/datasources/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Datasources
     * @name DatasourcesDelete
     * @summary Delete data source with all attached miners
     * @request DELETE:/datasources/{id}
     * @secure
     */
    datasourcesDelete: (id: number, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse | void>({
        path: `/datasources/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Datasources
     * @name GetDatasources
     * @summary Get data source rows as CSV
     * @request GET:/datasources/{id}/csv
     * @secure
     */
    getDatasources: (
      id: number,
      query: {
        /** Skip rows */
        offset?: number;
        /** Result rows count */
        limit?: number;
        /** Columns separator */
        separator: string;
        /** Enclosure character */
        enclosure?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, StatusResponse | void>({
        path: `/datasources/${id}/csv`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Datasources
     * @name DataDelete
     * @summary Delete data source data (without deletion of preprocessed datasets and miners)
     * @request DELETE:/datasources/{id}/data
     * @secure
     */
    dataDelete: (id: number, params: RequestParams = {}) =>
      this.request<StatusResponse, StatusResponse | void>({
        path: `/datasources/${id}/data`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name ApiKeyDetail
     * @summary Get API KEY for the selected user account
     * @request GET:/users/{id}/apiKey
     * @secure
     */
    apiKeyDetail: (id: number, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/users/${id}/apiKey`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDetail
     * @summary Get details of the user account
     * @request GET:/users/{id}
     * @secure
     */
    usersDetail: (id: number, params: RequestParams = {}) =>
      this.request<UserResponse, void>({
        path: `/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersUpdate
     * @summary Update existing user account
     * @request PUT:/users/{id}
     * @secure
     */
    usersUpdate: (id: number, user: UserInput, params: RequestParams = {}) =>
      this.request<UserResponse, void>({
        path: `/users/${id}`,
        method: "PUT",
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreate
     * @summary Create new user account
     * @request POST:/users
     */
    usersCreate: (user: UserInput, params: RequestParams = {}) =>
      this.request<UserResponseWithApiKey, void>({
        path: `/users`,
        method: "POST",
        body: user,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  rules = {
    /**
     * No description
     *
     * @tags Rules
     * @name RulesDetail
     * @summary Get details of the rule
     * @request GET:/rules/{id}
     * @secure
     */
    rulesDetail: (id: number, params: RequestParams = {}) =>
      this.request<RuleSimpleResponse, void>({
        path: `/rules/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthList
     * @summary Authenticate current user
     * @request GET:/auth
     * @secure
     */
    authList: (params: RequestParams = {}) =>
      this.request<
        {
          /** Authenticated user ID */
          id: number;
          /** Authenticated user name */
          name: string;
          /** Authenticated user e-mail */
          email?: string;
          /** Authenticated user roles */
          role?: string[];
        },
        StatusResponse
      >({
        path: `/auth`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
