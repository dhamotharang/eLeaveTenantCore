import { Injectable } from "@nestjs/common";
import { SubscriptionDbService } from '../../common/db/table.db.service';
import { CreateSubscriptionDTO } from './dto/create-subscription.dto';
import { UserMainModel } from '../../common/model/user-main.model';
import { SubscriptionModel } from '../../common/model/subscription.model';
import { Resource } from "../../common/model/resource.model";
import { v1 } from "uuid";
import { UpdateSubscriptionDTO } from './dto/update-subscription.dto';
import { setUpdateData } from "../../common/helper/basic-function";

/**
 * Service subscription
 *
 * @export
 * @class SubscriptionService
 */
@Injectable()
export class SubscriptionService {
  /**
   *Creates an instance of SubscriptionService.
   * @param {SubscriptionDbService} subscriptionDbService DB service for subscription
   * @memberof SubscriptionService
   */
  constructor(private readonly subscriptionDbService: SubscriptionDbService) { }

  /**
   * Create subscription
   *
   * @param {[CreateSubscriptionDTO, UserMainModel]} [subscriptionData, req]
   * @returns
   * @memberof SubscriptionService
   */
  public createSubscription([subscriptionData, req]: [CreateSubscriptionDTO, UserMainModel]) {
    const data = new SubscriptionModel();

    data.SUBSCRIPTION_GUID = v1();
    data.SUBSCRIPTION_LABEL = subscriptionData.subscriptionLabel;
    this.inputDataSubscription([data, subscriptionData]);
    data.CREATION_USER_GUID = req.USER_GUID;

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.subscriptionDbService.createByModel([resource, [], [], []]);
  }

  /**
   * Get subscription
   *
   * @returns
   * @memberof SubscriptionService
   */
  public getSubscription() {
    return this.subscriptionDbService.findByFilterV4([[], [], null, null, null, [], null]);
  }

  /**
   * Update subscription
   *
   * @param {[UpdateSubscriptionDTO, UserMainModel]} [editSubscriptionData, req]
   * @returns
   * @memberof SubscriptionService
   */
  public updateSubscription([editSubscriptionData, req]: [UpdateSubscriptionDTO, UserMainModel]) {
    const data = new SubscriptionModel

    data.SUBSCRIPTION_GUID = editSubscriptionData.subscriptionGuid;
    data.REMARKS = editSubscriptionData.remarks;
    this.inputDataSubscription([data, editSubscriptionData]);
    setUpdateData([data, req.USER_GUID]);

    const resource = new Resource(new Array);
    resource.resource.push(data);

    return this.subscriptionDbService.updateByModel([resource, [], [], []]);
  }

  /**
   * Input data subscription to create and update
   *
   * @param {([SubscriptionModel, UpdateSubscriptionDTO | CreateSubscriptionDTO])} [model, data]
   * @returns
   * @memberof SubscriptionService
   */
  public inputDataSubscription([model, data]: [SubscriptionModel, UpdateSubscriptionDTO | CreateSubscriptionDTO]) {

    model.CUSTOMER_GUID = data.customerGuid;
    model.PLAN = data.subscriptionPlan;
    model.STATUS = data.subscriptionStatus;
    model.QUOTA = data.subscriptionQuota;
    model.ACTIVATION_DATE = data.activationDate;
    model.LAST_BILLING_DATE = data.lastBillingDate;
    model.NEXT_BILLING_DATE = data.nextBillingDate;
    model.RECURR_INTERVAL = data.recurrInterval;
    model.RECURR_INTERVAL_VAL = data.recurrIntervalVal;
    model.BILLING_CYCLE = data.billingCycle;

    return model;
  }

}