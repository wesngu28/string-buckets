export function handleDownload(categories: Array<{name: string, items: string[]}>) {
  const dl = categories.map((category) => {
    return {
      name: category.name,
      items: category.items,
    };
  });
  let download = new Blob([JSON.stringify(dl)], { type: `application/json` });
  const url = window.URL.createObjectURL(download);
  const link = document.createElement("a");
  link.href = url;
  link.download = "categories.json";
  link.click();
  window.URL.revokeObjectURL(url);
  const dl2 = categories
    .map((category) => category.items.join("\n"))
    .join("\n");
  let download2 = new Blob([dl2], { type: `text/plain` });
  const url2 = window.URL.createObjectURL(download2);
  const link2 = document.createElement("a");
  link2.href = url2;
  link2.download = "categories.txt";
  link2.click();
  window.URL.revokeObjectURL(url2);
}
