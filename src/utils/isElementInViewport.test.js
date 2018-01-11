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

  describe('With offset:', () => {

    it('should return true when the element is fully in the viewport', () => {
      const result = isElementInViewport(
        {
          top: 1400,
          right: 1800,
          bottom: 1800,
          left: 1400
        },
        {
          top: 1000,
          right: 2000,
          bottom: 2000,
          left: 1000
        },
        {
          left: 50,
          top: 50,
          right: 50,
          bottom: 50
        }
      );
      expect(result).toBeTruthy();
    });

    describe('When element near the top of the viewport:', () => {

      it('should return true when the element is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 800,
            right: 2000,
            bottom: 1200,
            left: 1000
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 0,
            right: 0,
            bottom: 50
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return true when the offset is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 575,
            right: 2000,
            bottom: 975,
            left: 1000
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 0,
            right: 0,
            bottom: 50
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return false when the element and the offset is not in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 500,
            right: 2000,
            bottom: 900,
            left: 1000
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 0,
            right: 0,
            bottom: 50
          }
        );
        expect(result).toBeFalsy();
      });

    });

    describe('When element is near the bottom of the viewport:', () => {

      it('should return true when the element is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1800,
            right: 2000,
            bottom: 2200,
            left: 1000
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 50,
            right: 0,
            bottom: 0
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return true when the offset is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 2025,
            right: 2000,
            bottom: 2425,
            left: 1000
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 50,
            right: 0,
            bottom: 0
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return false when the element and the offset is not in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 2100,
            right: 2000,
            bottom: 2500,
            left: 1000
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 50,
            right: 0,
            bottom: 0
          }
        );
        expect(result).toBeFalsy();
      });

    });

    describe('When element is near the left of the viewport:', () => {

      it('should return true when the element is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1000,
            right: 1200,
            bottom: 2000,
            left: 800
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 0,
            right: 50,
            bottom: 0
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return true when the offset is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1000,
            right: 975,
            bottom: 2000,
            left: 575
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 0,
            right: 50,
            bottom: 0
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return false when the element and the offset is not in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1000,
            right: 900,
            bottom: 2000,
            left: 500
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 0,
            top: 0,
            right: 50,
            bottom: 0
          }
        );
        expect(result).toBeFalsy();
      });

    });

    describe('When element is near the right of the viewport:', () => {

      it('should return true when the element is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1000,
            right: 2200,
            bottom: 2000,
            left: 1800
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 50,
            top: 0,
            right: 0,
            bottom: 0
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return true when the offset is partially in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1000,
            right: 2425,
            bottom: 2000,
            left: 2025
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 50,
            top: 0,
            right: 0,
            bottom: 0
          }
        );
        expect(result).toBeTruthy();
      });

      it('should return false when the element and the offset is not in the viewport', () => {
        const result = isElementInViewport(
          {
            top: 1000,
            right: 2500,
            bottom: 2000,
            left: 2100
          },
          {
            top: 1000,
            right: 2000,
            bottom: 2000,
            left: 1000
          },
          {
            left: 50,
            top: 0,
            right: 0,
            bottom: 0
          }
        );
        expect(result).toBeFalsy();
      });

    });

  });

});
