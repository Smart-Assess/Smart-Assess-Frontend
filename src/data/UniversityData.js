export const universityData = {
  headers: [
    "University Name",
    "University ID",
    "No. of Students",
    "No. of Teachers",
    "Status",
    "Edit"
  ],
  data: [
    {
      id: "id-0023",
      name: "International University",
      students: 185,
      teachers: 556,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 196,
      teachers: 196,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 196,
      teachers: 196,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 196,
      teachers: 196,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 196,
      teachers: 196,
      status: "Inactive",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 196,
      teachers: 196,
      status: "Inactive",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 703,
      teachers: 536,
      status: "Inactive",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 429,
      teachers: 826,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 600,
      teachers: 130,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "id-0023",
      name: "International University",
      students: 994,
      teachers: 561,
      status: "Active",
      image: "https://via.placeholder.com/50",
    },
  ],
};



export const addUniversity = [
  { name: 'universityName', label: 'University Name', type: 'text', placeholder: 'Enter University Name' },
  { name: 'universityId', label: 'University Id', type: 'text', placeholder: 'Enter University Id' },
  { name: 'universityAdmin', label: 'University Admin', type: 'text', placeholder: 'Enter Admin Name' },
  { name: 'universityAdminEmail', label: 'University Admin Email', type: 'email', placeholder: 'Enter Admin Email' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
  { name: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: 'Enter Phone Number' },
  { name: 'streetAddress', label: 'Street Address', type: 'text', placeholder: 'Enter Street Address' },
  { name: 'city', label: 'City', type: 'text', placeholder: 'Enter City' },
  { name: 'state', label: 'State', type: 'text', placeholder: 'Enter State' },
  { name: 'zipcode', label: 'Zipcode', type: 'text', placeholder: 'Enter Zipcode' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm Password' },
];


export const addCourse = [
  { name: 'name', label: 'Course Name', type: 'text', placeholder: 'Enter Course Name' },
  {
    name: 'batch',
    label: 'Batch ID',
    type: 'text',
    placeholder: 'Enter Batch (e.g., 21B)',
    pattern: /^[0-9]{2}[A-Z]$/,
    validationMessage: 'Batch ID must be in the format: two digits followed by a letter (e.g., 21B)',
  },
  { name: 'group', label: 'Department', type: 'text', placeholder: 'Enter Department Name' },
  {
    name: 'section',
    label: 'Section',
    type: 'text',
    placeholder: 'Enter Section (e.g., A)',
    pattern: /^[A-Z]$/, // Ensures a single capital letter
    validationMessage: 'Section must be a single capital letter (e.g., A, B, C)',
  },
 
];




export const createAssignment = [
  { name: 'assignmentName', label: 'Assignment Name', type: 'text', placeholder: 'Enter Assigment Name' },
  { name: 'deadline', label: 'Deadline', type: 'date', placeholder: 'Enter Deadline' },
  { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter Description Name' },
  { name: 'grade', label: 'Grade', type: 'number', placeholder: 'Enter Grade' },
  
];
