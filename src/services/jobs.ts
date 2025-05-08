/**
 * Represents a job opportunity.
 */
export interface JobOpportunity {
  /**
   * The title of the job.
   */
  title: string;
  /**
   * The location of the job.
   */
  location: string;
  /**
   * A description of the job.
   */
  description: string;
  /**
   * Whether the job is online or offline.
   */
  category: 'Online' | 'Offline';
}

/**
 * Asynchronously retrieves job opportunities.
 * @returns A promise that resolves to a list of JobOpportunity objects.
 */
export async function getJobOpportunities(): Promise<JobOpportunity[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      title: 'Software Engineer',
      location: 'Remote',
      description: 'Entry-level software engineer position.',
      category: 'Online',
    },
    {
      title: 'Data Entry Clerk',
      location: 'Mumbai',
      description: 'Data entry position at a local company.',
      category: 'Offline',
    },
  ];
}
