import { LootTable } from "../utils/lootTable";
import { Item, ItemType } from "./types";

export const donateItems: Item[] = [
  {
    type: ItemType.lite_permanent,
    name: "Lite (Навсегда)",
    desc: `- Товаров на продажу: 10
- Выделенных товаров: 1
- Услуг: 2
- Выделенных услуг: 1
- Корона на сайте
- Роль Lite в дискорде
- Вы поддержите разработчиков :)`,
    images: ["https://i.postimg.cc/500NgtnS/lite.png"],
    cost: 2290,
  },
  {
    type: ItemType.lite_year,
    name: "Lite (Год)",
    desc: ``,
    images: ["https://i.postimg.cc/500NgtnS/lite.png"],
    cost: 1690,
  },
  {
    type: ItemType.lite_halfyear,
    name: "Lite (Полгода)",
    desc: ``,
    images: ["https://i.postimg.cc/500NgtnS/lite.png"],
    cost: 349,
  },
  {
    type: ItemType.lite_month,
    name: "Lite (Месяц)",
    desc: ``,
    images: ["https://i.postimg.cc/500NgtnS/lite.png"],
    cost: 69, // DEFAULT
  },
  {
    type: ItemType.lite_week,
    name: "Lite (Неделя)",
    desc: ``,
    images: ["https://i.postimg.cc/500NgtnS/lite.png"],
    cost: 35,
  },
  {
    type: ItemType.premium_permanent,
    name: "Premium (Навсегда)",
    desc: `- Товаров на продажу: 15
- Выделенных товаров: 3
- Услуг: 5
- Выделенных услуг: 3
- Корона на сайте
- Роль Premium в дискорде
- Доступ к дискорд каналу, где можно выбирать первым, что добавить на сайт
- Возможность редактирования баннера
- Вы поддержите разработчиков :)`,
    images: ["https://i.postimg.cc/SsvQvpPF/premium.png"],
    cost: 2990,
  },
  {
    type: ItemType.premium_year,
    name: "Premium (Год)",
    desc: ``,
    images: ["https://i.postimg.cc/SsvQvpPF/premium.png"],
    cost: 2490,
  },
  {
    type: ItemType.premium_halfyear,
    name: "Premium (Полгода)",
    desc: ``,
    images: ["https://i.postimg.cc/SsvQvpPF/premium.png"],
    cost: 499,
  },
  {
    type: ItemType.premium_month,
    name: "Premium (Месяц)",
    desc: ``,
    images: ["https://i.postimg.cc/SsvQvpPF/premium.png"],
    cost: 99, // DEFAULT
  },
  {
    type: ItemType.premium_week,
    name: "Premium (Неделя)",
    desc: ``,
    images: ["https://i.postimg.cc/SsvQvpPF/premium.png"],
    cost: 49,
  },
  {
    type: ItemType.subscription_case,
    name: "Кейс с подписками",
    desc: `
Вы можете получить:
- Часть потраченных монет
- Lite подписку (навсегда)
- Lite подписку (на год)
- Lite подписку (на полгода)
- Lite подписку (на месяц)
- Lite подписку (неделя)
- Premium подписку (навсегда)
- Premium подписку (на год)
- Premium подписку (на полгода)
- Premium подписку (на месяц)
- Premium подписку (неделя)
    `,
    cost: 99,
    images: ["https://i.postimg.cc/fbMb3CdF/chest.png"],
    isCase: true,
    lootTable: new LootTable([
      { type: ItemType.premium_permanent, weight: 1 },
      { type: ItemType.premium_year, weight: 5 },
      { type: ItemType.premium_halfyear, weight: 10 },
      { type: ItemType.premium_month, weight: 20 },
      { type: ItemType.premium_week, weight: 40 },
      { type: ItemType.lite_permanent, weight: 5 },
      { type: ItemType.lite_year, weight: 10 },
      { type: ItemType.lite_halfyear, weight: 25 },
      { type: ItemType.lite_month, weight: 50 },
      { type: ItemType.lite_week, weight: 100 },
      { type: ItemType.money, weight: 500 },
    ]),
  },
  /*{
    type: ItemType.lite_day_gift,
    name: "Lite на день",
    desc: `
Бесплатная подписка Lite на день
    `, // 
    cost: 0,
    images: ["https://i.postimg.cc/500NgtnS/lite.png"],
  },*/
];
