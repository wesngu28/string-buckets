export function handleDownload(categories: Array<{name: string, items: string[]}>) {
  const dl2 = categories
    .map((category) => {
      return `!--${category.name}--!\n${category.items.join("\n")}`
    })
    .join("\n");
  let download2 = new Blob([dl2], { type: `text/plain` });
  const url2 = window.URL.createObjectURL(download2);
  const link2 = document.createElement("a");
  link2.href = url2;
  link2.download = "categories.txt";
  link2.click();
  window.URL.revokeObjectURL(url2);
}
