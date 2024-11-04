import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/lib/context/urlContext";
import useFetch from "@/lib/hooks/useFetchHook";
import { getClicksForUrls, getUrls } from "@/lib/services/urls";
import LinkCard from "@/components/LinkCard";
import CreateUrlShortenerForm from "@/components/CreateUrlShortenerForm";
import { debounce } from "@/lib/utils";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  const {
    loading: isUrlsLoading,
    data: urls,
    fn: fetchUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: isUrlClickStatsLoading,
    data: clicks,
    fn: fetchUrlClickStats,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fetchUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fetchUrlClickStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls?.length]);

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  });

  return (
    <div className="p-2 md:p-10 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">My Links</CardTitle>
          <CreateUrlShortenerForm fetchUrls={fetchUrls} />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="text-gray-400" />
            <Input
              type="text"
              placeholder="Search links..."
              onChange={(event) => handleSearchChange(event.target.value)}
              className="flex-grow"
            />
          </div>
          {isUrlsLoading || isUrlClickStatsLoading ? (
            <BarLoader width={"100%"} color="#2563EB" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-4">
              {filteredUrls?.length === 0 ? (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-6 border rounded-md shadow-md">
                  <h2 className="text-lg font-bold mb-2">No URLs Found</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    It seems you haven't added any URLs yet. Start by creating a
                    new one!
                  </p>
                </div>
              ) : (
                filteredUrls?.map((url) => (
                  <LinkCard key={url.id} url={url} fetchUrls={fetchUrls} />
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
