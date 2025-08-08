import { useEffect } from "react";

export function useSEO(title: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title.slice(0, 60);
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description.slice(0, 160));
    }
  }, [title, description]);
}
