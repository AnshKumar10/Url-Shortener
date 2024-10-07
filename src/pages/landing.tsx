import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, Zap, BarChart3, Shield } from "lucide-react";
import { Faqs, LongUrlSearchParams, RouteUrls } from "@/lib/constant";
import { useNavigate } from "react-router-dom";
import URLShortenerForm from "@/components/UrlShortenerForm";

const LandingPage = () => {
  const features = [
    {
      icon: <Link className="mr-2 text-blue-600" />,
      title: "Fast & Easy",
      content: "Shorten URLs in seconds with our intuitive interface.",
    },
    {
      icon: <Zap className="mr-2 text-yellow-500" />,
      title: "Powerful Analytics",
      content: "Track clicks, locations, and devices for each shortened URL.",
    },
    {
      icon: <BarChart3 className="mr-2 text-green-500" />,
      title: "Custom Branding",
      content: "Create branded short links to boost your marketing efforts.",
    },
    {
      icon: <Shield className="mr-2 text-red-500" />,
      title: "Secure & Reliable",
      content: "Your links are safe with our advanced security measures.",
    },
  ];

  const navigate = useNavigate();

  const handleShortenUrl = (url: string) => {
    navigate(`${RouteUrls.AUTH}?${LongUrlSearchParams}=${url}`);
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
          {features.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {card.icon}
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
        <section>
          <h3 className="text-2xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h3>
          <Accordion type="multiple" className="w-full max-w-2xl mx-auto">
            {Faqs.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
