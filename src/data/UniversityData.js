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
    pattern: /^[a-zA-Z\s]{3,50}$/,
    validationMessage: "University name must be between 3 to 50 characters.",
  },
  {
    name: "email",
    label: "University Email",
    type: "email",
    placeholder: "Enter University Email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    validationMessage: "Enter a valid email address.",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter Phone Number",
    pattern: /^[0-9]{11}$/,
    validationMessage: "Phone number must be exactly 11 digits.",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Enter State",
    pattern: /^[a-zA-Z\s]{2,50}$/,
    validationMessage: "State must be between 2 to 50 characters.",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter City",
    pattern: /^[a-zA-Z\s]{2,50}$/,
    validationMessage: "City must be between 2 to 50 characters.",
  },
  {
    name: "streetAddress",
    label: "Street Address",
    type: "text",
    placeholder: "Enter Street Address",
    pattern: /^.{5,100}$/,
    validationMessage: "Street address must be between 5 to 100 characters.",
  },
  {
    name: "zipcode",
    label: "Zip Code",
    type: "text",
    placeholder: "Enter Zip Code",
    pattern: /^[0-9]{5,6}$/,
    validationMessage: "Zip code must be 5 or 6 digits.",
  },
  {
    name: "universityAdmin",
    label: "University Admin Name",
    type: "text",
    placeholder: "Enter Admin Name",
    pattern: /^[a-zA-Z\s]{3,50}$/,
    validationMessage: "Admin name must be between 3 to 50 characters.",
  },
  {
    name: "universityAdminEmail",
    label: "Admin Email",
    type: "email",
    placeholder: "Enter Admin Email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    validationMessage: "Enter a valid email address.",
  },
  {
    name: "password",
    label: "Admin Password",
    type: "password",
    placeholder: "Enter Password",
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    validationMessage:
      "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  },
];

export const editUniversity = [
  {
    name: "universityName",
    label: "University Name",
    type: "text",
    placeholder: "Enter University Name",
    pattern: /^[a-zA-Z\s]{3,50}$/,
    validationMessage: "University name must be between 3 to 50 characters.",
  },

  {
    name: "universityAdmin",
    label: "University Admin",
    type: "text",
    placeholder: "Enter Admin Name",
    pattern: /^[a-zA-Z\s]{3,50}$/,
    validationMessage: "Admin name must be between 3 to 50 characters.",
  },
  {
    name: "universityAdminEmail",
    label: "University Admin Email",
    type: "email",
    placeholder: "Enter Admin Email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    validationMessage: "Enter a valid email address.",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    validationMessage: "Enter a valid email address.",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter Phone Number",
    pattern: /^[0-9]{11}$/,
    validationMessage: "Phone number must be exactly 11 digits.",
  },
  {
    name: "streetAddress",
    label: "Street Address",
    type: "text",
    placeholder: "Enter Street Address",
    pattern: /^.{5,100}$/,
    validationMessage: "Street address must be between 5 to 100 characters.",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter City",
    pattern: /^[a-zA-Z\s]{2,50}$/,
    validationMessage: "City must be between 2 to 50 characters.",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Enter State",
    pattern: /^[a-zA-Z\s]{2,50}$/,
    validationMessage: "State must be between 2 to 50 characters.",
  },
  {
    name: "zipcode",
    label: "Zipcode",
    type: "text",
    placeholder: "Enter Zipcode",
    pattern: /^[0-9]{5,6}$/,
    validationMessage: "Zip code must be 5 or 6 digits.",
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
    type: "select", // changed from text to select
    options: [
      { label: "Computer Science", value: "CSE" },
      { label: "Information Technology", value: "IT" },
      { label: "Electronics and Communication", value: "ECE" },
      { label: "Mechanical Engineering", value: "ME" },
    ],
    placeholder: "Select Department",
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
