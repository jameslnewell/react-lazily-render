import isElementInViewport from './isElementInViewport';

describe('isElementInViewport()', () => {

  it('should return true when the element is fully in the viewport', () => {
    const result = isElementInViewport(
      {
        left: 0,
        top: 100,
        right: 100,
        bottom: 300
      },
      {
        left: 0,
        top: 0,
        right: 300,
        bottom: 300
      }
    );
    expect(result).toBeTruthy();
  });

  it('should return true when the bottom half of the element is in the viewport', () => {
    const result = isElementInViewport(
      {
        left: 0,
        top: 100,
        right: 100,
        bottom: 200
      },
      {
        left: 0,
        top: 150,
        right: 300,
        bottom: 350
      }
    );
    expect(result).toBeTruthy();
  });

  it('should return true when the top half of the element is in the viewport', () => {
    const result = isElementInViewport(
      {
        left: 0,
        top: 100,
        right: 100,
        bottom: 300
      },
      {
        left: 0,
        top: 150,
        right: 300,
        bottom: 200
      }
    );
    expect(result).toBeTruthy();
  });

  it('should return false when the element is fully above the viewport', () => {
    const result = isElementInViewport(
      {
        left: 0,
        top: 100,
        right: 300,
        bottom: 200
      },
      {
        left: 0,
        top: 300,
        right: 1000,
        bottom: 1100
      }
    );
    expect(result).toBeFalsy();
  });

  it('should return false when the element is fully below the viewport', () => {
    const result = isElementInViewport(
      {
        left: 0,
        top: 900,
        right: 300,
        bottom: 1000
      },
      {
        left: 0,
        top: 0,
        right: 1000,
        bottom: 800
      }
    );
    expect(result).toBeFalsy();
  });

});
