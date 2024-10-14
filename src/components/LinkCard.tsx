import {
  Copy,
  Download,
  Link as LinkIcon,
  ExternalLink,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadImage } from "@/lib/utils";
import { deleteUrl } from "@/lib/services/urls";
import useFetch from "@/lib/hooks/useFetchHook";
import { UrlsDbInterface } from "@/lib/interfaces";

interface LinkCardProps {
  url: UrlsDbInterface;
  fetchUrls: (...args: unknown[]) => Promise<void>;
}

const LinkCard: React.FC<LinkCardProps> = ({ url, fetchUrls }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`);
  };

  const { fn: handleDeleteUrl } = useFetch(deleteUrl, url?.id);

  return (
    <Card className="w-full max-w-2xl bg-card hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        {url?.qr_code ? (
          <img
            src={url?.qr_code}
            className="h-24 w-24 object-contain rounded-md ring-2 ring-primary"
            alt="QR code"
          />
        ) : (
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s"
            }
            className="h-24 w-24 object-contain rounded-md ring-2 ring-primary"
            alt="QR code"
          />
        )}
        <div className="flex-1">
          <CardTitle className="text-2xl font-bold">
            <Link
              to={`/link/${url?.id}`}
              className="hover:text-primary transition-colors"
            >
              {url?.title}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Created on {new Date(url?.created_at).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-primary" />
            <a
              href={`https://trimrr.in/${url?.custom_url || url.short_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1"
            >
              trimrr.in/{url?.custom_url || url.short_url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex w-full items-center gap-2">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            <a
              href={url?.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline truncate flex items-center gap-1"
            >
              {url?.original_url}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy short URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {url?.qr_code && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    downloadImage(url.qr_code as string, url.title)
                  }
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download QR code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleteUrl().then(() => fetchUrls())}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Url</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default LinkCard;
