export const teacherData = {
  headers: ["Teacher Name", "Teacher ID", "Department", "Edit"],
  data: [
    {
      teacherName: "John Doe",
      teacherId: "S001",
      department: "Computer Science",
    },
    {
      teacherName: "Jane Smith",
      teacherId: "S002",
      department: "Mathematics",
    },
    {
      teacherName: "Alice Johnson",
      teacherId: "S003",
      department: "Physics",
    },
    {
      teacherName: "Bob Brown",
      teacherId: "S004",
      department: "Chemistry",
    },
    {
      teacherName: "Charlie Davis",
      teacherId: "S005",
      department: "Biology",
    },
    {
      teacherName: "David Evans",
      teacherId: "S006",
      department: "Economics",
    },
    {
      teacherName: "Eve White",
      teacherId: "S007",
      department: "Political Science",
    },
    {
      teacherName: "Frank Black",
      teacherId: "S008",
      department: "Law",
    },
    {
      teacherName: "Grace Green",
      teacherId: "S009",
      department: "Engineering",
    },
    {
      teacherName: "Hannah Blue",
      teacherId: "S010",
      department: "Business",
    },
  ],
};

export const addTeacher = [
  {
    name: "teacherName",
    label: "Teacher Name",
    type: "text",
    placeholder: "Enter Teacher Name",
    pattern: /^[a-zA-Z\s]{3,20}$/,
    validationMessage: "Teacher name must be between 3 to 20 characters.",
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
    name: "department",
    label: "Department",
    type: "select", // changed from text to select
    options: [
      { label: "Computer Science", value: "CS" },
      { label: "Information Technology", value: "IT" },
      { label: "Electronics and Communication", value: "ECE" },
      { label: "Mechanical Engineering", value: "ME" },
    ],
    placeholder: "Select Department",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter Password",
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    validationMessage:
      "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  },
];

export const editTeacher = [
  {
    name: "teacherName",
    label: "Teacher Name",
    type: "text",
    placeholder: "Enter Teacher Name",
    pattern: /^[a-zA-Z\s]{3,20}$/,
    validationMessage: "Teacher name must be between 3 to 20 characters.",
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
    name: "department",
    label: "Department",
    type: "select", // changed from text to select
    options: [
      { label: "Computer Science", value: "CS" },
      { label: "Information Technology", value: "IT" },
      { label: "Electronics and Communication", value: "ECE" },
      { label: "Mechanical Engineering", value: "ME" },
    ],
    placeholder: "Select Department",
  },
];
