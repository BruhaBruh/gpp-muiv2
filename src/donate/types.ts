import { LootTable } from "../utils/lootTable";

export enum ItemType {
  lite_permanent, // 0
  lite_year, // 1
  lite_halfyear, // 2
  lite_month, // 3
  lite_week, // 4
  premium_permanent, // 5
  premium_year, // 6
  premium_halfyear, // 7
  premium_month, // 8
  premium_week, // 9
  subscription_case, // 10
  money, // 11
  lite_day_gift, // 12
}

export interface Item {
  type: ItemType;
  isCase?: boolean;
  isServerItem?: boolean;
  lootTable?: LootTable;
  desc: string;
  name: string;
  cost: number;
  images: string[];
}
