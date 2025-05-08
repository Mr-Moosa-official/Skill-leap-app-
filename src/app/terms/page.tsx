import { AppHeader } from "@/components/layout/app-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <>
      <AppHeader title="Terms of Service" showBackButton={true} />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Welcome to SkillLeap! These terms and conditions outline the rules and regulations for the use of
              SkillLeap's Application.
            </p>
            <p>
              By accessing this application we assume you accept these terms and conditions. Do not continue to use
              SkillLeap if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <h2>1. Interpretation and Definitions</h2>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions...</p>
            <h2>2. User Accounts</h2>
            <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times...</p>
            <h2>3. Content</h2>
            <p>Our Service allows You to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content")...</p>
            
            <p>[...]</p>
            <p><em>More detailed terms and conditions will be available here. This is a placeholder.</em></p>
            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@skillleap.app.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
