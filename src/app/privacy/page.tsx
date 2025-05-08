import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <>
      <AppHeader title="Privacy Policy" showBackButton={true} />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              SkillLeap ("us", "we", or "our") operates the SkillLeap mobile application (the "Service").
            </p>
            <p>
              This page informs you of our policies regarding the collection, use, and disclosure of personal
              data when you use our Service and the choices you have associated with that data.
            </p>
            <h2>1. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you...</p>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data")...</p>
            <h4>Usage Data</h4>
            <p>We may also collect information how the Service is accessed and used ("Usage Data")...</p>
            <h2>2. Use of Data</h2>
            <p>SkillLeap uses the collected data for various purposes: To provide and maintain the Service; To notify you about changes to our Service...</p>
            
            <p>[...]</p>
            <p><em>More detailed privacy policy information will be available here. This is a placeholder.</em></p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@skillleap.app.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
