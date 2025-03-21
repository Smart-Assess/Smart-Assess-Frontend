export const studentData = {
  headers: [
    "Student Name",
    "Student ID",
    "Batch",
    "Department",
    "Section",
    "Edit",
  ],
  data: [
    {
      studentName: "John Doe",
      studentID: "S001",
      batch: "2024",
      department: "Computer Science",
      section: "A",
    },
    {
      studentName: "Jane Smith",
      studentID: "S002",
      batch: "2024",
      department: "Mathematics",
      section: "B",
    },
    {
      studentName: "Alice Johnson",
      studentID: "S003",
      batch: "2025",
      department: "Physics",
      section: "A",
    },
    {
      studentName: "Bob Brown",
      studentID: "S004",
      batch: "2023",
      department: "Chemistry",
      section: "C",
    },
    {
      studentName: "Charlie Davis",
      studentID: "S005",
      batch: "2023",
      department: "Biology",
      section: "B",
    },
    {
      studentName: "David Evans",
      studentID: "S006",
      batch: "2024",
      department: "Economics",
      section: "A",
    },
    {
      studentName: "Eve White",
      studentID: "S007",
      batch: "2025",
      department: "Political Science",
      section: "C",
    },
    {
      studentName: "Frank Black",
      studentID: "S008",
      batch: "2024",
      department: "Law",
      section: "B",
    },
    {
      studentName: "Grace Green",
      studentID: "S009",
      batch: "2025",
      department: "Engineering",
      section: "A",
    },
    {
      studentName: "Hannah Blue",
      studentID: "S010",
      batch: "2023",
      department: "Business",
      section: "B",
    },
  ],
};

export const addStudent = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your Name",
    pattern: /^[a-zA-Z\s]{3,20}$/,
    validationMessage: " Name must be between 3 to 20 characters.",
  },

  {
    name: "studentDepartment",
    label: "Department",
    type: "text",
    placeholder: "Enter Department",
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
    name: "batch",
    label: "Batch",
    type: "text",
    placeholder: "eg:21B",
    pattern: /^[0-9]{2}[A-Z]$/,
    validationMessage:
      "Batch must be in the format '21B' or '21A' (two digits followed by an uppercase letter).",
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    placeholder: "Enter Section",
    pattern: /^[A-Z]$/,
    validationMessage:
      "Section must be a single uppercase letter (A, B, C, D, etc.).",
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

export const viewRequestData = {
  headers: [
    "Student Name",
    "Student ID",
    "Batch",
    "Department",
    "Section",
    "Request",
  ],
  data: [
    {
      studentName: "John Doe",
      studentID: "S001",
      batch: "2024",
      department: "Computer Science",
      section: "A",
    },
    {
      studentName: "Jane Smith",
      studentID: "S002",
      batch: "2024",
      department: "Mathematics",
      section: "B",
    },
    {
      studentName: "Alice Johnson",
      studentID: "S003",
      batch: "2025",
      department: "Physics",
      section: "A",
    },
    {
      studentName: "Bob Brown",
      studentID: "S004",
      batch: "2023",
      department: "Chemistry",
      section: "C",
    },
    {
      studentName: "Charlie Davis",
      studentID: "S005",
      batch: "2023",
      department: "Biology",
      section: "B",
    },
    {
      studentName: "David Evans",
      studentID: "S006",
      batch: "2024",
      department: "Economics",
      section: "A",
    },
    {
      studentName: "Eve White",
      studentID: "S007",
      batch: "2025",
      department: "Political Science",
      section: "C",
    },
    {
      studentName: "Frank Black",
      studentID: "S008",
      batch: "2024",
      department: "Law",
      section: "B",
    },
    {
      studentName: "Grace Green",
      studentID: "S009",
      batch: "2025",
      department: "Engineering",
      section: "A",
    },
    {
      studentName: "Hannah Blue",
      studentID: "S010",
      batch: "2023",
      department: "Business",
      section: "B",
    },
  ],
};

export const editStudent = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your Name",
    pattern: /^[a-zA-Z\s]{3,20}$/,
    validationMessage: " Name must be between 3 to 20 characters.",
  },

  {
    name: "studentDepartment",
    label: "Department",
    type: "text",
    placeholder: "Enter Department",
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
    name: "batch",
    label: "Batch",
    type: "text",
    placeholder: "eg:21B",
    pattern: /^[0-9]{2}[A-Z]$/,
    validationMessage:
      "Batch must be in the format '21B' or '21A' (two digits followed by an uppercase letter).",
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    placeholder: "Enter Section",
    pattern: /^[A-Z]$/,
    validationMessage:
      "Section must be a single uppercase letter (A, B, C, D, etc.).",
  }
];
