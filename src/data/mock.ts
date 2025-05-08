import type { Course, UserProfile, JobOpportunity, Badge, Certificate, Lesson, CourseModule } from '@/types';
import { CalendarDays, CheckCircle, Clock, Smartphone, Users, Zap, Briefcase, MapPin, Building, BookOpen } from 'lucide-react';

export const MOCK_COURSES: Course[] = [
  {
    id: 'spoken-english-01',
    title: 'Spoken English for Beginners',
    description: 'Learn basic English conversation skills for daily life and job interviews. Improve your confidence and fluency.',
    thumbnailUrl: 'https://picsum.photos/seed/english/600/400',
    category: 'Language Skills',
    duration: '4 Weeks',
    language: 'en', // Base language is English, can be translated
    instructor: 'Priya Sharma',
    rating: 4.5,
    studentsEnrolled: 1250,
    modules: [
      {
        id: 'm1', title: 'Introduction to English Alphabets and Sounds', lessons: [
          { id: 'l1a', title: 'Vowels and Consonants', contentType: 'video', durationMinutes: 10 },
          { id: 'l1b', title: 'Basic Greetings', contentType: 'text', textContent: 'Learn to say Hello, Good Morning, etc.' },
        ]
      },
      {
        id: 'm2', title: 'Everyday Conversations', lessons: [
          { id: 'l2a', title: 'Introducing Yourself', contentType: 'video', durationMinutes: 15 },
          { id: 'l2b', title: 'Asking for Directions', contentType: 'quiz' },
        ]
      },
    ]
  },
  {
    id: 'mobile-photography-01',
    title: 'Mobile Photography Basics',
    description: 'Capture stunning photos using your smartphone. Learn composition, lighting, and editing techniques.',
    thumbnailUrl: 'https://picsum.photos/seed/photography/600/400',
    category: 'Digital Skills',
    duration: '2 Weeks',
    language: 'en',
    instructor: 'Rajesh Kumar',
    rating: 4.8,
    studentsEnrolled: 870,
     modules: [
      {
        id: 'm1', title: 'Understanding Your Mobile Camera', lessons: [
          { id: 'l1a', title: 'Camera Settings Overview', contentType: 'video', durationMinutes: 12 },
          { id: 'l1b', title: 'Understanding Light', contentType: 'text', textContent: 'Natural vs Artificial light.' },
        ]
      },
      {
        id: 'm2', title: 'Composition Techniques', lessons: [
          { id: 'l2a', title: 'Rule of Thirds', contentType: 'video', durationMinutes: 18 },
          { id: 'l2b', title: 'Practice Shots', contentType: 'quiz' },
        ]
      },
    ]
  },
  {
    id: 'digital-literacy-01',
    title: 'Basic Computer Skills',
    description: 'Understand the fundamentals of using a computer, internet, and email for everyday tasks.',
    thumbnailUrl: 'https://picsum.photos/seed/computer/600/400',
    category: 'Digital Skills',
    duration: '3 Weeks',
    language: 'en',
    instructor: 'Anjali Singh',
    rating: 4.2,
    studentsEnrolled: 1500,
     modules: [
      {
        id: 'm1', title: 'Introduction to Computers', lessons: [
          { id: 'l1a', title: 'Parts of a Computer', contentType: 'video', durationMinutes: 10 },
        ]
      },
    ]
  },
  {
    id: 'customer-service-01',
    title: 'Customer Service Excellence',
    description: 'Learn how to provide excellent customer service and handle customer queries effectively.',
    thumbnailUrl: 'https://picsum.photos/seed/service/600/400',
    category: 'Soft Skills',
    duration: '2 Weeks',
    language: 'en',
    instructor: 'Vikram Patel',
    rating: 4.6,
    studentsEnrolled: 950,
     modules: [
      {
        id: 'm1', title: 'Understanding Customer Needs', lessons: [
          { id: 'l1a', title: 'Active Listening', contentType: 'video', durationMinutes: 15 },
        ]
      },
    ]
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-001',
  name: 'Aarav Kumar',
  email: 'aarav.kumar@example.com',
  mobile: '98XXXXXX01',
  avatarUrl: 'https://picsum.photos/seed/aarav/200/200',
  languagePreference: 'hi',
  completedCourses: ['spoken-english-01'],
  earnedCertificates: [
    {
      id: 'cert-001',
      courseId: 'spoken-english-01',
      courseName: 'Spoken English for Beginners',
      issuedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      certificateUrl: '/path/to/certificate-spoken-english.pdf',
    },
  ],
  learningStreak: 5, // 5 days streak
  badges: [
    {
      id: 'badge-01',
      name: 'Quick Learner',
      description: 'Completed first course module within 24 hours.',
      iconUrl: 'https://picsum.photos/seed/badge-learner/100/100',
      earnedDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'badge-02',
      name: 'Course Completer',
      description: 'Successfully completed a full course.',
      iconUrl: 'https://picsum.photos/seed/badge-complete/100/100',
      earnedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
     {
      id: 'badge-03',
      name: '5-Day Streak',
      description: 'Maintained a learning streak for 5 consecutive days.',
      iconUrl: 'https://picsum.photos/seed/badge-streak/100/100',
      earnedDate: new Date().toISOString(),
    },
  ],
};

export const MOCK_JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'job-001',
    title: 'Data Entry Operator',
    company: 'Rural BPO Services',
    location: 'Jaipur, Rajasthan',
    description: 'Seeking diligent data entry operators for a government project. Basic computer skills required. Training provided.',
    category: 'Offline',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    applyUrl: '#',
    requirements: ['Basic typing speed (25 WPM)', 'MS Office knowledge preferred'],
    salaryRange: '₹8,000 - ₹12,000 per month',
  },
  {
    id: 'job-002',
    title: 'Customer Support Executive (Hindi)',
    company: 'TeleConnect Solutions',
    location: 'Remote (Work from Home)',
    description: 'Handle customer queries in Hindi via phone and chat. Good communication skills and internet connection needed.',
    category: 'Online',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    applyUrl: '#',
    requirements: ['Fluent in Hindi', 'Basic English understanding', 'Own smartphone/laptop'],
    salaryRange: '₹10,000 - ₹15,000 per month + incentives',
  },
  {
    id: 'job-003',
    title: 'Field Sales Executive',
    company: 'AgriGrowth Products',
    location: 'Patna, Bihar',
    description: 'Promote and sell agricultural products to local farmers. Requires travel within the assigned territory.',
    category: 'Offline',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    applyUrl: '#',
    requirements: ['Good communication', 'Willingness to travel', 'Two-wheeler preferred'],
    salaryRange: '₹9,000 + travel allowance',
  },
  {
    id: 'job-004',
    title: 'Social Media Handler (Part-time)',
    company: 'Local Artisans Collective',
    location: 'Remote',
    description: 'Manage social media pages (Facebook, Instagram) for a local artisan group. Basic photo editing and content creation skills.',
    category: 'Online',
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    applyUrl: '#',
    requirements: ['Familiarity with social media platforms', 'Creative mindset'],
    salaryRange: '₹4,000 - ₹6,000 per month',
  },
];


// Utility function to get a course by ID
export const getCourseById = (id: string): Course | undefined => {
  return MOCK_COURSES.find(course => course.id === id);
};

// Utility function to get a job by ID
export const getJobById = (id: string): JobOpportunity | undefined => {
  return MOCK_JOB_OPPORTUNITIES.find(job => job.id === id);
};

export const getBadgeIcon = (badgeName: string) => {
  if (badgeName.toLowerCase().includes('streak')) return Zap;
  if (badgeName.toLowerCase().includes('complete')) return CheckCircle;
  if (badgeName.toLowerCase().includes('learner')) return BookOpen;
  return Award;
}
