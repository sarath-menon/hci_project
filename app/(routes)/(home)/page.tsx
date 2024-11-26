import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Phone, Calendar } from "lucide-react";
import PageLayout from "@/components/page-layout";
import { Header } from "@/components/Header";
import { StatusList } from "@/components/status-list";

export default function HomePage() {
  return (
    <div className="flex flex-col ">
      <Header heading="Home" />
      <PageLayout className="space-y-8">
        <Alert className="mb-6 bg-[#FFF8E7] border-[#FFF8E7]">
          <InfoIcon className="h-5 w-5" />
          <AlertDescription>
            Hey Airam, it&apos;s your turn to call gf❤️ today!
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Button className="w-full gap-2 " variant="default">
            <Phone className="h-5 w-5" />
            Call gf
          </Button>

          <Button className="w-full gap-2 text-black" variant="secondary">
            <Calendar className="h-5 w-5" />
            Schedule a call with gf
          </Button>
        </div>

        <StatusList />
      </PageLayout>
    </div>
  );
}
