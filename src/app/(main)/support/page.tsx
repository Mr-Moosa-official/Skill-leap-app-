import { AppHeader } from "@/components/layout/app-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircleQuestion, Search } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      id: "faq1",
      question: "How do I reset my password?",
      answer: "You can reset your password from the login screen by clicking 'Forgot Password'. If you signed up with Google, you'll need to manage your password through Google.",
    },
    {
      id: "faq2",
      question: "How can I change the app language?",
      answer: "You can change the app language from the Welcome screen or within the course/job details page using the language switcher button. Some settings might also be available in your Profile settings.",
    },
    {
      id: "faq3",
      question: "Are the courses certified?",
      answer: "Yes, upon successful completion of a course, you will receive a digital certificate from SkillLeap which you can find in your Profile section.",
    },
    {
      id: "faq4",
      question: "How do I apply for jobs listed in the app?",
      answer: "Each job listing has an 'Apply Now' button. Clicking this will either take you to an external application page or provide contact details for the employer.",
    },
  ];

  return (
    <>
      <AppHeader title="Help &amp; Support" showBackButton={true} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageCircleQuestion className="h-7 w-7 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Find answers to common questions about SkillLeap.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                className="pl-10 h-11 text-base w-full"
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger className="text-base text-left hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Mail className="h-7 w-7 text-primary" />
              Contact Support
            </CardTitle>
            <CardDescription>Still need help? Reach out to our support team.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="support-subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <Input id="support-subject" placeholder="e.g., Issue with course video" className="h-11 text-base"/>
              </div>
              <div>
                <label htmlFor="support-message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                <Textarea id="support-message" placeholder="Describe your issue in detail..." rows={5} className="text-base"/>
              </div>
              <Button type="submit" size="lg" className="w-full btn-lg">Send Message</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Or email us directly at <a href="mailto:support@skillleap.app" className="text-primary hover:underline">support@skillleap.app</a>
            </p>
          </CardContent>
        </Card>
        
      </div>
    </>
  );
}
