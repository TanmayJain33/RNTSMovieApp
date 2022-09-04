describe('RNTSMovieApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have movie catch header', async () => {
    await expect(element(by.id('moviesHeader'))).toBeVisible();
  });
});
