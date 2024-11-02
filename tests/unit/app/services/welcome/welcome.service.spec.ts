import { WelcomeService } from '@/app/services/welcome/welcome.service';

describe('WelcomeService', () => {
  describe('execute', () => {
    it('should return a Welcome', () => {
      const sut = new WelcomeService();

      const welcome = sut.execute();

      expect(welcome.message).toBe('Welcome to Paguei BFF!');
    });
  });
});
