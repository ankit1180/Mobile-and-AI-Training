import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Product extends Model {
  static table = 'products';
  @field('product_name') productName;
  @field('sf_id') sfId;
  @field('image') image;
  @field('price') price;
  @field('stock_qty') stockQty;
  @field('category') category;
}

export class BeatDay extends Model {
  static table = 'beatday';

  @field('sf_id') sfId;
  @field('beat_day_name') beatDayName;
  @field('beat_day_date') beatDayDate;
}

export class VisitDay extends Model {
  static table = 'visitdays';

  @field('sf_id') sfId;
  @field('beat_day_id') beatDayId;
  @field('visit_name') visitName;
  @field('visit_owner_number') visitOwnerNumber;
  @field('visit_store_name') visitStoreName;
  @field('visit_address') visitAddress;
  @field('visit_latitude') visitLatitude;
  @field('visit_longitude') visitLongitude;
  @field('visit_class') visitClass;
  @field('visit_channel') visitChannel;
  @field('visit_sub_channel') visitSubChannel;

  // new field
  @field('credit_limit') creditLimit;
  @field('credit_days') creditDays;
  @field('last_ordered') lastOrdered;
  @field('distributor') distributor;
}

export class Order extends Model {
  static table = 'order';

  @field('sf_id') sfId;
  @field('visit_id') visitId;
  @field('order_date') orderDate;
  @field('total_amount') totalAmount;
}

export class OrderItem extends Model {
  static table = 'orderitem';

  @field('sf_id') sfId;
  @field('order_id') orderId;
  @field('product_id') productId;
  @field('quantity') quantity;
}
