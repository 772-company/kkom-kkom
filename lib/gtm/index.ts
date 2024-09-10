export default function gtmPageView(props: { [key: string]: any }) {
  return window.dataLayer?.push({
    event: "page_view",
    url: window.location.href,
    ...props,
  });
}
