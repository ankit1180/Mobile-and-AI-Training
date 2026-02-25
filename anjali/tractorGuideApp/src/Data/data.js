//dummy data of Search Drawer
export const data = {
  models: [
    'Mahindra 275 DI',
    'Mahindra 575 DI',
    'Sonalika DI 745 III',
    'Sonalika DI 750 III',
  ],
  hpCategory: [
    'Below 30 HP',
    '31-40 HP',
    '41-50 HP',
    '51-60 HP',
    'Above 60 HP',
  ],
  productHP: ['35 HP', '40 HP', '45 HP', '50 HP', '55 HP'],
  brand: ['Mahindra', 'Sonalika', 'John Deere', 'New Holland', 'Eicher'],
  modelGroup: ['Yuvo Series', 'Powertrac Series', 'DI Series'],
  variant: ['Yuvo 475 DI', 'Powertrac 439', 'DI 745'],
  rearTyre: ['12.4 x 28', '13.6 x 28', '14.9 x 28', '16.9 x 30'],
  drive: ['2WD', '4WD'],
};

//interdependent data
export const tractorData = [
  {
    brand: 'Mahindra',
    models: [
      {
        modelName: 'Mahindra OJA 2121',
        image: require('../assets/Image/image.png'),
        variants: [
          {
            variantName: 'OJA 2121 2WD',
            specifications: {
              enginePower: '21 HP',
              maximumTorque: '131 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Constant Mesh',
              gears: '8F + 2R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '12.4x28',
              liftingCapacityKg: 1500,
              ptoRPM: 540,
            },
          },
          {
            variantName: 'OJA 2121 4WD',
            specifications: {
              enginePower: '21 HP',
              maximumTorque: '135 Nm',
              engineCylinders: 3,
              driveType: '4WD',
              transmission: 'Constant Mesh',
              gears: '8F + 2R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '13.6x28',
              liftingCapacityKg: 1500,
              ptoRPM: 540,
            },
          },
        ],
      },
    ],
  },

  {
    brand: 'Sonalika',
    models: [
      {
        modelName: 'Sonalika DI 745 III',
        image: require('../assets/Image/tractor2.png'),
        variants: [
          {
            variantName: 'DI 745 III 2WD',
            specifications: {
              enginePower: '50 HP',
              maximumTorque: '190 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Constant Mesh',
              gears: '8F + 2R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '14.9x28',
              liftingCapacityKg: 2000,
              ptoRPM: 540,
            },
          },
        ],
      },
    ],
  },

  {
    brand: 'John Deere',
    models: [
      {
        modelName: 'John Deere 5050D',
        image: require('../assets/Image/image.png'),
        variants: [
          {
            variantName: '5050D 2WD',
            specifications: {
              enginePower: '50 HP',
              maximumTorque: '210 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Collarshift',
              gears: '8F + 4R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '16.9x28',
              liftingCapacityKg: 1600,
              ptoRPM: 540,
            },
          },
          {
            variantName: '5050D 2WD123',
            specifications: {
              enginePower: '50 HP',
              maximumTorque: '210 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Collarshift',
              gears: '8F + 4R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '16.9x28',
              liftingCapacityKg: 1600,
              ptoRPM: 540,
            },
          },
          {
            variantName: '5050D 2WD12345',
            specifications: {
              enginePower: '50 HP',
              maximumTorque: '210 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Collarshift',
              gears: '8F + 4R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '16.9x28',
              liftingCapacityKg: 1600,
              ptoRPM: 540,
            },
          },
          {
            variantName: '5050D 2WDMO',
            specifications: {
              enginePower: '50 HP',
              maximumTorque: '210 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Collarshift',
              gears: '8F + 4R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '16.9x28',
              liftingCapacityKg: 1600,
              ptoRPM: 540,
            },
          },
        ],
      },
    ],
  },

  {
    brand: 'New Holland',
    models: [
      {
        modelName: 'New Holland 3630 TX',
        image: require('../assets/Image/image.png'),
        variants: [
          {
            variantName: '3630 TX 2WD',
            specifications: {
              enginePower: '50 HP',
              maximumTorque: '215 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Constant Mesh',
              gears: '8F + 2R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '14.9x28',
              liftingCapacityKg: 1700,
              ptoRPM: 540,
            },
          },
        ],
      },
    ],
  },

  {
    brand: 'Eicher',
    models: [
      {
        modelName: 'Eicher 380',
        image: require('../assets/Image/image.png'),
        variants: [
          {
            variantName: 'Eicher 380 2WD',
            specifications: {
              enginePower: '40 HP',
              maximumTorque: '160 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Sliding Mesh',
              gears: '8F + 2R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '13.6x28',
              liftingCapacityKg: 1650,
              ptoRPM: 540,
            },
          },
        ],
      },
    ],
  },
  {
    brand: 'Eicher1',
    models: [
      {
        modelName: 'Eicher1 380',
        image: require('../assets/Image/image.png'),
        variants: [
          {
            variantName: 'Eicher 380 2WD',
            specifications: {
              enginePower: '40 HP',
              maximumTorque: '160 Nm',
              engineCylinders: 3,
              driveType: '2WD',
              transmission: 'Sliding Mesh',
              gears: '8F + 2R',
              brakeType: 'Oil Immersed',
              rearTyreSize: '13.6x28',
              liftingCapacityKg: 1650,
              ptoRPM: 540,
            },
          },
        ],
      },
    ],
  },
];
