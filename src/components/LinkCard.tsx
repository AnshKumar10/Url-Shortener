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
import useCopy from "@/lib/hooks/useCopyHook";
import { BaseUrl } from "@/lib/constant";

interface LinkCardProps {
  url: UrlsDbInterface;
  fetchUrls: (...args: unknown[]) => Promise<void>;
}

const LinkCard: React.FC<LinkCardProps> = ({ url, fetchUrls }) => {
  const { fn: handleDeleteUrl } = useFetch(deleteUrl, url?.id);

  const { copyText, isCopying } = useCopy();

  return (
    <Card className="w-full max-w-2xl bg-card hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-auto flex justify-center">
          {url?.qr_code ? (
            <img
              src={url?.qr_code}
              className="h-24 w-24 object-cover min-w-max rounded-md ring-2 ring-primary"
              alt="QR code"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s"
              className="h-24 w-24 object-cover min-w-max rounded-md ring-2 ring-primary"
              alt="QR code placeholder"
            />
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <CardTitle className="text-xl sm:text-2xl font-bold">
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
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
            <LinkIcon className="h-4 w-4 text-primary flex-shrink-0" />
            <a
              href={`${BaseUrl}${url?.custom_url || url.short_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center gap-1 truncate"
            >
              {BaseUrl}{url?.custom_url || url.short_url}
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>
          <div className="flex items-center gap-2 bg-secondary p-2 rounded-md">
            <LinkIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <a
              href={url?.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline truncate flex items-center gap-1"
            >
              {url?.original_url}
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center sm:justify-end gap-2 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyText(`${BaseUrl}${url?.short_url}`)}
              >
                <Copy className="h-4 w-4 mr-2" />
                {isCopying ? "Copied!" : "Copy"}
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
                  size="sm"
                  onClick={() =>
                    downloadImage(url.qr_code as string, url.title)
                  }
                >
                  <Download className="h-4 w-4 mr-2" /> QR
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
                size="sm"
                onClick={() => handleDeleteUrl().then(() => fetchUrls())}
              >
                <Trash className="h-4 w-4 mr-2 text-red-500" /> Delete
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default LinkCard;
