import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import PageLayout from "@/components/page-layout";

export default function ProfilePage() {
  return (
    <div className="flex flex-col">
      <Header heading="Profile" />

      <PageLayout>
        <div className="flex justify-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/avatar.png" alt="Profile picture" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>

        <h2 className="text-2xl font-semibold text-center">Airam</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-medium">Current mood</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">😊 Happy</SelectItem>
                <SelectItem value="focused">🎯 Focused</SelectItem>
                <SelectItem value="tired">😴 Tired</SelectItem>
                <SelectItem value="energetic">⚡ Energetic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-lg font-medium">Preferred event times</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred times" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                <SelectItem value="afternoon">
                  Afternoon (12PM - 5PM)
                </SelectItem>
                <SelectItem value="evening">Evening (5PM - 9PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
