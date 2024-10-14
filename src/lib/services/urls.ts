import supabase from "@/lib/services/db";
import { CreateUrlInterface, UrlsDbInterface } from "@/lib/interfaces";
import { generateShortUrl } from "@/lib/utils";
import { UAParser } from "ua-parser-js";

export const getClicksForUrls = async (urlIds: string[]) => {
  const { data, error } = await supabase
    .from("url-click")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
};

export const getUrls = async (userId: string): Promise<UrlsDbInterface[]> => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data as UrlsDbInterface[];
};

export const deleteUrl = async (urlId: string) => {
  const { data, error } = await supabase.from("urls").delete().eq("id", urlId);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete URL");
  }

  return data;
};

export const createUrl = async ({
  title,
  longUrl,
  customUrl,
  userId,
}: CreateUrlInterface) => {
  const short_url = generateShortUrl(4);

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id: userId,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr_code: null,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
};

export const getLongUrl = async (id: string) => {
  const { data: shortLinkData, error: shortLinkError } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  }

  return shortLinkData;
};

export const storeUrlStats = async ({
  id,
  originalUrl,
}: {
  id: string;
  originalUrl: string;
}) => {
  const parser = new UAParser();

  try {
    const res = parser.getResult();
    const device = res.type || "desktop";

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    await supabase.from("url-click").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};

export const getClicksForUrl = async (id: string) => {
  const { data, error } = await supabase
    .from("url-click")
    .select("*")
    .eq("url_id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
};

export const getUrl = async ({
  id,
  user_id,
}: {
  id: string;
  user_id: string;
}) => {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
};
