'use client';

import { JobCard } from '@/components/jobs/job-card';
import { MOCK_JOB_OPPORTUNITIES } from '@/data/mock';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter, Briefcase } from 'lucide-react';
import { AppHeader } from '@/components/layout/app-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type JobCategory = 'All' | 'Online' | 'Offline';

export default function JobOpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<JobCategory>('All');

  const filteredJobs = useMemo(() => {
    return MOCK_JOB_OPPORTUNITIES.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || job.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()); // Sort by newest first
  }, [searchTerm, categoryFilter]);

  return (
    <>
    <AppHeader title="Job Opportunities" showBackButton={false}/>
    <div className="container mx-auto px-4 py-6">
      {/* Search and Filters */}
      <div className="mb-6 p-4 bg-card rounded-lg shadow">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs by title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base w-full"
          />
        </div>
        
        <Tabs value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as JobCategory)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="All" className="text-base h-full">All Jobs</TabsTrigger>
            <TabsTrigger value="Online" className="text-base h-full">Online</TabsTrigger>
            <TabsTrigger value="Offline" className="text-base h-full">Offline</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Job Opportunities Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters, or check back later.</p>
        </div>
      )}
    </div>
    </>
  );
}
