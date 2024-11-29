import PageLayout from "@/components/page-layout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

interface CallPageProps {
  searchParams: { name?: string };
}

export default function CallPage({ searchParams }: CallPageProps) {
  const contactName = searchParams.name || "Unknown Contact";

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <PageLayout className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="flex justify-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/avatar.png" alt="Profile picture" />
            <AvatarFallback>{contactName[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold">{contactName}</h2>
          <p className="text-gray-500 mt-2">
            Calling<span className="calling-animation"></span>
          </p>
        </div>

        <div className="flex gap-6 mt-8">
          <Link href="/contacts">
            <button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Link>
        </div>
      </PageLayout>
    </div>
  );
}
