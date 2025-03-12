export const universityData = {
  headers: [
    "University Name",
    "University ID",
    "No. of Students",
    "No. of Teachers",
    "Edit",
  ],
};

export const addUniversity = [
  {
    name: "universityName",
    label: "University Name",
    type: "text",
    placeholder: "Enter University Name",
  },

  {
    name: "universityAdmin",
    label: "University Admin",
    type: "text",
    placeholder: "Enter Admin Name",
  },
  {
    name: "universityAdminEmail",
    label: "University Admin Email",
    type: "email",
    placeholder: "Enter Admin Email",
  },
  { name: "email", label: "Email", type: "email", placeholder: "Enter Email" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter Phone Number",
  },
  {
    name: "streetAddress",
    label: "Street Address",
    type: "text",
    placeholder: "Enter Street Address",
  },
  { name: "city", label: "City", type: "text", placeholder: "Enter City" },
  { name: "state", label: "State", type: "text", placeholder: "Enter State" },
  {
    name: "zipcode",
    label: "Zipcode",
    type: "text",
    placeholder: "Enter Zipcode",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter Password",
  },
];

export const editUniversity = [
  {
    name: "universityName",
    label: "University Name",
    type: "text",
    placeholder: "Enter University Name",
  },

  {
    name: "universityAdmin",
    label: "University Admin",
    type: "text",
    placeholder: "Enter Admin Name",
  },
  {
    name: "universityAdminEmail",
    label: "University Admin Email",
    type: "email",
    placeholder: "Enter Admin Email",
  },
  { name: "email", label: "Email", type: "email", placeholder: "Enter Email" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter Phone Number",
  },
  {
    name: "streetAddress",
    label: "Street Address",
    type: "text",
    placeholder: "Enter Street Address",
  },
  { name: "city", label: "City", type: "text", placeholder: "Enter City" },
  { name: "state", label: "State", type: "text", placeholder: "Enter State" },
  {
    name: "zipcode",
    label: "Zipcode",
    type: "text",
    placeholder: "Enter Zipcode",
  },
];

export const addCourse = [
  {
    name: "name",
    label: "Course Name",
    type: "text",
    placeholder: "Enter Course Name",
  },
  {
    name: "batch",
    label: "Batch ID",
    type: "text",
    placeholder: "Enter Batch (e.g., 21B)",
    pattern: /^[0-9]{2}[A-Z]$/,
    validationMessage:
      "Batch ID must be in the format: two digits followed by a letter (e.g., 21B)",
  },
  {
    name: "group",
    label: "Department",
    type: "text",
    placeholder: "Enter Department Name",
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    placeholder: "Enter Section (e.g., A)",
    pattern: /^[A-Z]$/, // Ensures a single capital letter
    validationMessage:
      "Section must be a single capital letter (e.g., A, B, C)",
  },
];

export const createAssignment = [
  {
    name: "name",
    label: "Assignment Name",
    type: "text",
    placeholder: "Enter Assignment Name",
  },
  {
    name: "deadline",
    label: "Deadline",
    type: "date",
    placeholder: "Enter Deadline",
  },
  {
    name: "time",
    label: "Time",
    type: "time",
    placeholder: "Enter Time",
    defaultValue: "12:00",
  }, // Default time value
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter Description Name",
  },
  {
    name: "grade",
    label: "Grade",
    type: "number",
    placeholder: "Enter Grade",
    min: 0, // Minimum grade value
    max: 10, // Maximum grade value
  },
];
