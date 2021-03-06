// import { ROLES } from './constants/constants';

export const dummyUser = {
  name: 'Tara Mckenzie',
  role: {
    isAdmin: 'true',
    isPropertyManager: 'false',
    isStaff: 'false'
  },
  username: 'tmckenzie',
  email: 'taramckenzie@pm.com',
  phone: '503-823-3333'
};

export const tenants = [
  {
    id: 'TN00-000000-0001',
    dateCreated: 'Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)',
    dateUpdated: 'Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)',
    firstName: 'Brenden',
    lastName: 'Smith',
    name: 'Brenden Smith',
    phone: '555-123-4567',
    address: 'Magnolia Park, Unit #283', // summary version doesn't require all of the property and lease info
    staff: [
      {
        id: 'e10ae4004dcc4f8292719dbad5b6c5c8',
        name: 'Jerry Seinfeld'
      }
    ],
    ticketsTotals: {
      open: '1',
      closed: '3',
      archived: '3'
    },
    ticketsStatus: 'in-progress' // business logic to determine if tenant has open or HIGH-urgency tickets
  }
  // {
  //   id: 'tenant-01',
  //   name: 'Brenden Smith',
  //   address: 'Magnolia Park, Unit #2',
  //   number: '555-123-4567',
  //   staff: [
  //     {
  //       name: 'Tom Smith'
  //     },
  //     {
  //       name: 'Cassidy Erickson'
  //     }
  //   ],
  //   // status: 'in-progress'
  //   status: 'high'
  // },
  // {
  //   id: 'tenant-02',
  //   name: 'Alex Alder',
  //   address: 'Magnolia Park, Unit #2',
  //   number: '503-235-5333',
  //   staff: [
  //     {
  //       name: 'Tom Smith'
  //     },
  //     {
  //       name: 'Cassidy Erickson'
  //     }
  //   ]
  // },
  // {
  //   id: 'tenant-03',
  //   name: 'Beverly Burnside',
  //   address: 'Baker Building, Unit #12',
  //   number: '503-731-3100',
  //   staff: [
  //     {
  //       name: 'Tom Smith'
  //     },
  //     {
  //       name: 'Cassidy Erickson'
  //     }
  //   ]
  // },
  // {
  //   id: 'tenant-04',
  //   name: 'Donald Davis',
  //   address: 'Magnolia Park, Unit #6',
  //   number: '503-731-3100',
  //   staff: [
  //     {
  //       name: 'Tom Smith'
  //     },
  //     {
  //       name: 'Cassidy Erickson'
  //     }
  //   ]
  // },
  // {
  //   id: 'tenant-05',
  //   name: 'Bruce Wayne',
  //   address: 'Garden Blocks, Unit #221B',
  //   number: '503-469-8620',
  //   staff: [
  //     {
  //       name: 'Tom Smith'
  //     }
  //   ]
  // },
  // {
  //   id: 'tenant-06',
  //   name: 'Andrew Wiggins',
  //   address: 'Mountain View, #42',
  //   number: '503-469-8620',
  //   staff: [
  //     {
  //       name: 'Tom Smith'
  //     },
  //     {
  //       name: 'Cassidy Erickson'
  //     }
  //   ]
  // }
];

export const propertyManagers = [
  {
    id: 'propertyManager-01',
    name: 'Tom Smith',
    tenants: [
      {
        id: 'tenant-02',
        name: 'Alex Alder'
      },
      {
        id: 'tenant-03',
        name: 'Beverly Burnside'
      },
      {
        id: 'tenant-01',
        name: 'Brenden Smith'
      }
    ],
    number: '503-654-9087',
    tickets: ['K-0089ttxqQX-2', 'K-0089ttxqQX-4']
  },
  {
    id: 'propertyManager-02',
    name: 'Miles Prower',
    number: '503-555-1234',
    tenants: [
      {
        id: 'tenant-01',
        name: 'Brenden Smith'
      }
    ],
    tickets: []
  }
];

export const properties = [
  {
    id: 'property-01',
    name: 'Garden Blocks',
    address: '1654 NE 18th Ave. Portland OR, 97218',
  },
  {
    id: 'property-02',
    name: 'Magnolia Park',
    address: '2200 SE Main St. Portland OR, 97218'
  },
  {
    id: 'property-03',
    name: 'Mountain View',
    address: '311 Sandy Blvd. Portland OR, 97218'
  }
];

export const users = [
  {
    name: 'Jerry Seinfeld',
    firstName: 'Jerry',
    lastName: 'Seinfeld',
    email: 'jerry@herry.com',
    id: '45d9b1ac78f8464082edccb7e4d81e26',
    phone: '541-123-4567',
    role: {
      isAdmin: 'false',
      isPropertyManager: 'false',
      isStaff: 'true'
    }
  },
  {
    name: 'Taika Waititi',
    firstName: 'Taika',
    lastName: 'Waititi',
    email: 'grandmaster@ragnarok.com',
    id: '2352146214631461',
    phone: '541-123-4567',
    role: {
      isAdmin: 'false',
      isPropertyManager: 'false',
      isStaff: 'true'
    }
  }
];

export const tickets = [
  {
    dateCreated: 'Wed Aug 29 2018 10:29:51 GMT-0700 (Pacific Daylight Time)',
    urgency: 'High',
    // status: {
    //   isOpen: true,
    //   closedByPropertyManager: false,
    //   recieved: false,
    //   closedByOther: false,
    //   closedByStaff: false,
    //   inProgress: false
    // },
    status: 'In Progress',
    id: '3ed187ec7e2b4dcb95fa1916fc774802',
    issue: 'Unpaid Rent',
    tenant: {
      dateCreated: 'Thu Aug 23 2018 16:40:35 GMT-0700 (Pacific Daylight Time)',
      dateUpdated: 'Thu Aug 23 2018 15:54:48 GMT-0700 (Pacific Daylight Time)',
      name: 'Will Smith',
      lastName: 'Smith',
      firstName: 'Will',
      phone: '503-555-1234',
      lease: {
        propertyId: 'johnny_test',
        dateStart: 'Sat Oct 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)',
        unit: '283',
        dateUpdated: 'Thu Sep 06 2018 11:00:08 GMT-0700 (Pacific Daylight Time)'
      },
      property: {
        id: 'johnny_test',
        zipCode: 12340,
        city: 'portland',
        addressOne: '1234 Street dr.',
        state: 'wa',
        name: 'buildingish',
        addressTwo: 'sweet 4'
      }
    },
    sender: {
      name: 'Jerry Seinfeld',
      firstName: 'Jerry',
      lastName: 'Seinfeld',
      email: 'jerry@herry.com',
      id: '45d9b1ac78f8464082edccb7e4d81e26',
      phone: '541-123-4567',
      role: {
        isAdmin: 'false',
        isPropertyManager: 'true',
        isStaff: 'false'
      }
    },
    users: [
      {
        name: 'Jerry Seinfeld',
        firstName: 'Jerry',
        lastName: 'Seinfeld',
        email: 'jerry@herry.com',
        id: '45d9b1ac78f8464082edccb7e4d81e26',
        phone: '541-123-4567',
        role: {
          isAdmin: 'false',
          isPropertyManager: 'true',
          isStaff: 'false'
        }
      },
      {
        name: 'johnny alt',
        firstName: 'johnny',
        lastName: 'alt',
        email: 'johnny@test.com',
        id: 'johnny_test',
        phone: '541-123-4567',
        role: {
          isPropertyManager: 'true',
          isStaff: 'true',
          isAdmin: 'true'
        }
      }
    ],
    notes: [
      {
        id: 'c3827a1c2fc9490b8e8d8a9efc171d3f',
        dateCreated:
          'Wed Aug 29 2018 10:29:51 GMT-0700 (Pacific Daylight Time)',
        message: 'Notes body',
        name: 'Tara Mckenzie'
      }
    ]
  }
  /*
  {
    id: 'K-0089ttxqQX-1',
    issue: 'Unpaid Rent',
    tenant: {
      address: 'Magnolia Park, Unit #2',
      name: 'Brenden Smith',
      number: '503-123-4567'
    },
    sender: {
      name: 'Donald Davis',
      number: '541-123-4567'
    },
    sent: new Date('2017/12/19').toString(),
    status: 'New',
    urgency: 'High',
    notes: [
      {
        id: 'K-0089ttxqQX-1',
        name: 'Tara Mckenzie',
        sent: 'Just now',
        message: 'Thanks, Tom.'
      },
      {
        id: 'K-0089ttxqQX-2',
        name: 'Tom Smith',
        sent: 'Today 3:20pm',
        message:
          'I plan to meet with Megan today. Thank you for contacting JOIN with this issue.'
      },
      {
        id: 'K-0089ttxqQX-3',
        name: 'Tara Mckenzie',
        sent: 'Today 12:40pm',
        message:
          'This is the third time we have had to deal with late rent. Please speak to tenant ASAP.'
      }
    ]
  },
  {
    id: 'K-0089ttxqQX-2',
    issue: 'Property Damage',
    tenant: {
      address: 'Magnolia Park, Unit #2',
      name: 'Alex Alder',
      number: '503-555-1234'
    },
    sender: {
      name: 'Tom Smith',
      number: '541-123-4567'
    },
    sent: new Date('2017/12/19').toString(),
    status: 'New',
    urgency: 'Low',
    notes: []
  },
  {
    id: 'K-0089ttxqQX-3',
    issue: 'Compliment',
    tenant: {
      address: 'Baker Building, Unit #12',
      name: 'Beverly Burnside',
      number: '503-123-4567'
    },
    sender: {
      firstName: 'Tara',
      lastName: 'Mckenzie',
      number: '541-123-4567'
    },
    sent: new Date('2017/12/17').toString(),
    notes: []
  },
  {
    id: 'K-0089ttxqQX-4',
    issue: 'Unpaid Rent',
    tenant: {
      address: 'Magnolia Park, Unit #6',
      name: 'Donald Davis',
      number: '503-123-4567'
    },
    sender: {
      name: 'Tom Smith',
      number: '541-123-4567'
    },
    sent: new Date('2017/12/16').toString(),
    status: 'In Progress',
    flagged: 'true', // mimicing what's likely to come from the database...
    notes: []
  },
  {
    id: 'K-0089ttxqQX-5',
    issue: 'Property Damage',
    tenant: {
      address: 'Mountain View, #42',
      name: 'Andrew Wiggins',
      number: '503-123-4567'
    },
    sender: {
      name: 'Alex Alder',
      number: '541-123-4567'
    },
    sent: new Date('2017/12/16').toString(),
    status: 'In Progress',
    flagged: 'true', // mimicing what's likely to come from the database...
    notes: []
  },
  {
    id: 'K-0089ttxqQX-6',
    issue: 'Unauthorized Guests',
    tenant: {
      address: 'Garden Blocks, Unit #221B',
      name: 'Bruce Wayne',
      number: '503-123-4567'
    },
    sender: {
      name: 'Alex Alder',
      number: '541-123-4567'
    },
    sent: new Date('2017/12/15').toString(),
    status: 'In Progress',
    flagged: 'true', // mimicing what's likely to come from the database...
    notes: []
  },
  {
    id: 'A-0000000-0003',
    issue: 'Property Damage',
    tenant: {
      name: 'Megan Collins'
    },
    sender: {
      name: 'Tara Mckenzie'
    },
    sent: Date.parse(new Date('2017/12/19')),
    status: 'Closed'
  },
  {
    id: 'A-0000000-0002',
    issue: 'Compliment',
    tenant: {
      name: 'Megan Collins'
    },
    sender: {
      name: 'Tara Mckenzie'
    },
    sent: Date.parse(new Date('2017/12/19')),
    status: 'Closed'
  },
  {
    id: 'A-0000000-0001',
    issue: 'Neighbor Disputes',
    tenant: {
      name: 'Andrew Wiggins'
    },
    sender: {
      name: 'Tara Mckenzie'
    },
    sent: Date.parse(new Date('2017/11/02')),
    status: 'Closed'
  }
*/
];
