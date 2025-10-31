import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl">404</CardTitle>
        <CardDescription>Page not found</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/" className="w-full">
          <Button className="w-full" variant="default">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);

export default NotFound;
