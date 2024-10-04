import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, Zap, BarChart3, Shield } from "lucide-react";
import { RouteUrls } from "@/lib/constant";
import { useNavigate } from "react-router-dom";
import URLShortenerForm from "@/components/UrlShortenerForm";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleShortenUrl = (url: string) => {
    navigate(`${RouteUrls.AUTH}?create=${url}`);
  };

  return (
    <div className="flex flex-col items-center">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Simplify Your Links <span className="text-blue-600">Instantly</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The only URL shortener you'll ever need! 🚀
          </p>
          <URLShortenerForm shortenUrl={handleShortenUrl} />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="mr-2 text-blue-600" />
                Fast &amp; Easy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Shorten URLs in seconds with our intuitive interface.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 text-yellow-500" />
                Powerful Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Track clicks, locations, and devices for each shortened URL.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 text-green-500" />
                Custom Branding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create branded short links to boost your marketing efforts.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 text-red-500" />
                Secure &amp; Reliable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your links are safe with our advanced security measures.</p>
            </CardContent>
          </Card>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h3>
          <Accordion type="multiple" className="w-full max-w-2xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How does the Trimrr URL shortener work?
              </AccordionTrigger>
              <AccordionContent>
                When you enter a long URL, our system generates a shorter
                version of that URL. This shortened URL redirects to the
                original long URL when accessed. It's quick, efficient, and
                helps make your links more manageable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do I need an account to use the app?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Creating an account allows you to manage your URLs, view
                detailed analytics, and customize your short URLs. It's free to
                sign up and gives you access to all our powerful features.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What analytics are available for my shortened URLs?
              </AccordionTrigger>
              <AccordionContent>
                Our comprehensive analytics include the number of clicks,
                geolocation data of the clicks, device types (mobile/desktop),
                referral sources, and time-based click patterns. This data helps
                you understand your audience and optimize your marketing
                strategies.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
