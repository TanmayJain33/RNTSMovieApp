describe('RNTSMovieApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have movie catch header', async () => {
    await expect(element(by.id('moviesHeader'))).toBeVisible();
  });

  it('should have discover movies section', async () => {
    await expect(element(by.id('discoverMovies'))).toBeVisible();
  });

  it('should have trending movies section', async () => {
    await expect(element(by.id('trendingMovies'))).toBeVisible();
  });

  it('should have top rated movies section', async () => {
    await element(by.id('movies')).swipe('up');
    await expect(element(by.id('topRatedMovies'))).toBeVisible();
    await element(by.id('movies')).swipe('down');
  });

  it('should swipe discover movies back and forth', async () => {
    await expect(element(by.id('discoverMovies'))).toBeVisible();
    await element(by.id('discoverMovies')).swipe('left');
    await element(by.id('discoverMovies')).swipe('left');
    await element(by.id('discoverMovies')).swipe('right');
    await element(by.id('discoverMovies')).swipe('right');
    await expect(element(by.id('discoverMovies'))).toBeVisible();
  });

  it('should have favorite icon and clicking on it will add it to favorites and remove it from favorites', async () => {
    await expect(element(by.id('trendingMovies'))).toBeVisible();
    await expect(element(by.id('movieFavoriteIcon616037'))).toBeVisible();
    await element(by.id('movieFavoriteIcon616037')).tap();
    await expect(element(by.text('Added to Favorites'))).toBeVisible();
    await element(by.text('OK')).tap();
    await element(by.id('movieFavoriteIcon616037')).tap();
    await expect(element(by.text('Removed from Favorites'))).toBeVisible();
    await element(by.text('OK')).tap();
  });
});
