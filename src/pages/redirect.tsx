import useFetch from "@/lib/hooks/useFetchHook";
import { getLongUrl, storeUrlStats } from "@/lib/services/urls";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
const RedirectLink = () => {
  const { id } = useParams();

  const {
    loading: fetchingUrl,
    data: url,
    fn: getRedirectUrl,
  } = useFetch(getLongUrl, id);

  const { loading: fetchingUrlStats, fn: getUrlStats } = useFetch(
    storeUrlStats,
    {
      id: url?.id as string,
      originalUrl: url?.original_url as string,
    }
  );

  useEffect(() => {
    getRedirectUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!fetchingUrl && url) getUrlStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingUrl]);

  if (fetchingUrl || fetchingUrlStats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-8 md:p-16">
        <div className="flex items-center mb-4 w-full max-w-lg">
          <BarLoader width={"100%"} color="#36d7b7" />
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-center mb-2">
          Please wait, we are redirecting you to your link...
        </h2>
        <p className="text-gray-500 text-center">
          This may take a few seconds.
        </p>
      </div>
    );
  }
};

export default RedirectLink;
