export type CategoryValue = 'essential' | 'leisure' | 'investments' | 'cards';
type CategoryRawValue = 'Essencial' | 'Lazer' | 'Investimentos' | 'Cartões';

export class Category {
  private readonly _value: CategoryValue | null;

  private static readonly RAW_CATEGORY_MAPPING: Record<
    CategoryRawValue,
    CategoryValue
  > = {
    Essencial: 'essential',
    Lazer: 'leisure',
    Investimentos: 'investments',
    Cartões: 'cards',
  };

  private constructor(value: CategoryValue) {
    this._value = value;
  }

  static from(rawValue: CategoryRawValue) {
    return new Category(Category.RAW_CATEGORY_MAPPING[rawValue] || null);
  }

  get value() {
    return this._value;
  }
}
