import { Category } from '@/app/entities/value-objects/category';

describe('Category', () => {
  describe('from', () => {
    it('should return "essential" when raw value is "Essencial"', () => {
      const result = Category.from('Essencial');

      expect(result.value).toBe('essential');
    });

    it('should return "leisure" when raw value is "Lazer"', () => {
      const result = Category.from('Lazer');

      expect(result.value).toBe('leisure');
    });

    it('should return "investments" when raw value is "Investimentos"', () => {
      const result = Category.from('Investimentos');

      expect(result.value).toBe('investments');
    });

    it('should return "cards" when raw value is "Cartões"', () => {
      const result = Category.from('Cartões');

      expect(result.value).toBe('cards');
    });

    it('should return null when raw value is unmapped', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = Category.from('Dinheiro' as any);

      expect(result.value).toBeNull();
    });
  });
});
