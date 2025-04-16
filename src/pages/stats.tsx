import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, LinkIcon, Trash, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/lib/context/urlContext";
import { BaseUrl, RouteUrls } from "@/lib/constant";
import useFetch from "@/lib/hooks/useFetchHook";
import { deleteUrl, getClicksForUrl, getUrl } from "@/lib/services/urls";
import { downloadImage } from "@/lib/utils";
import DeviceStats from "@/components/DeviceStats";
import LocationStats from "@/components/LocationStats";
import useCopy from "@/lib/hooks/useCopyHook";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const LinkPage = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();
  const { copyText, isCopying } = useCopy();

  const {
    loading,
    data: url,
    fn: fetchUrl,
    error,
  } = useFetch(getUrl, { id: id as string, user_id: user?.id as string });

  const {
    loading: loadingStats,
    data: stats,
    fn: fetchUrlClickStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: handleDeleteUrl } = useFetch(
    deleteUrl,
    id
  );

  useEffect(() => {
    fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!error && !loading) fetchUrlClickStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  if (error) {
    navigate(RouteUrls.DASHBOARD);
    return null;
  }

  const handleDelete = async () => {
    try {
      await handleDeleteUrl();
      toast.success("Deleted successfully");
      navigate(RouteUrls.DASHBOARD);
    } catch {
      toast.error("Error deleting link");
    }
  };

  const handleBack = () => navigate(RouteUrls.DASHBOARD);

  const redirectUrl = `${BaseUrl}redirect/${url?.custom_url || url?.short_url}`;

  if (loading || loadingStats) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading stats...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" size="sm" onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className={url?.qr_code ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{url?.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Shortened URL
              </label>
              <div className="flex items-center space-x-2">
                <a
                  href={redirectUrl}
                  title={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-blue-500 font-semibold hover:underline"
                >
                  {`${BaseUrl}${url?.custom_url || url?.short_url}`}
                </a>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-500">
                Original URL
              </label>
              <a
                href={url?.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                {url?.original_url}
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Created on {new Date(url?.created_at).toLocaleString()}
              </span>
              <div className="flex space-x-2">
                {url?.qr_code && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadImage(url?.qr_code, url?.title)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download QR
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyText(redirectUrl)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {isCopying ? "Copied!" : "Copy"}
                </Button>

                <AlertDialog>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={!!loadingDelete}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete URL</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this link? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
        {url?.qr_code && (
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={url?.qr_code}
                className="w-full object-contain border border-gray-200 rounded-lg"
                alt="QR code"
              />
            </CardContent>
          </Card>
        )}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {stats && stats.length ? (
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="location">Location Data</TabsTrigger>
                  <TabsTrigger value="device">Device Info</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Total Clicks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-medium text-blue-500">
                          {stats.length}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">First Click</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-medium text-blue-500">
                          {new Date(stats[0]?.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Last Click</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-medium text-blue-500">
                          {new Date(
                            stats[stats.length - 1]?.created_at
                          ).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="location">
                  <LocationStats stats={stats} />
                </TabsContent>
                <TabsContent value="device">
                  <DeviceStats stats={stats} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8">
                <p className="text-xl text-gray-500">
                  No statistics available yet
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkPage;
