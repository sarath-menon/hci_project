import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Phone, Calendar } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#E5F6F8]">
      <Header heading="Home" />
      <PageLayout>
        <h1 className="text-5xl font-bold text-[#7CD7E6] mb-8">Home</h1>

        <Alert className="mb-6 bg-[#FFF8E7] border-[#FFF8E7]">
          <InfoIcon className="h-5 w-5" />
          <AlertDescription>
            Hey Airam, it&apos;s your turn to call gf❤️ today!
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Button
            className="w-full justify-start gap-2 bg-white text-black hover:bg-gray-100"
            variant="outline"
          >
            <Phone className="h-5 w-5" />
            Call gf❤️
          </Button>

          <Button
            className="w-full justify-start gap-2 bg-white text-black hover:bg-gray-100"
            variant="outline"
          >
            <Calendar className="h-5 w-5" />
            Schedule a call with gf❤️
          </Button>
        </div>
      </PageLayout>
    </div>
  );
}
