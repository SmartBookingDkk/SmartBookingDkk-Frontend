// import { Booking } from '@/types/Booking';

// const bookingsMocked: Booking[] = [
//   {
//     id: 1,
//     bookingStartTime: '09:00',
//     bookingEndTime: '10:00',
//     bookingDate: new Date('2023-12-01'),
//     location: 'Room A',
//     customer: {
//       id: 4,
//       firstName: "Alex",
//       lastName: "Doe",
//       phone: "004540414603",
//       user: {
//         id: 4,
//         email: "alexanderbtcc@gmail.com",
//         password: null,
//         activationCode: null,
//         passwordResetCode: null,
//         active: true,
//         provider: null,
//         roles: null,
//       },
//       address: {
//         id: 4,
//         streetName: "Thyrasgade",
//         number: "4, 506",
//         city: "København",
//         postalCode: "2200",
//         country: "Danmark",
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       employee: {
//         id: 1,
//         firstName: "John",
//         lastName: "Doe",
//         phone: "429042+34+2",
//         user: {
//           id: 1,
//           email: "test@test.dk",
//           password: null,
//           activationCode: null,
//           passwordResetCode: null,
//           active: true,
//           provider: null,
//           roles: null,
//         },
//         business: null,
//         customers: null,
//         address: {
//           id: 4,
//           streetName: "Thyrasgade",
//           number: "4, 506",
//           city: "København",
//           postalCode: "2200",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         bookings: null,
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       bookings: null,
//       notes: null,
//       signupRequestMessage: "Bar gi mig terapi man!",
//       acceptedTimeStamp: new Date(),
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     employee: {
//       id: 1,
//       firstName: "John",
//       lastName: "Doe",
//       phone: "429042+34+2",
//       user: {
//         id: 1,
//         email: "test@test.dk",
//         password: null,
//         activationCode: null,
//         passwordResetCode: null,
//         active: true,
//         provider: null,
//         roles: null,
//       },
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       customers: null,
//       address: {
//         id: 4,
//         streetName: "Thyrasgade",
//         number: "4, 506",
//         city: "København",
//         postalCode: "2200",
//         country: "Danmark",
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       bookings: null,
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     category: {
//       id: 1,
//       name: "rygestop",
//       colorCode: "fff",
//       hours: 1,
//       minutes: 0,
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     invoice: {
//       id: 1,
//       price: 450,
//       dueDate: new Date(+1),
//       note: "Ska bar ha terapi",
//       isVat: true,
//       discount: 0,
//       isPaid: false,
//       booking: null,
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     createdDate: new Date(),
//     lastModifiedDate: new Date(),
//     version: 1,
//   },
  
//   // -------> another one

//   {
//     id: 2,
//     bookingStartTime: '09:00',
//     bookingEndTime: '10:00',
//     bookingDate: new Date('2023-12-01'),
//     location: 'Room A',
//     customer: {
//       id: 4,
//       firstName: "Alex",
//       lastName: "Doe",
//       phone: "004540414603",
//       user: {
//         id: 4,
//         email: "alexanderbtcc@gmail.com",
//         password: null,
//         activationCode: null,
//         passwordResetCode: null,
//         active: true,
//         provider: null,
//         roles: null,
//       },
//       address: {
//         id: 4,
//         streetName: "Thyrasgade",
//         number: "4, 506",
//         city: "København",
//         postalCode: "2200",
//         country: "Danmark",
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       employee: {
//         id: 1,
//         firstName: "John",
//         lastName: "Doe",
//         phone: "429042+34+2",
//         user: {
//           id: 1,
//           email: "test@test.dk",
//           password: null,
//           activationCode: null,
//           passwordResetCode: null,
//           active: true,
//           provider: null,
//           roles: null,
//         },
//         business: null,
//         customers: null,
//         address: {
//           id: 4,
//           streetName: "Thyrasgade",
//           number: "4, 506",
//           city: "København",
//           postalCode: "2200",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         bookings: null,
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       bookings: null,
//       notes: null,
//       signupRequestMessage: "Bar gi mig terapi man!",
//       acceptedTimeStamp: new Date(),
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     employee: {
//       id: 1,
//       firstName: "John",
//       lastName: "Doe",
//       phone: "429042+34+2",
//       user: {
//         id: 1,
//         email: "test@test.dk",
//         password: null,
//         activationCode: null,
//         passwordResetCode: null,
//         active: true,
//         provider: null,
//         roles: null,
//       },
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       customers: null,
//       address: {
//         id: 4,
//         streetName: "Thyrasgade",
//         number: "4, 506",
//         city: "København",
//         postalCode: "2200",
//         country: "Danmark",
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       bookings: null,
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     category: {
//       id: 1,
//       name: "rygestop",
//       colorCode: "fff",
//       hours: 1,
//       minutes: 0,
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     invoice: {
//       id: 1,
//       price: 450,
//       dueDate: new Date(+1),
//       note: "Ska bar ha terapi",
//       isVat: true,
//       discount: 0,
//       isPaid: false,
//       booking: null,
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     createdDate: new Date(),
//     lastModifiedDate: new Date(),
//     version: 1,
//   },

//   //--------> another one
//   {
//     id: 3,
//     bookingStartTime: '09:00',
//     bookingEndTime: '10:00',
//     bookingDate: new Date('2023-12-01'),
//     location: 'Room A',
//     customer: {
//       id: 4,
//       firstName: "Alex",
//       lastName: "Doe",
//       phone: "004540414603",
//       user: {
//         id: 4,
//         email: "alexanderbtcc@gmail.com",
//         password: null,
//         activationCode: null,
//         passwordResetCode: null,
//         active: true,
//         provider: null,
//         roles: null,
//       },
//       address: {
//         id: 4,
//         streetName: "Thyrasgade",
//         number: "4, 506",
//         city: "København",
//         postalCode: "2200",
//         country: "Danmark",
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       employee: {
//         id: 1,
//         firstName: "John",
//         lastName: "Doe",
//         phone: "429042+34+2",
//         user: {
//           id: 1,
//           email: "test@test.dk",
//           password: null,
//           activationCode: null,
//           passwordResetCode: null,
//           active: true,
//           provider: null,
//           roles: null,
//         },
//         business: null,
//         customers: null,
//         address: {
//           id: 4,
//           streetName: "Thyrasgade",
//           number: "4, 506",
//           city: "København",
//           postalCode: "2200",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         bookings: null,
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       bookings: null,
//       notes: null,
//       signupRequestMessage: "Bar gi mig terapi man!",
//       acceptedTimeStamp: new Date(),
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     employee: {
//       id: 1,
//       firstName: "John",
//       lastName: "Doe",
//       phone: "429042+34+2",
//       user: {
//         id: 1,
//         email: "test@test.dk",
//         password: null,
//         activationCode: null,
//         passwordResetCode: null,
//         active: true,
//         provider: null,
//         roles: null,
//       },
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       customers: null,
//       address: {
//         id: 4,
//         streetName: "Thyrasgade",
//         number: "4, 506",
//         city: "København",
//         postalCode: "2200",
//         country: "Danmark",
//         createdDate: new Date(),
//         lastModifiedDate: new Date(),
//         version: 1,
//       },
//       bookings: null,
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     category: {
//       id: 1,
//       name: "rygestop",
//       colorCode: "fff",
//       hours: 1,
//       minutes: 0,
//       business: {
//         id: 1,
//         name: "Din Forandring",
//         openingTime: "10.00",
//         closingTime: "18.00",
//         cvr: "1291092013",
//         address: {
//           id: 2,
//           streetName: "Farimagersgade",
//           number: "10",
//           city: "København",
//           postalCode: "1650",
//           country: "Danmark",
//           createdDate: new Date(),
//           lastModifiedDate: new Date(),
//           version: 1,
//         },
//         businessAccountDetails: {
//           id: 1,
//           bankName: "Danske Bank",
//           regNo: "1234",
//           accountNo: "00034243",
//           business: null,
//         },
//         isCustomersFreeToBook: false,
//         lastModifiedDate: new Date(),
//         timeOfCreation: new Date(),
//         version: 1,
//       },
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     invoice: {
//       id: 1,
//       price: 450,
//       dueDate: new Date(+1),
//       note: "Ska bar ha terapi",
//       isVat: true,
//       discount: 0,
//       isPaid: true,
//       booking: null,
//       createdDate: new Date(),
//       lastModifiedDate: new Date(),
//       version: 1,
//     },
//     createdDate: new Date(),
//     lastModifiedDate: new Date(),
//     version: 1,
//   },
// ];

// export default bookingsMocked;