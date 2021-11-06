import { ItemType } from "../donate/types";

export class LootTable {
  table: LootItem[] = [];
  constructor(table: LootItem[]) {
    this.table = table;
  }

  choose(): LootItem | null {
    let totalWeight = 0;
    this.table.forEach((item) => {
      totalWeight += item.weight;
    });
    let randomNumber = Math.floor(Math.random() * totalWeight + 1);

    let weight = 0;
    let chosenItem: LootItem | null = null;
    this.table.forEach((item) => {
      if (chosenItem) return;
      if (item.weight <= 0) return;
      weight += item.weight;
      if (randomNumber <= weight) {
        chosenItem = item;
      }
    });

    return chosenItem;
  }

  getTable(): LootItem[] {
    let totalWeight = 0;
    this.table.forEach((item) => {
      totalWeight += item.weight;
    });

    return this.table.map((item) => {
      item.chance = parseFloat(((item.weight / totalWeight) * 100).toFixed(2));
      return item;
    });
  }
}

export interface LootItem {
  type: ItemType;
  weight: number;
  chance?: number;
}
